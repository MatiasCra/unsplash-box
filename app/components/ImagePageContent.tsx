"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Download from "@/assets/down arrow.svg";
import AddToCollectionButton from "./AddToCollectionButton";
import ImageCollections from "./ImageCollections";

interface Collection {
  id: number;
  name: string;
  images: { regular: string }[];
  totalImages: number;
}

interface ImagePageContentProps {
  imageData: {
    urls: {
      regular: string;
      raw: string;
    };
    alt_description: string;
    width: number;
    height: number;
    user: {
      name: string;
      links: {
        hrml: string;
      };
      profile_image: {
        medium: string;
      };
    };
    created_at: string;
  };
  unsplashId: string;
  initialCollections: Collection[];
}

export default function ImagePageContent({
  imageData,
  unsplashId,
  initialCollections,
}: ImagePageContentProps) {
  const [collections, setCollections] = useState<Collection[]>(
    initialCollections,
  );
  const [isLoading, setIsLoading] = useState(false);

  const refetchCollections = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/images/collections/${unsplashId}`,
      );
      if (response.ok) {
        const data = await response.json();
        setCollections(data.collections ?? []);
      }
    } catch (err) {
      console.error("Failed to refetch collections:", err);
    } finally {
      setIsLoading(false);
    }
  }, [unsplashId]);

  return (
    <>
      <div className="flex items-center h-fit gap-4">
        <Image
          className="rounded-full"
          src={imageData.user.profile_image.medium}
          width={50}
          height={50}
          alt={imageData.user.name}
        />
        <p className="font-semibold">{imageData.user.name}</p>
      </div>
      <div className="mt-4 text-dark">
        Published on:{" "}
        {new Date(imageData.created_at).toLocaleString("en-US", {
          month: "long",
        })}{" "}
        {new Date(imageData.created_at).getUTCDay()},{" "}
        {new Date(imageData.created_at).getUTCFullYear()}
      </div>
      <div className="mt-4 flex gap-4">
        <AddToCollectionButton
          unsplashId={unsplashId}
          onAddSuccess={refetchCollections}
        />
        <a
          href={`${imageData.urls.raw}&dl=`}
          download
          className="flex gap-3 px-6 py-2 rounded-sm bg-light cursor-pointer hover:brightness-75 transition duration-150"
        >
          <Image
            src={Download}
            alt="download"
            width={20}
            height={20}
            className="w-auto h-auto"
          />
          Download
        </a>
      </div>
      <ImageCollections
        unsplashId={unsplashId}
        collections={collections}
        onRemoveSuccess={refetchCollections}
        isLoading={isLoading}
      />
    </>
  );
}
