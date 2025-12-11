"use client";

import { useState, ReactNode } from "react";
import Image from "next/image";
import Minus from "@/assets/Remove.svg";

interface RemoveFromCollectionButtonProps {
  collectionId: number;
  unsplashId: string;
  children: ReactNode;
}

export default function RemoveFromCollectionButton({
  collectionId,
  unsplashId,
  children,
}: RemoveFromCollectionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await fetch(`/api/collections/${collectionId}/images/${unsplashId}`, {
        method: "DELETE",
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleRemove}
      disabled={isLoading}
      className="group h-26 w-full flex hover:bg-light p-3 rounded-lg transition-colors duration-150 justify-between cursor-pointer"
    >
      {children}
      <div className={`flex h-full items-center justify-center mr-3 gap-3 transition-opacity duration-150 ${isLoading ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
        {isLoading ? (
          <div className="size-5 border-2 border-light border-t-darker rounded-full animate-spin" />
        ) : (
          <Image src={Minus} alt="minus" width={25} height={25} />
        )}
        <p>{isLoading ? "Removing..." : "Remove"}</p>
      </div>
    </button>
  );
}
