import type { NextRequest } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; unsplashId: string }> },
) {
  const { id, unsplashId } = await params;

  const collection = await prisma.collection.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!collection) {
    return new Response("Collection not found", { status: 404 });
  }

  const image = await prisma.image.findUnique({
    where: { unsplashId },
  });

  if (!image) {
    return new Response("Image not found", { status: 404 });
  }

  const updatedCollection = await prisma.collection.update({
    where: {
      id: Number(id),
    },
    data: {
      images: {
        disconnect: {
          id: image.id,
        },
      },
    },
  });

  return new Response(JSON.stringify(updatedCollection), { status: 200 });
}
