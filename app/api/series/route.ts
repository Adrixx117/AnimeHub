import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const series = await prisma.series.findMany();
  return NextResponse.json(series);
}

export async function POST(req: NextRequest) {
  const { title, description, image, userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "userId es obligatorio" }, { status: 400 });
  }

  const newSerie = await prisma.series.create({
    data: {
      title,
      description,
      image,
      user: { connect: { id: userId } },
    },
  });

  return NextResponse.json(newSerie);
}
