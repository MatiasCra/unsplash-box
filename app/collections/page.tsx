import Image from "next/image";
import HeroLeft from "@/assets/hero-left.png";
import HeroRight from "@/assets/hero-right.png";
import Search from "@/assets/Search.svg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-lightest absolute top-0 left-0 overflow-hidden"></div>
  );
}
