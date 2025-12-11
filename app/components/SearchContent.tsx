"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchImages } from "../utils/api";
import ImageSkeleton from "./ImageSkeleton";

interface UnsplashImage {
  unsplashId: string;
  regular: string;
  alt_description: string;
  width: number;
  height: number;
}

export default function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [images, setImages] = useState<UnsplashImage[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchImages() {
      if (q) {
        setLoading(true);
        const fetchedImages = await searchImages(q);
        setImages(fetchedImages);
        setLoading(false);
      } else {
        setImages(null);
      }
    }
    fetchImages();
  }, [q]);

  if (loading) {
    return (
      <div className="p-18 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-10 space-y-7">
        {[...Array(10)].map((_, index) => (
          <ImageSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      {images && images.length > 0 && (
        <div className="p-18 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-10 space-y-7">
          {images.map(
            (
              image: UnsplashImage,
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
                  style={{ viewTransitionName: `img-${image.unsplashId}` }}
                />
              </Link>
            ),
          )}
        </div>
      )}
      {!q && (
        <div className="flex flex-col items-center justify-center mt-6 text-dark">
          <p className="text-center">Make a search to find Unsplash images</p>
        </div>
      )}
      {q && images && !images.length && (
        <div className="flex flex-col items-center justify-center mt-6 text-dark">
          <p className="text-center">
            No images found, try searching something else
          </p>
        </div>
      )}
    </>
  );
}