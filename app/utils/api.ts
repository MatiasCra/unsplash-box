interface urlTypes {
  small: string;
  full: string;
  raw: string;
  regular: string;
  thumb: string;
}

export async function searchImages(keywords: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(
    `${baseUrl}/api/search/photos?query=${keywords}`,
  );
  const data = await response.json();
  return data.results
    .slice(0, 8)
    .map(
      (imageResponse: {
        id: string;
        urls: urlTypes;
        alt_description: string;
        width: number;
        height: number;
      }) => {
        return {
          unsplashId: imageResponse.id,
          alt_description: imageResponse.alt_description,
          width: imageResponse.width,
          height: imageResponse.height,
          ...imageResponse.urls,
        };
      },
    );
}
