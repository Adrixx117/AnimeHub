import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
  try {
    const characters = await prisma.character.findMany();
    return NextResponse.json(characters);
  } catch (error) {
    console.error("Error fetching characters:", error);
    return NextResponse.json({ error: "Error fetching characters" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { name, series, image, userId } = await req.json();

    if (!userId || typeof userId !== "number") {
      return NextResponse.json({ error: "userId es obligatorio y debe ser un número" }, { status: 400 });
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
  } catch (error) {
    console.error("Error creating character:", error);
    return NextResponse.json({ error: "Error creating character" }, { status: 500 });
  }
};
