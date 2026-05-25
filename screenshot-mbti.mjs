import { chromium } from 'playwright'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
page.setViewportSize({ width: 1200, height: 900 })

async function captureMBTI(tipe, nama) {
  const dummyState = { tipe, nama }

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.evaluate((state) => {
    window.history.pushState({ usr: state }, '', '/hasil')
    window.dispatchEvent(new PopStateEvent('popstate', { state: { usr: state } }))
  }, dummyState)
  await page.waitForTimeout(800)

  // Screenshot top
  await page.screenshot({ path: `ss-hasil-mbti-${tipe}-top.png`, fullPage: false })

  // Full page
  await page.screenshot({ path: `ss-hasil-mbti-${tipe}-full.png`, fullPage: true })

  // Check sections
  const sections = {
    'Uraian Kepribadian': await page.isVisible('text=Uraian Kepribadian').catch(() => false),
    'Saran Pengembangan': await page.isVisible('text=Saran Pengembangan').catch(() => false),
    'Laporan Lengkap': await page.isVisible('text=Laporan Lengkap').catch(() => false),
    'Saran Profesi': await page.isVisible('text=Saran Profesi').catch(() => false),
    'Partner Kerja': await page.isVisible('text=Partner Kerja').catch(() => false),
    subtitle: await page.$eval('h2.text-lg, p.text-lg', el => el?.textContent).catch(() => null),
  }

  console.log(`\n=== ${tipe} (${nama}) ===`)
  for (const [k, v] of Object.entries(sections)) {
    console.log(`  ${k}: ${v}`)
  }
  console.log(`  → ss-hasil-mbti-${tipe}-full.png`)
}

// Test a few interesting types
await captureMBTI('INFJ', 'Budi Santoso')
await captureMBTI('ENTJ', 'Siti Rahayu')
await captureMBTI('ENFP', 'Ahmad Fauzi')

await browser.close()
console.log('\nDone!')
