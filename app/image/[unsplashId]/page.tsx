import { Metadata } from "next";
import Image from "next/image";
import { fetchImage, fetchImageCollections } from "@/app/utils/api";
import ImagePageContent from "@/app/components/ImagePageContent";

export const metadata: Metadata = {
  title: "Search images",
  description: "Search for Unsplash pictures",
};

interface ImageData {
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
}

export default async function ImageView({
  params,
}: {
  params: Promise<{ unsplashId: string }>;
}) {
  const id = (await params).unsplashId;
  const imageData: ImageData = await fetchImage(id);
  const collections = await fetchImageCollections(id);

  return (
    <div className="flex flex-col lg:flex-row m-10 gap-8">
      <div className="flex items-center justify-center w-full lg:w-1/2">
        <Image
          className="sm:max-w-8/12 lg:max-w-full lg:w-full h-auto rounded-lg"
          src={imageData.urls.regular}
          alt={imageData.alt_description}
          width={imageData.width}
          height={imageData.height}
          style={{ viewTransitionName: `img-${id}` }}
        />
      </div>
      <div className="w-full lg:w-1/2">
        <ImagePageContent
          imageData={imageData}
          unsplashId={id}
          initialCollections={collections || []}
        />
      </div>
    </div>
  );
}
