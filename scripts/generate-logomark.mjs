import fs from 'fs'
import path from 'path'

const envFile = fs.readFileSync(path.resolve(import.meta.dirname, '..', '.env.local'), 'utf8')
const API_KEY = envFile.match(/GEMINI_API_KEY=(.+)/)?.[1]?.trim()

if (!API_KEY) {
  console.error('Missing GEMINI API key')
  process.exit(1)
}

const STYLE =
  'Use the EXACT SAME chibi 3D robot character from the reference image — round white-and-lavender helmet, glowing dark indigo visor with two curved smiling eyes, same proportions, same colors, same face. Soft Pixar-style 3D render, gentle ambient occlusion, pastel studio lighting, clean and modern. Pure white background, centered square 1:1 composition, generous padding around the mark, no text, no words, no letters, no wordmark, logomark only.'

const SQUIRCLE = `The visor shape is a perfect SQUIRCLE — a 1:1 aspect ratio rounded square (equal width and height) with smooth iOS-style superellipse corners, NOT an oval, NOT taller than wide, NOT a rounded rectangle. Width equals height exactly.`

const variants = [
  {
    name: 'logomark-v1-visor',
    prompt: `A logomark icon showing ONLY the glowing visor/eye-screen of the chibi robot from the reference image — a dark indigo squircle with the two curved smiling eyes glowing cyan/light-blue, isolated on pure white. NO helmet, NO head shell, NO body, NO face outline — just the squircle visor as a standalone glyph. ${SQUIRCLE} Front-facing, perfectly symmetrical, subtle soft drop shadow below, slight glossy highlight on the visor surface. ${STYLE}`,
  },
  {
    name: 'logomark-v2-visor-flat',
    prompt: `A logomark icon showing ONLY the glowing visor/eye-screen of the chibi robot from the reference image — a dark indigo squircle with the two curved smiling eyes glowing cyan/light-blue, isolated on pure white. NO helmet, NO head shell, NO body. ${SQUIRCLE} Cleaner and flatter rendering (less 3D, more app-icon flat-style) but keeping the same colors and eye shapes. Front-facing, symmetrical, soft drop shadow. ${STYLE}`,
  },
  {
    name: 'logomark-v3-visor-3d',
    prompt: `A logomark icon showing ONLY the glowing visor/eye-screen of the chibi robot — a dark indigo squircle with the two curved smiling cyan eyes, isolated on pure white. ${SQUIRCLE} Rendered in soft Pixar-style 3D with a gentle bevel around the edge, glossy highlight across the top, and a soft ambient drop shadow beneath. NO helmet, NO head shell, NO body. ${STYLE}`,
  },
  {
    name: 'logomark-v4-mono',
    prompt: `A flat, single-color vector-style logomark on a pure white background. A solid indigo #4141fc squircle (iOS-style superellipse, equal width and height, 1:1) with two smiling eyes and a small curved smile SUBTRACTED from it (white cutouts showing through, so the eyes and smile are pure white negative space). ${SQUIRCLE} Absolutely FLAT — no gradients, no shadows, no highlights, no 3D, no bevels, no glow, no texture. The ONLY colors in the image are pure white and solid indigo #4141fc. The two eyes are simple rounded-top arch shapes (like upside-down U's) and the mouth is a small upward curve. Clean, minimal, professional logo style, as if designed in Figma as a 2-color vector icon. Generous padding around the mark. No text, no words.`,
  },
]

const REFERENCE_IMAGE_PATH = path.resolve(import.meta.dirname, '..', 'public', 'bot.png')
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
    return false
  }

  const data = await response.json()
  const imagePart = data.candidates?.[0]?.content?.parts?.find(
    (p) => p.inlineData?.mimeType?.startsWith('image/')
  )

  if (!imagePart) {
    console.error(`No image returned for ${v.name}`)
    console.error(JSON.stringify(data, null, 2).slice(0, 500))
    return false
  }

  const ext = imagePart.inlineData.mimeType === 'image/png' ? 'png' : 'jpg'
  const outPath = path.join(outDir, `${v.name}.${ext}`)
  fs.writeFileSync(outPath, Buffer.from(imagePart.inlineData.data, 'base64'))
  console.log(`Saved: ${outPath}`)
  return true
}

for (const v of variants) {
  const ok = await generateImage(v)
  if (!ok) console.log(`Skipping ${v.name}`)
  await new Promise((r) => setTimeout(r, 2000))
}

console.log('Done!')
