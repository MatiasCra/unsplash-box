import Image from "next/image";
import HeroLeft from "@/assets/hero-left.png";
import HeroRight from "@/assets/hero-right.png";
import Searchbar from "./components/Searchbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-lightest absolute top-0 left-0 overflow-hidden">
      <main className="w-full flex flex-col items-center justify-center mx-4 sm:mx-12 -mt-20 relative z-20">
        <h1 className="text-4xl font-semibold">Search</h1>
        <h2 className="text-[1rem] mt-2 font-light text-center">
          Search high-resolution images from Unsplash
        </h2>
        <Searchbar className="mt-6" />
      </main>
      <Image
        src={HeroLeft}
        alt="hero-left"
        className="absolute top-38 2xl:-left-6 xl:-left-28 lg:-left-66 md:-left-74 sm:-left-92 -left-full h-9/12 w-auto"
      />
      <Image
        src={HeroRight}
        alt="hero-right"
        className="absolute top-38 2xl:-right-6 xl:-right-28 lg:-right-66 md:-right-74 sm:-right-92 -right-full h-9/12 w-auto"
      />
    </div>
  );
}
