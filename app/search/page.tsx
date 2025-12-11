import { Metadata } from "next";
import Image from "next/image";
import GradientBg from "@/assets/gradiend-bg@2x.png";
import Searchbar from "../components/Searchbar";
import SearchContentWrapper from "../components/SearchContentWrapper";

export const metadata: Metadata = {
  title: "Search images",
  description: "Search for Unsplash pictures",
};

export const dynamic = 'force-dynamic';

export default async function SearchPage() {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <Image
        src={GradientBg}
        alt="Gradient background"
        className="h-28"
        loading="eager"
      />
      <Searchbar className="-mt-8 max-w-11/12" />
      <SearchContentWrapper />
    </div>
  );
}