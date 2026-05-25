import { chromium } from 'playwright'
import { writeFileSync } from 'fs'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
page.setViewportSize({ width: 390, height: 844 }) // mobile-ish

const pages = [
  { url: 'http://localhost:5173/', name: 'home' },
  { url: 'http://localhost:5173/login', name: 'login' },
  { url: 'http://localhost:5173/tes', name: 'tes-mbti' },
  { url: 'http://localhost:5173/tes-disc', name: 'tes-disc' },
]

for (const p of pages) {
  await page.goto(p.url, { waitUntil: 'networkidle' })
  await page.screenshot({ path: `ss-${p.name}.png`, fullPage: false })
  console.log(`✅ ${p.name} → ss-${p.name}.png`)
}

await browser.close()
