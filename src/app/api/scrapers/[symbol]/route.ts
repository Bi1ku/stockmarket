import { getStockData } from "@/scrapers";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { symbol: string } },
) {
  try {
    const { symbol } = params;

    const res = await getStockData(symbol);

    return NextResponse.json(res, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
