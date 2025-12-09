import { unsplashApiUrl } from "@/data/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (!searchParams.get("page")) {
    searchParams.set("page", "1");
  }

  const query = searchParams.toString();
  const url = `${unsplashApiUrl}/search/photos?${query}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${process.env.ACCESS_KEY}`,
    },
  });

  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch from Unsplash" }),
      {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const data = await response.json();
  return Response.json(data);
}
