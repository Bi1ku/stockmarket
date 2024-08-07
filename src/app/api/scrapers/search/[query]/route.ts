import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(
  _: Request,
  { params }: { params: { query: string } },
) {
  try {
    const { query } = params;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://finance.yahoo.com/");
    await page.type("._yb_7v1651", query);

    const searchResults = await page.evaluate(() => {
      const results = document.querySelectorAll(
        ".modules-module_quoteItem__W8hI-",
      );

      return Array.from(results).map((result) => {
        const title = result.querySelector("a")?.textContent;

        return { title, url };
      });
    });

    await browser.close();

    //    return NextResponse.json(res, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
