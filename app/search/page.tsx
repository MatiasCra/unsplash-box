import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GradientBg from "@/assets/gradiend-bg@2x.png";
import Searchbar from "../components/Searchbar";
import { searchImages } from "../utils/api";

export const metadata: Metadata = {
  title: "Search images",
  description: "Search for Unsplash pictures",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const images = q ? await searchImages(q) : null;

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <Image
        src={GradientBg}
        alt="Gradient background"
        className="h-28"
        loading="eager"
      />
      <Searchbar className="-mt-8 max-w-11/12" />
      {images && images.length > 0 && (
        <div className="p-18 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-10 space-y-7">
          {images.map(
            (
              image: {
                unsplashId: string;
                regular: string;
                alt_description: string;
                width: number;
                height: number;
              },
              index: number,
            ) => (
              <Link
                key={index}
                href={`/image/${image.unsplashId}`}
                className="w-full h-auto flex items-center justify-center"
              >
                <Image
                  src={image.regular}
                  alt={image.alt_description}
                  width={image.width}
                  height={image.height}
                  className="w-full h-auto rounded-sm"
                  style={{ viewTransitionName: image.unsplashId }}
                />
              </Link>
            ),
          )}
        </div>
      )}
      {!q && (
        <div className="flex flex-col items-center justify-center mt-6 text-dark">
          <p className="text-center">Make a search to find Unspash images</p>
        </div>
      )}
      {q && images && !images.length && (
        <div className="flex flex-col items-center justify-center mt-6 text-dark">
          <p className="text-center">
            No images found, try searching something else
          </p>
        </div>
      )}
    </div>
  );
}
