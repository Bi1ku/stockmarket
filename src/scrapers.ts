import puppeteer from "puppeteer";

export const getStockData = async (symbol: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://finance.yahoo.com/quote/${symbol}/`, { timeout: 0 });

  const data = await page.evaluate(() => {
    return {
      price: document.querySelector(".livePrice")?.textContent,
      change: document.querySelector(".priceChange")?.textContent,
      percentChange: document.querySelectorAll(".priceChange")[1]?.textContent,
    };
  });

  await browser.close();

  return data;
};
