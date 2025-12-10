import { Metadata } from "next";
import Image from "next/image";
import { fetchImage, fetchImageCollections } from "@/app/utils/api";
import Plus from "@/assets/PlusDarker.svg";
import Download from "@/assets/down arrow.svg";

export const metadata: Metadata = {
  title: "Search images",
  description: "Search for Unsplash pictures",
};

interface ImageData {
  urls: {
    regular: string;
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
  const publishedDate = new Date(imageData.created_at);
  const collections = await fetchImageCollections(id);
  console.log(collections);

  return (
    <div className="flex flex-col lg:flex-row m-10 gap-8">
      <div className="flex items-center justify-center w-full lg:w-1/2">
        <Image
          className="sm:max-w-8/12 lg:max-w-full lg:w-full h-auto rounded-lg"
          src={imageData.urls.regular}
          alt={imageData.alt_description}
          width={imageData.width}
          height={imageData.height}
        />
      </div>
      <div>
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
          {publishedDate.toLocaleString("en-US", { month: "long" })}{" "}
          {publishedDate.getUTCDay()}, {publishedDate.getUTCFullYear()}
        </div>
        <div className="mt-4 flex gap-4">
          <button className="flex gap-3 px-6 py-2 rounded-sm bg-light cursor-pointer hover:brightness-75 transition duration-150">
            <Image src={Plus} alt="plus" width={20} height={20} />
            Add to Collection
          </button>
          <button className="flex gap-3 px-6 py-2 rounded-sm bg-light cursor-pointer hover:brightness-75 transition duration-150">
            <Image src={Download} alt="download" width={20} height={20} />
            Download
          </button>
        </div>
        <div>
          <h2 className="mt-8 text-xl font-semibold">Collections</h2>
          TODO
          {collections &&
            collections.map((collection: { name: string }) => collection.name)}
        </div>
      </div>
    </div>
  );
}
