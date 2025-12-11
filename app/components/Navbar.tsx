"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "../../assets/Logo.svg";

const isSelected = (pathname: string, path: string) => {
  if (path === "/") {
    return pathname === "/" || pathname.startsWith("/search");
  }
  return pathname === path || pathname.startsWith(path + "/");
};

const selectedClasses = (pathname: string, path: string) =>
  (isSelected(pathname, path)
    ? "text-darker bg-light font-normal"
    : "hover:bg-lighter") +
  " text-dark px-5 py-2 rounded-sm transition-colors duration-150";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="h-18 px-4 md:px-10 border-b border-light flex justify-between relative z-10">
      <Link href="/" className="flex items-center">
        <Image
          src={Logo}
          alt="Unsplash Box Logo"
          className="h-7 w-auto"
          loading="eager"
        />
      </Link>
      <nav className="flex flex-row items-center justify-center max-sm:text-sm gap-2 lg:gap-4 lg:mr-4">
        <Link href="/" className={`${selectedClasses(pathname, "/")}`}>
          Home
        </Link>
        <Link
          href="/collections"
          className={`${selectedClasses(pathname, "/collections")}`}
        >
          Collections
        </Link>
      </nav>
    </header>
  );
}
