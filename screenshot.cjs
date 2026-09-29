const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport large enough
  await page.setViewport({ width: 1920, height: 1080 });
  
  await page.goto('http://localhost:5173/aboutus.php', { waitUntil: 'networkidle0' });
  
  // Scroll to bottom
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 50);
    });
  });

  // Wait a bit for animations
  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: 'C:\\Users\\gupta\\.gemini\\antigravity-ide\\brain\\2c1904ae-5bd5-4148-9c20-4a43dd1d0a73\\about_bottom.png' });
  
  await browser.close();
})();
