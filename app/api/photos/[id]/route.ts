import type { NextRequest } from "next/server";
import { unsplashApiUrl } from "@/data/constants";

export async function getUnsplashPhotoData(id: string) {
  const url = `${unsplashApiUrl}/photos/${id}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${process.env.ACCESS_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch photo: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
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

  try {
    const data = await getUnsplashPhotoData(id);
    return Response.json(data);
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
