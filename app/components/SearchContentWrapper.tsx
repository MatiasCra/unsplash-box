"use client";

import dynamic from "next/dynamic";
import ImageSkeleton from "./ImageSkeleton";
import { Suspense } from "react";

const SearchContent = dynamic(() => import("./SearchContent"), {
  ssr: false,
  loading: () => (
    <div className="p-18 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-10 space-y-7">
      {[...Array(10)].map((_, index) => (
        <ImageSkeleton key={index} />
      ))}
    </div>
  ),
});

export default function SearchContentWrapper() {
  return (
    <Suspense
      fallback={
        <div className="p-18 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-10 space-y-7">
          {[...Array(10)].map((_, index) => (
            <ImageSkeleton key={index} />
          ))}
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}