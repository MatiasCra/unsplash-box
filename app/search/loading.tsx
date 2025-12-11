import Image from "next/image";
import GradientBg from "@/assets/gradiend-bg@2x.png";
import Searchbar from "../components/Searchbar";
import ImageSkeleton from "../components/ImageSkeleton";

export default function SearchLoading() {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <Image
        src={GradientBg}
        alt="Gradient background"
        className="h-28"
        loading="eager"
      />
      <Searchbar className="-mt-8 max-w-11/12" />
      <div className="p-18 w-full columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-10 space-y-7">
        {Array.from({ length: 12 }).map((_, index) => (
          <ImageSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
