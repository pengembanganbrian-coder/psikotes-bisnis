import { chromium } from 'playwright'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
page.setViewportSize({ width: 1200, height: 900 })

// Build dummy scores: all 5 except L=9, R=8, N=7
const skalaKeys = ['G','L','I','T','V','S','R','D','C','E','N','A','P','X','B','O','Z','K','F','W']
const scores = {}
for (const k of skalaKeys) scores[k] = 5
scores.L = 9
scores.R = 8
scores.N = 7

const dummyState = { scores, nama: 'Test User', nip: '199001012020121001', unitKerja: 'Kantor Wilayah DJBC Jakarta' }

// Navigate to root first to get the React app initialized
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })

// React Router v7 BrowserRouter stores navigate state under { usr: ... } in history.state
// Trigger navigation by replacing history state and dispatching popstate
await page.evaluate((state) => {
  window.history.pushState({ usr: state }, '', '/hasil-papi')
  window.dispatchEvent(new PopStateEvent('popstate', { state: { usr: state } }))
}, dummyState)

await page.waitForTimeout(800)
await page.screenshot({ path: 'ss-hasil-papi-top.png', fullPage: false })
console.log('✅ screenshot top (viewport) → ss-hasil-papi-top.png')

// Scroll down to Interpretasi section
await page.evaluate(() => window.scrollTo(0, 600))
await page.waitForTimeout(300)
await page.screenshot({ path: 'ss-hasil-papi-interpretasi.png', fullPage: false })
console.log('✅ screenshot interpretasi → ss-hasil-papi-interpretasi.png')

// Full page
await page.screenshot({ path: 'ss-hasil-papi-full.png', fullPage: true })
console.log('✅ screenshot full page → ss-hasil-papi-full.png')

// Check what's on the page
const heading = await page.textContent('h2, h1').catch(() => null)
console.log('Heading found:', heading)

const interpretasiVisible = await page.isVisible('text=Interpretasi Profil').catch(() => false)
console.log('Interpretasi Profil visible:', interpretasiVisible)

const kekuatanVisible = await page.isVisible('text=Kekuatan Utama').catch(() => false)
console.log('Kekuatan Utama visible:', kekuatanVisible)

const pengembanganVisible = await page.isVisible('text=Area Pengembangan').catch(() => false)
console.log('Area Pengembangan visible:', pengembanganVisible)

const rekomendasiVisible = await page.isVisible('text=Rekomendasi Jabatan').catch(() => false)
console.log('Rekomendasi Jabatan visible:', rekomendasiVisible)

await browser.close()
