import type { NextRequest } from "next/server";
import { prisma } from "@/prisma/prisma";

import { Image, Collection } from "@/app/generated/client";

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

  const { imageId }: { imageId: number } = await request.json();

  return new Response(JSON.stringify(collection), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
