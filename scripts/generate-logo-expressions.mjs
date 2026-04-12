import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const envFile = fs.readFileSync(path.resolve(import.meta.dirname, '..', '.env.local'), 'utf8')
const API_KEY = envFile.match(/GEMINI_API_KEY=(.+)/)?.[1]?.trim()

if (!API_KEY) {
  console.error('Missing GEMINI API key')
  process.exit(1)
}

const BASE = `Keep EVERYTHING about the reference image pixel-identical except the expression change described — same squircle shape, same indigo body color, same bevel and rim light, same glossy highlight, same soft drop shadow, same angle, same size, same composition, same framing, same pure white background. Only the eyes/mouth change. The eyes and mouth must glow in the SAME cyan/light-blue color as the reference. No helmet, no body, no text.`

const variants = [
  {
    name: 'expr-wink',
    prompt: `Same squircle logomark as the reference, but WINKING with strong ASYMMETRY between the two eyes. The LEFT eye (viewer's left) is OPEN and IDENTICAL to the reference image — a tall curved smiling arch shape glowing cyan, unchanged. The RIGHT eye (viewer's right) is CLOSED — replaced by a single thin upward-curving horizontal line (a "u" shape, like a closed happy-eye arc), clearly smaller and flatter than the open left eye. This must be a clear wink: one eye normal (tall arch), one eye squeezed shut (flat curve). The smile stays the same or becomes slightly cheekier. ${BASE}`,
  },
]

const REFERENCE_IMAGE_PATH = path.resolve(import.meta.dirname, '..', 'public', 'logo.png')
const referenceImageBase64 = fs.readFileSync(REFERENCE_IMAGE_PATH).toString('base64')
const referenceImagePart = {
  inlineData: { mimeType: 'image/png', data: referenceImageBase64 },
}

const outDir = path.resolve('public/logomark')
fs.mkdirSync(outDir, { recursive: true })

async function generateImage(v) {
  console.log(`Generating: ${v.name}...`)

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [referenceImagePart, { text: v.prompt }] }],
        generationConfig: {
          responseModalities: ['IMAGE', 'TEXT'],
          responseMimeType: 'text/plain',
        },
      }),
    }
  )

  if (!response.ok) {
    const err = await response.text()
    console.error(`Failed for ${v.name}: ${response.status}`, err)
    return null
  }

  const data = await response.json()
  const imagePart = data.candidates?.[0]?.content?.parts?.find(
    (p) => p.inlineData?.mimeType?.startsWith('image/')
  )

  if (!imagePart) {
    console.error(`No image returned for ${v.name}`)
    return null
  }

  const ext = imagePart.inlineData.mimeType === 'image/png' ? 'png' : 'jpg'
  const outPath = path.join(outDir, `${v.name}.${ext}`)
  fs.writeFileSync(outPath, Buffer.from(imagePart.inlineData.data, 'base64'))
  console.log(`Saved: ${outPath}`)
  return outPath
}

const results = {}
for (const v of variants) {
  const p = await generateImage(v)
  if (p) results[v.name] = p
  await new Promise((r) => setTimeout(r, 2000))
}

// Build a winking GIF: normal → wink → normal → normal (long hold), loop
const normalFrame = REFERENCE_IMAGE_PATH
const winkFrame = results['expr-wink']

if (winkFrame) {
  console.log('\nBuilding wink GIF...')
  const listPath = path.join(outDir, 'wink-frames.txt')
  const gifPath = path.join(outDir, 'logo-wink.gif')

  const listContent = [
    `file '${normalFrame}'`,
    `duration 2.8`,
    `file '${winkFrame}'`,
    `duration 0.55`,
    `file '${normalFrame}'`,
    // ffconcat requires the last file to be repeated (its duration is ignored)
    `duration 0.1`,
    `file '${normalFrame}'`,
  ].join('\n')

  fs.writeFileSync(listPath, listContent)

  const cmd = `ffmpeg -y -f concat -safe 0 -i "${listPath}" -vf "fps=24,scale=320:-1:flags=lanczos,split[s0][s1];[s0]palettegen=reserve_transparent=0[p];[s1][p]paletteuse=dither=bayer" -loop 0 "${gifPath}"`
  try {
    execSync(cmd, { stdio: 'pipe' })
    console.log(`Saved: ${gifPath}`)
  } catch (e) {
    console.error('ffmpeg failed:', e.stderr?.toString() || e.message)
  }

  fs.unlinkSync(listPath)
} else {
  console.warn('No wink frame produced — skipping GIF')
}

console.log('\nDone!')
