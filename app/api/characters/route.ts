import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const characters = await prisma.character.findMany();
  return NextResponse.json(characters);
}

export async function POST(req: NextRequest) {
  const { name, series, image, userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "userId es obligatorio" }, { status: 400 });
  }

  const newCharacter = await prisma.character.create({
    data: {
      name,
      series,
      image,
      user: { connect: { id: userId } },
    },
  });

  return NextResponse.json(newCharacter);
}
