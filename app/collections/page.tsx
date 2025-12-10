import { Metadata } from "next";
import { fetchCollections } from "../utils/api";
import CollectionPreview from "../components/CollectionPreview";
import Link from "next/link";
import AddCollectionButton from "../components/AddCollectionButton";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const collections = await fetchCollections();

  return (
    <div className="flex flex-col w-full bg-lightest overflow-hidden pb-6">
      <div className="w-full px-10 mt-8 flex flex-col items-center justify-center text-center">
        <h1 className="font-semibold text-4xl bg-linear-to-r from-[#F2C596] via-[#C7788F] to-[#8A307F] bg-clip-text text-transparent">
          Collections
        </h1>
        <h2 className="text-[1rem]/5 my-3">
          Explore the world through collections of beautiful <br />
          photos free to use under the
          <Link href="#" className="text-darker underline ml-1 font-semibold">
            Unsplash License
          </Link>
          .
        </h2>
      </div>
      <div className="grid gap-8 grid-cols-3 lg:gap-12 xl:gap-16 w-full place-content-center p-10">
        {collections.map(
          (collection: {
            id: string;
            name: string;
            images: { unsplashId: string; regular: string }[];
          }) => (
            <div
              key={collection.id}
              className="rounded-xl flex justify-center items-center size-full"
            >
              <CollectionPreview
                images={collection.images}
                name={collection.name}
              />
            </div>
          ),
        )}
        <AddCollectionButton />
      </div>
    </div>
  );
}
