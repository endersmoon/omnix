import fs from 'fs'
import path from 'path'

const envFile = fs.readFileSync(path.resolve(import.meta.dirname, '..', '.env.local'), 'utf8')
const API_KEY = envFile.match(/GEMINI_API_KEY=(.+)/)?.[1]?.trim()

if (!API_KEY) {
  console.error('Missing GEMINI API key')
  process.exit(1)
}

const STYLE =
  'Use the EXACT SAME chibi 3D robot character from the reference image — round white-and-lavender helmet, glowing dark visor with smiling eyes, white plastic body with subtle grey panel lines, short stubby arms and legs, small orange necktie. Keep proportions, colors, and face identical. Soft studio lighting, gentle ambient occlusion, pastel palette, clean Pixar-style 3D render. Pure white background, centered square 1:1 composition, no text, no words, no logo.'

const pillars = [
  {
    name: 'job-search',
    prompt: `The same chibi robot character holding up a large magnifying glass in one hand and looking through it with curious wide eyes, a small floating briefcase icon hovering beside it. ${STYLE}`,
  },
  {
    name: 'resume-builder',
    prompt: `The same chibi robot character standing next to a tall floating document/resume page, one hand gesturing toward the page as if presenting it, a tiny pencil tucked behind its ear. ${STYLE}`,
  },
  {
    name: 'interview-prep',
    prompt: `The same chibi robot character sitting upright on a small white stool, holding a clipboard, with a floating speech bubble containing a question mark above its head. ${STYLE}`,
  },
  {
    name: 'company-research',
    prompt: `The same chibi robot character holding a small tablet in both hands displaying a simple bar-chart icon, with a tiny floating building/office icon hovering beside its head. ${STYLE}`,
  },
  {
    name: 'application-tracking',
    prompt: `The same chibi robot character standing in front of a floating checklist board with three checkmarks ticked off, one hand pointing at the checklist with a confident smile. ${STYLE}`,
  },
  {
    name: 'email-scanner',
    prompt: `The same chibi robot character holding a glowing envelope in both hands close to its visor as if scanning it, with a small magnifying-glass icon overlapping the envelope. ${STYLE}`,
  },
]

const REFERENCE_IMAGE_PATH = path.resolve(import.meta.dirname, '..', 'public', 'bot.png')
const referenceImageBase64 = fs.readFileSync(REFERENCE_IMAGE_PATH).toString('base64')
const referenceImagePart = {
  inlineData: { mimeType: 'image/png', data: referenceImageBase64 },
}

const outDir = path.resolve('public/pillars')
fs.mkdirSync(outDir, { recursive: true })

async function generateImage(pillar) {
  console.log(`Generating: ${pillar.name}...`)

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [referenceImagePart, { text: pillar.prompt }],
          },
        ],
        generationConfig: {
          responseModalities: ['IMAGE', 'TEXT'],
          responseMimeType: 'text/plain',
        },
      }),
    }
  )

  if (!response.ok) {
    const err = await response.text()
    console.error(`Failed for ${pillar.name}: ${response.status}`, err)
    return false
  }

  const data = await response.json()

  const imagePart = data.candidates?.[0]?.content?.parts?.find(
    (p) => p.inlineData?.mimeType?.startsWith('image/')
  )

  if (!imagePart) {
    console.error(`No image returned for ${pillar.name}`)
    console.error(JSON.stringify(data, null, 2).slice(0, 500))
    return false
  }

  const ext = imagePart.inlineData.mimeType === 'image/png' ? 'png' : 'jpg'
  const outPath = path.join(outDir, `${pillar.name}.${ext}`)
  fs.writeFileSync(outPath, Buffer.from(imagePart.inlineData.data, 'base64'))
  console.log(`Saved: ${outPath}`)
  return true
}

// Run sequentially to avoid rate limits
for (const pillar of pillars) {
  const ok = await generateImage(pillar)
  if (!ok) console.log(`Skipping ${pillar.name}`)
  // Small delay between requests
  await new Promise((r) => setTimeout(r, 2000))
}

console.log('Done!')
