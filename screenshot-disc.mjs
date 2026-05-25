import { chromium } from 'playwright'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
page.setViewportSize({ width: 1200, height: 900 })

// Check the hasil-disc page with dummy DISC data (profil: DI, nama: Test User)
const dummyHasil = {
  profil: 'DI',
  mostD: 8, mostI: 7, mostS: 5, mostC: 4,
  leastD: 2, leastI: 3, leastS: 6, leastC: 7,
  changeD: 6, changeI: 4, changeS: -1, changeC: -3,
}
const dummyState = { hasil: dummyHasil, nama: 'Test User' }

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.evaluate((state) => {
  window.history.pushState({ usr: state }, '', '/hasil-disc')
  window.dispatchEvent(new PopStateEvent('popstate', { state: { usr: state } }))
}, dummyState)
await page.waitForTimeout(1000)

await page.screenshot({ path: 'ss-hasil-disc-top.png', fullPage: false })
await page.screenshot({ path: 'ss-hasil-disc-full.png', fullPage: true })
console.log('✅ ss-hasil-disc-full.png')

// Check key sections
const sections = ['Inspirational', 'Promoter', 'Developer', 'Grafik']
for (const s of sections) {
  const vis = await page.isVisible(`text=${s}`).catch(() => false)
  console.log(`  "${s}" visible: ${vis}`)
}

// Also screenshot the question page to verify kelompok 15 is correct
await page.goto('http://localhost:5173/tes-disc', { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
// Fill form
await page.fill('input[placeholder="Nama lengkap sesuai KTP"]', 'Test User')
await page.fill('input[placeholder="NIP atau NIK"]', '199001012020121001')
await page.selectOption('select', { label: 'Kantor Wilayah DJBC Jakarta' })
await page.click('button:has-text("Mulai Tes")')
await page.waitForTimeout(500)

// Scroll to question 15
await page.evaluate(() => {
  const cards = document.querySelectorAll('.bg-white.rounded-2xl.shadow')
  const q15 = Array.from(cards).find(c => c.textContent.includes('Kelompok 15'))
  if (q15) q15.scrollIntoView({ block: 'center' })
})
await page.waitForTimeout(300)
await page.screenshot({ path: 'ss-disc-soal15.png', fullPage: false })
console.log('✅ ss-disc-soal15.png (kelompok 15 — "Menerima penghargaan...")')

// Check text of question 15
const q15text = await page.evaluate(() => {
  const cards = document.querySelectorAll('.bg-white.rounded-2xl.shadow')
  const q15 = Array.from(cards).find(c => c.textContent.includes('Kelompok 15'))
  return q15?.textContent || 'not found'
})
console.log('\nKelompok 15 content:\n', q15text.replace(/\s+/g, ' ').trim())

await browser.close()
