import type { NextRequest } from "next/server";
import { prisma } from "@/prisma/prisma";

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
