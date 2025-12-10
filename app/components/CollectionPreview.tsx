import Link from "next/link";
import Image from "next/image";

interface CollectionPreviewProps {
  className?: string;
  name: string;
  images: {
    unsplashId: string;
    regular: string;
  }[];
}

export default function CollectionPreview({
  className,
  name,
  images,
}: CollectionPreviewProps) {
  return (
    <Link href="#" className={`${className || ""} w-full size-full rounded-lg`}>
      {!images.length && (
        <div className="bg-light h-10/12 w-full rounded-lg flex flex-col gap-2 text-dark font-medium items-center justify-center">
          <h3 className="text-2xl">Empty</h3>
          <h3 className="">There are no images in this collection</h3>
        </div>
      )}
      {!!images.length && images.length < 3 && (
        <Image
          src={images[0].regular}
          alt={name}
          width={1000}
          height={1000}
          className="size-full object-cover"
          style={{ viewTransitionName: images[0].unsplashId }}
        />
      )}
      {!!images.length && images.length >= 3 && (
        <div className="grid size-full grid-cols-2 grid-rows-2 gap-2">
          <Image
            src={images[0].regular}
            alt={name}
            width={1000}
            height={1000}
            className="col-span-2 size-full object-cover"
            style={{ viewTransitionName: images[0].unsplashId }}
          />
          <Image
            src={images[1].regular}
            alt={name}
            width={1000}
            height={1000}
            className="size-full object-cover"
            style={{ viewTransitionName: images[1].unsplashId }}
          />
          <Image
            src={images[2].regular}
            alt={name}
            width={1000}
            height={1000}
            className="size-full object-cover"
            style={{ viewTransitionName: images[2].unsplashId }}
          />
        </div>
      )}
      <div className="h-2/12 mt-3">
        <h2 className="text-[1rem] font-semibold">{name}</h2>
        <p className="text-sm text-dark">{images.length} Photos</p>
      </div>
    </Link>
  );
}
