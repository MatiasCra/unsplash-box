import Link from "next/link";
import Image from "next/image";

interface CollectionPreviewProps {
  className?: string;
  name: string;
  images: {
    unsplashId: string;
    regular: string;
  }[];
  totalImages: number;
}

export default function CollectionPreview({
  className,
  name,
  images,
  totalImages,
}: CollectionPreviewProps) {
  return (
    <Link
      href="#"
      className={`${className || ""} w-full size-full rounded-lg h-80 hover:scale-105 transition-transform duration-200`}
    >
      {!images.length && (
        <div className="bg-light h-10/12 w-full rounded-lg flex flex-col gap-2 text-dark font-medium items-center justify-center">
          <h3 className="text-2xl">Empty</h3>
          <h3 className="text-center mx-3">
            There are no images in this collection
          </h3>
        </div>
      )}
      {!!images.length && images.length < 3 && (
        <Image
          src={images[0].regular}
          alt={name}
          width={1000}
          height={1000}
          className="w-full object-cover h-10/12 rounded-lg"
        />
      )}
      {!!images.length && images.length >= 3 && (
        <div className="grid size-full grid-cols-4 grid-rows-2 gap-1 h-10/12">
          <Image
            src={images[0].regular}
            alt={name}
            width={1000}
            height={1000}
            className="row-span-2 col-span-3 size-full object-cover rounded-l-lg"
          />
          <Image
            src={images[1].regular}
            alt={name}
            width={1000}
            height={1000}
            className="size-full object-cover rounded-tr-lg"
          />
          <Image
            src={images[2].regular}
            alt={name}
            width={1000}
            height={1000}
            className="size-full object-cover rounded-br-lg"
          />
        </div>
      )}
      <div className="h-2/12 mt-3">
        <h2 className="text-[1rem] font-semibold">{name}</h2>
        <p className="text-sm text-dark">{totalImages} Photos</p>
      </div>
    </Link>
  );
}
