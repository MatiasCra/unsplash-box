"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "../../assets/Logo.svg";

const selectedClasses = (pathname: string, path: string) =>
  (pathname === path
    ? "text-darker bg-light font-normal"
    : "hover:bg-lighter") +
  " text-dark px-5 py-2 rounded-sm transition-colors duration-150";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="h-18 px-10 border-b border-light flex justify-between relative z-10">
      <Link href="/" className="flex items-center">
        <Image src={Logo} alt="Unsplash Box Logo" className="h-7 w-auto" />
      </Link>
      <nav className="flex flex-row items-center justify-center gap-4 mr-4">
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
