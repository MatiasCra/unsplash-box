import Link from "next/link";

export default function CollectionsLoading() {
  return (
    <div className="flex flex-col w-full bg-lightest overflow-hidden pb-6">
      <div className="w-full px-10 mt-8 flex flex-col items-center justify-center text-center">
        <h1 className="font-semibold text-4xl bg-linear-to-r from-[#F2C596] via-[#C7788F] to-[#8A307F] bg-clip-text text-transparent">
          Collections
        </h1>
        <h2 className="text-[1rem]/5 my-3">
          Explore the world through collections of beautiful <br />
          photos free to use under the
          <Link
            href="https://unsplash.com/license"
            target="_blank"
            className="text-darker underline ml-1 font-semibold"
          >
            Unsplash License
          </Link>
          .
        </h2>
      </div>

      {/* Grid skeleton */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12 xl:gap-16 w-full place-content-center p-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl flex justify-center items-center size-full"
          >
            <div className="w-full h-80 bg-gray-300 animate-pulse rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
