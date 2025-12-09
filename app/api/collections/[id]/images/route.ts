import type { NextRequest } from "next/server";
import { Image, Collection } from "@prisma/client";
import { prisma } from "@/prisma/prisma";
import { unsplashApiUrl } from "@/data/constants";

async function retrieveOrInsert(unsplashId: string) {
  const image: Image | null = await prisma.image.findUnique({
    where: {
      unsplashId: unsplashId,
    },
  });

  if (image) return image;

  const response = await fetch(`${unsplashApiUrl}/photos/${unsplashId}`, {
    headers: {
      Authorization: `Client-ID ${process.env.ACCESS_KEY}`,
    },
  });
  const data = await response.json();
  const imageData = {
    unsplashId: data.id,
    small: data.urls.small,
    full: data.urls.full,
    raw: data.urls.raw,
    regular: data.urls.regular,
    thumb: data.urls.thumb,
  };

  return prisma.image.create({ data: imageData });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id) {
    return new Response(JSON.stringify({ error: "Photo ID missing" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const collection = await prisma.collection.findUnique({
    where: { id: Number(id) },
    include: { images: true },
  });

  if (!collection) {
    return new Response(JSON.stringify({ error: "Collection not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(collection), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id) {
    return new Response(JSON.stringify({ error: "Photo ID missing" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const collection: Collection | null = await prisma.collection.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!collection) {
    return new Response(JSON.stringify({ error: "Collection not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { unsplashId }: { unsplashId: string } = await request.json();
  const image: Image = await retrieveOrInsert(unsplashId);

  // add image to Collection
  await prisma.collection.update({
    where: {
      id: Number(id),
    },
    data: {
      images: {
        connect: {
          id: image.id,
        },
      },
    },
  });

  return new Response(JSON.stringify(image), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
