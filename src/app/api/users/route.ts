import { prisma } from "@/constants";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const res = await prisma.user.create({
      data: await req.json(),
    });

    return NextResponse.json(res, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

// Put stocks into user
export async function PUT(req: Request) {
  try {
    const { id, ...data } = await req.json();

    const res = await prisma.user.update({
      where: { id },
      data,
    });

    return NextResponse.json(res, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
