import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/prisma/prisma";

interface CollectionDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CollectionDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const collection = await prisma.collection.findUnique({
    where: { id: Number(id) },
  });

  return {
    title: collection?.name || "Collection",
  };
}

export default async function CollectionDetailsPage({
  params,
}: CollectionDetailsPageProps) {
  const { id } = await params;
  const collection = await prisma.collection.findUnique({
    where: { id: Number(id) },
    include: { images: true },
  });

  if (!collection) {
    return (
      <div className="flex flex-col w-full items-center justify-center min-h-screen">
        <p className="text-dark text-lg">Collection not found</p>
        <Link href="/collections" className="text-darker underline mt-4">
          Back to collections
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center bg-lightest">
      <div className="w-full px-10 pt-10 flex flex-col items-center justify-center text-center">
        <h1 className="font-semibold text-4xl bg-linear-to-r from-[#F2C596] via-[#C7788F] to-[#8A307F] bg-clip-text text-transparent">
          {collection.name}
        </h1>
        <p className="mt-2">
          {collection.images.length}{" "}
          {collection.images.length === 1 ? "Photo" : "Photos"}
        </p>
      </div>

      {collection.images.length > 0 ? (
        <div className="px-18 py-8 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-10 space-y-7 w-full">
          {collection.images.map((image) => (
            <Link
              key={image.id}
              href={`/image/${image.unsplashId}`}
              className="w-full h-auto flex items-center justify-center"
            >
              <Image
                src={image.regular}
                alt={image.unsplashId}
                width={400}
                height={400}
                className="w-full h-auto rounded-sm"
                style={{ viewTransitionName: `img-${image.unsplashId}` }}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-12 text-dark">
          <p className="text-center">This collection is empty</p>
        </div>
      )}
    </div>
  );
}
