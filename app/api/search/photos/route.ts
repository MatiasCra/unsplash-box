import { unsplashApiUrl } from "@/data/constants";

export async function getUnsplashSearchResults(query: string) {
  const url = `${unsplashApiUrl}/search/photos?${query}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${process.env.ACCESS_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from Unsplash: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (!searchParams.get("page")) {
    searchParams.set("page", "1");
  }

  const query = searchParams.toString();

  try {
    const data = await getUnsplashSearchResults(query);
    return Response.json(data);
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
