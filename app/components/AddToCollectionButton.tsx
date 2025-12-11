"use client";

import { useState, useMemo, useCallback, Suspense } from "react";
import Image from "next/image";
import Plus from "@/assets/PlusDarker.svg";
import Searchbar from "./Searchbar";
import { useRouter } from "next/navigation";

interface Collection {
  id: number;
  name: string;
  images: { unsplashId: string; regular: string }[];
  totalImages: number;
}

interface AddToCollectionButtonProps {
  unsplashId: string;
}

export default function AddToCollectionButton({
  unsplashId,
}: AddToCollectionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [search, setSearch] = useState("");
  const [collections, setCollections] = useState<Collection[]>([]);
  const [existingCollectionIds, setExistingCollectionIds] = useState<number[]>(
    [],
  );
  const router = useRouter();

  const filteredCollections = useMemo(
    () =>
      collections
        .filter((c) => !existingCollectionIds.includes(c.id))
        .filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [search, collections, existingCollectionIds],
  );

  const handleOpen = useCallback(async () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";

    setIsFetching(true);
    try {
      const [collectionsRes, imageCollectionsRes] = await Promise.all([
        fetch("/api/collections"),
        fetch(`/api/images/collections/${unsplashId}`),
      ]);

      const collectionsData = await collectionsRes.json();
      setCollections(collectionsData);

      if (imageCollectionsRes.ok) {
        const imageData = await imageCollectionsRes.json();
        setExistingCollectionIds(
          imageData.collections?.map((c: { id: number }) => c.id) ?? [],
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  }, [unsplashId]);

  const handleClose = () => {
    if (isLoading) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setSearch("");
      document.body.style.overflow = "";
    }, 200);
  };

  const handleAddToCollection = async (collectionId: number) => {
    setIsLoading(true);

    await fetch(`/api/collections/${collectionId}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ unsplashId }),
    });

    setIsLoading(false);
    router.refresh();
    handleClose();
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex gap-3 px-6 py-2 rounded-sm bg-light cursor-pointer hover:brightness-75 transition duration-150"
      >
        <Image
          src={Plus}
          alt="plus"
          width={20}
          height={20}
          className="w-auto h-auto"
        />
        Add to Collection
      </button>

      {isOpen && (
        <div
          className={`fixed inset-0 bg-darker/30 flex items-center justify-center z-50 ${isClosing ? "animate-fade-out" : "animate-fade-in"}`}
          onClick={handleClose}
        >
          <div
            className={`bg-white rounded-sm p-5 w-full lg:max-w-2xl max-h-[70vh] flex flex-col ${isClosing ? "animate-scale-out" : "animate-scale-in"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="size-10 border-3 border-light border-t-darker rounded-full animate-spin mb-4" />
                <p className="text-dark">Adding to collection...</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Add to Collections
                </h2>
                <Suspense>
                  <Searchbar
                    value={search}
                    onChange={setSearch}
                    placeholder="Search collections..."
                    className="mb-4 mt-2"
                  />
                </Suspense>
                <div className="overflow-y-auto flex-1">
                  {isFetching ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="size-8 border-3 border-light border-t-darker rounded-full animate-spin mb-4" />
                      <p className="text-dark">Loading collections...</p>
                    </div>
                  ) : filteredCollections.length === 0 ? (
                    <p className="text-dark text-center py-4">
                      No collections found
                    </p>
                  ) : (
                    <div>
                      <p className="text-dark text-sm mb-1 ml-3">
                        {filteredCollections.length} matches
                      </p>
                      <ul className="space-y-2">
                        {filteredCollections.map((collection) => (
                          <li key={collection.id}>
                            <button
                              onClick={() =>
                                handleAddToCollection(collection.id)
                              }
                              className="group cursor-pointer w-full p-3 rounded-lg hover:bg-light transition-colors flex items-center gap-3 text-left"
                            >
                              <div className="flex -space-x-2">
                                {collection.images.slice(0, 3).map((img, i) => (
                                  <Image
                                    key={img.unsplashId}
                                    src={img.regular}
                                    alt=""
                                    width={64}
                                    height={64}
                                    className="size-16 rounded-md object-cover border-2 border-white"
                                    style={{ zIndex: 3 - i }}
                                  />
                                ))}
                                {collection.images.length === 0 && (
                                  <div className="size-16 rounded-md bg-gray-200 flex items-center justify-center">
                                    <p className="text-xs text-dark">Empty</p>
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col flex-1">
                                <span className="font-medium">
                                  {collection.name}
                                </span>
                                <span className="font-medium text-dark">
                                  {collection.totalImages}{" "}
                                  {collection.totalImages == 1
                                    ? "Photo"
                                    : "Photos"}
                                </span>
                              </div>
                              <div className="h-5 flex items-center justify-center gap-3 text-sm mr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Image src={Plus} alt="plus" />
                                <p className="-mb-0.5">Add to collection</p>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
