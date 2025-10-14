import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
  try {
    const series = await prisma.series.findMany();
    return NextResponse.json(series);
  } catch (error) {
    console.error("Error fetching series:", error);
    return NextResponse.json({ error: "Error fetching series" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { title, description, image, userId } = await req.json();

    if (!userId || typeof userId !== "number") {
      return NextResponse.json({ error: "userId es obligatorio y debe ser un número" }, { status: 400 });
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
  } catch (error) {
    console.error("Error creating series:", error);
    return NextResponse.json({ error: "Error creating series" }, { status: 500 });
  }
};
