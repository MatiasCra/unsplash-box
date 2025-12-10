import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery",
};

export default function Gallery() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-lightest">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Gallery Page
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Browse through our curated collection of beautiful photos.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Link
            href="/"
            className="flex h-12 w-full items-center justify-center rounded-full border border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="flex h-12 w-full items-center justify-center rounded-full border border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
          >
            About
          </Link>
        </div>
      </main>
    </div>
  );
}
