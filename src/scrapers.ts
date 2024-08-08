import puppeteer from "puppeteer";

export const getStockData = async (symbol: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://finance.yahoo.com/quote/${symbol}/`);

  await page.screenshot({ path: "example.png" });

  const price = await page.evaluate(() => {
    return document.querySelector(".livePrice")?.textContent;
  });

  await browser.close();

  return { price };
};
