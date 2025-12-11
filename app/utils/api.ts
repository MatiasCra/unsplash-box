"use server";

import { getCollectionsData } from "../api/collections/route";
import { getUnsplashPhotoData } from "../api/photos/[id]/route";
import { getImageCollectionsData } from "../api/images/collections/[unsplashId]/route";
import { getUnsplashSearchResults } from "../api/search/photos/route";

interface urlTypes {
  small: string;
  full: string;
  raw: string;
  regular: string;
  thumb: string;
}

export async function searchImages(keywords: string) {
  const query = new URLSearchParams({ query: keywords }).toString();
  const data = await getUnsplashSearchResults(query);
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

export async function fetchCollections() {
  const data = await getCollectionsData(); // Direct call
  return data;
}

export async function fetchImage(unsplashId: string) {
  const data = await getUnsplashPhotoData(unsplashId); // Direct call
  return data;
}

export async function fetchImageCollections(unsplashId: string) {
  const data = await getImageCollectionsData(unsplashId); // Direct call
  return data?.collections ?? [];
}
