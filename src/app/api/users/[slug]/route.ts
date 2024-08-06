import { prisma } from "@/constants";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params;

    const res = await prisma.user.findFirstOrThrow({
      where: {
        OR: [{ email: slug }, { id: slug }],
      },
    });

    return NextResponse.json(res, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
