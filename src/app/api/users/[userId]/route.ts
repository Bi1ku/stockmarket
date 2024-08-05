import { prisma } from "@/constants";
import { NextResponse } from "next/server";

export async function GET(_: Request, { userId }: { userId: string }) {
  try {
    const res = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    return NextResponse.json(res, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
