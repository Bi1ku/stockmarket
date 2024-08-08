import { prisma } from "@/constants";
import { Stock } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const response = await prisma.user.create({
      data: await req.json(),
    });

    return NextResponse.json(response, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { user, name, symbol, holdings } = await req.json();

    const stock = user.stocks.find((v: Stock) => v.symbol === symbol);

    if (stock)
      await prisma.stock.update({
        where: { id: stock.id },
        data: { holdings },
      });
    else
      await prisma.stock.create({
        data: {
          name,
          symbol,
          holdings,
          userId: user.id,
        },
      });

    const response = await prisma.user.findUniqueOrThrow({
      where: { id: user.id },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
