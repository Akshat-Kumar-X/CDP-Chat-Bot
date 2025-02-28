const puppeteer = require('puppeteer-core');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: process.platform === "win32"
            ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
            : "/usr/bin/google-chrome" // Adjust path for Linux/Mac
    });

    const page = await browser.newPage();
    await page.goto("https://segment.com/docs", { waitUntil: "load", timeout: 0 });

    const faqs = await page.evaluate(() => {
        let faqList = [];
        document.querySelectorAll("h2, h3, h4").forEach(heading => {
            let question = heading.innerText.trim();
            let answer = heading.nextElementSibling?.innerText.trim() || "No answer found";
            faqList.push({ question, answer });
        });
        return faqList;
    });

    await browser.close();
    console.log("✅ Segment Scraping Complete!");
})();
