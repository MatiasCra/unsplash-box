"use client";

import Search from "@/assets/Search.svg";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface SearchbarProps {
  className?: string;
}

export default function Searchbar({ className }: SearchbarProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  return (
    <form
      className={`${className ?? ""} w-full flex justify-center`}
      method="GET"
      action="/search"
      style={{ viewTransitionName: "searchbar" }}
    >
      <div className="relative w-full sm:w-xl lg:w-2xl">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Enter your keywords..."
          className="w-full p-4 rounded-lg border border-light shadow-sm focus:outline-none  bg-lightest"
        />
        <button className="absolute right-4 top-4 cursor-pointer" type="submit">
          <Image src={Search} alt="search" />
        </button>
      </div>
    </form>
  );
}
