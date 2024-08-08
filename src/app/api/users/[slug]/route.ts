import { prisma } from "@/constants";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params;

    const response = await prisma.user.findFirstOrThrow({
      where: {
        OR: [{ email: slug }, { id: slug }],
      },
      include: {
        stocks: true,
      },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
