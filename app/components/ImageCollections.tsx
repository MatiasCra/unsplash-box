"use client";

import Image from "next/image";
import RemoveFromCollectionButton from "./RemoveFromCollectionButton";

interface Collection {
  id: number;
  name: string;
  images: { regular: string }[];
  totalImages: number;
}

interface ImageCollectionsProps {
  unsplashId: string;
  collections: Collection[];
  onRemoveSuccess: () => void;
  isLoading?: boolean;
}

export default function ImageCollections({
  unsplashId,
  collections,
  onRemoveSuccess,
  isLoading = false,
}: ImageCollectionsProps) {
  return (
    <div>
      <h2 className="mt-8 text-xl font-semibold">Collections</h2>
      <div className="flex flex-col gap-3 mt-3">
        {isLoading && (
          <div className="flex flex-col gap-3 animate-fade-in">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex h-26 gap-3 p-3 rounded-lg bg-gray-200 animate-pulse"
              >
                <div className="w-20 h-20 rounded-md bg-gray-300" />
                <div className="flex flex-col flex-1 justify-center gap-2">
                  <div className="w-32 h-4 bg-gray-300 rounded" />
                  <div className="w-24 h-4 bg-gray-300 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}
        {!isLoading && (
          <div className="animate-fade-in">
            {(!collections || !collections.length) && (
              <p className="text text-dark">No collections yet</p>
            )}
            {collections &&
              collections.map(
                (collection: {
                  id: number;
                  name: string;
                  images: { regular: string }[];
                  totalImages: number;
                }) => {
                  return (
                    <RemoveFromCollectionButton
                      key={collection.id}
                      collectionId={collection.id}
                      unsplashId={unsplashId}
                      onRemoveSuccess={onRemoveSuccess}
                    >
                      <div className="flex h-20 w-fit flex-row">
                        <Image
                          className="aspect-square object-cover w-20 h-auto rounded-md"
                          src={collection.images[0].regular}
                          alt={`First picture of collection ${collection.name}`}
                          width={128}
                          height={128}
                        />
                        <div className="flex flex-col w-fit items-start justify-center h-full ml-4">
                          <p className="font-semibold">{collection.name}</p>
                          <p className="text-dark">
                            {collection.totalImages}{" "}
                            {collection.totalImages === 1 ? "Photo" : "Photos"}
                          </p>
                        </div>
                      </div>
                    </RemoveFromCollectionButton>
                  );
                },
              )}
          </div>
        )}
      </div>
    </div>
  );
}
