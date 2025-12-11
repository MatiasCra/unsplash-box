"use client";

import Search from "@/assets/Search.svg";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface SearchbarProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  showButton?: boolean;
}

export default function Searchbar({
  className,
  placeholder = "Enter your keywords...",
  value,
  onChange,
}: SearchbarProps) {
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get("q") ?? "";

  const isControlled = value !== undefined && onChange !== undefined;

  const handleSubmit = (e: React.FormEvent) => {
    if (isControlled) {
      e.preventDefault();
    }
  };

  return (
    <form
      className={`${className ?? ""} w-full flex justify-center`}
      method="GET"
      action="/search"
      style={{ viewTransitionName: "searchbar" }}
      onSubmit={handleSubmit}
    >
      <div className="relative w-full sm:w-xl lg:w-2xl">
        <input
          type="text"
          name="q"
          value={isControlled ? value : undefined}
          defaultValue={isControlled ? undefined : defaultQuery}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          placeholder={placeholder}
          className="w-full p-4 rounded-lg border border-light shadow-sm focus:outline-none bg-lightest"
        />
        <button className="absolute right-4 top-4 cursor-pointer" type="submit">
          <Image src={Search} alt="search" />
        </button>
      </div>
    </form>
  );
}
