import type { NextRequest } from "next/server";
import { unsplashApiUrl } from "@/data/constants";

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

  const url = `${unsplashApiUrl}/photos/${id}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${process.env.ACCESS_KEY}`,
    },
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch photo" }), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await response.json();
  return Response.json(data);
}
