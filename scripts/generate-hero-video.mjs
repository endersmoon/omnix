import fs from 'fs'
import path from 'path'

const envFile = fs.readFileSync(path.resolve(import.meta.dirname, '..', '.env.local'), 'utf8')
const API_KEY = envFile.match(/GEMINI_API_KEY=(.+)/)?.[1]?.trim()
if (!API_KEY) {
  console.error('Missing GEMINI API key')
  process.exit(1)
}

const MODEL = 'veo-3.0-fast-generate-001'
const SOURCE = path.resolve(import.meta.dirname, '..', 'public', 'bot.png')
const OUT = path.resolve(import.meta.dirname, '..', 'public', 'hero.mp4')

const PROMPT =
  'The chibi 3D robot character stands idle with very subtle breathing motion, blinks its smiling visor eyes once, then gives a small friendly wave with its right hand while its head tilts slightly. Soft, gentle, loopable idle animation. Keep the character, colors, proportions, helmet, visor eyes, and orange necktie identical to the source image. IMPORTANT: replace the background with a FLAT solid PURE CHROMA-KEY GREEN color (#00FF00) — completely uniform, no gradient, no shadow on the ground, no ambient lighting on the background, no white floor. The green must be saturated and uniform across the entire background for easy chroma keying. The character itself should have NO green tint — keep its original white/lavender/orange colors. Clean Pixar-style 3D render, no camera movement, no zoom, no text, no words.'

const imageBase64 = fs.readFileSync(SOURCE).toString('base64')

console.log(`Submitting video generation (${MODEL})...`)

const submitRes = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predictLongRunning?key=${API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: [
        {
          prompt: PROMPT,
          image: { bytesBase64Encoded: imageBase64, mimeType: 'image/png' },
        },
      ],
      parameters: {
        aspectRatio: '9:16',
        personGeneration: 'allow_adult',
      },
    }),
  }
)

if (!submitRes.ok) {
  console.error('Submit failed:', submitRes.status, await submitRes.text())
  process.exit(1)
}

const submitData = await submitRes.json()
const opName = submitData.name
if (!opName) {
  console.error('No operation name returned:', JSON.stringify(submitData, null, 2))
  process.exit(1)
}
console.log(`Operation: ${opName}`)

let op = submitData
const started = Date.now()
while (!op.done) {
  const elapsed = Math.round((Date.now() - started) / 1000)
  process.stdout.write(`\rPolling... ${elapsed}s`)
  await new Promise((r) => setTimeout(r, 8000))
  const pollRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/${opName}?key=${API_KEY}`
  )
  if (!pollRes.ok) {
    console.error('\nPoll failed:', pollRes.status, await pollRes.text())
    process.exit(1)
  }
  op = await pollRes.json()
}
console.log('\nDone polling.')

if (op.error) {
  console.error('Operation error:', JSON.stringify(op.error, null, 2))
  process.exit(1)
}

const samples =
  op.response?.generateVideoResponse?.generatedSamples ||
  op.response?.generatedVideos ||
  op.response?.videos ||
  []

if (!samples.length) {
  console.error('No samples in response:', JSON.stringify(op.response, null, 2).slice(0, 2000))
  process.exit(1)
}

const videoUri =
  samples[0].video?.uri || samples[0].uri || samples[0].video?.fileUri

if (!videoUri) {
  console.error('No video URI:', JSON.stringify(samples[0], null, 2))
  process.exit(1)
}

console.log(`Downloading from ${videoUri.slice(0, 80)}...`)
const sep = videoUri.includes('?') ? '&' : '?'
const dlRes = await fetch(`${videoUri}${sep}key=${API_KEY}`)
if (!dlRes.ok) {
  console.error('Download failed:', dlRes.status, await dlRes.text())
  process.exit(1)
}
const buf = Buffer.from(await dlRes.arrayBuffer())
fs.writeFileSync(OUT, buf)
console.log(`Saved: ${OUT} (${(buf.length / 1024).toFixed(0)} KB)`)
