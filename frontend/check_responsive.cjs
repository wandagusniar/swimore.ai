const { chromium } = require('playwright');

async function checkResponsive() {
  const pages = [
    '/',
    '/chat',
    '/models',
    '/marketplace',
    '/docs',
    '/docs/sdks/python',
    '/dashboard/keys',
    '/pricing',
  ];

  const widths = [375, 768, 1280, 1440];

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  for (const url of pages) {
    const page = await context.newPage();
    await page.goto(`http://localhost:3000${url}`);

    for (const width of widths) {
      await page.setViewportSize({ width, height: 0 });
      await page.waitForLoadState('networkidle');

      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const innerWidth = await page.evaluate(() => window.innerWidth);
      const passes = scrollWidth <= innerWidth;

      console.log(`URL: ${url} | Width: ${width}px | scrollWidth (${scrollWidth}) <= innerWidth (${innerWidth})? ${passes}`);
    }

    await page.close();
  }

  await browser.close();
}

checkResponsive().catch(console.error);