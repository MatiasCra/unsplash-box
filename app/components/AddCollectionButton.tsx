"use client";

import { useState } from "react";
import Image from "next/image";
import Plus from "@/assets/Plus.svg";

export default function AddCollectionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  const handleClose = () => {
    if (isLoading) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isLoading) return;

    setIsLoading(true);

    await fetch("/api/collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setName("");
    window.location.reload();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="size-full h-80 rounded-lg bg-light flex flex-col gap-2 items-center justify-center
                 text-dark p-8 cursor-pointer hover:bg-gray-200 transition-transform duration-200 hover:scale-105"
      >
        <Image src={Plus} alt="add" className="size-8" />
        <h3 className="text-xl font-medium">Add a new collection</h3>
      </button>

      {isOpen && (
        <div
          className={`fixed inset-0 bg-darker/30 flex items-center justify-center z-50 ${isClosing ? "animate-fade-out" : "animate-fade-in"}`}
          onClick={handleClose}
        >
          <div
            className={`bg-white rounded-sm p-6 w-full max-w-2xl ${isClosing ? "animate-scale-out" : "animate-scale-in"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="size-10 border-3 border-light border-t-darker rounded-full animate-spin mb-4" />
                <p className="text-dark">Creating collection...</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-6 w-full text-center">
                  Add Collection
                </h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Collection name"
                    className="w-full p-3 border border-light rounded-lg focus:outline-none mb-4"
                    autoFocus
                  />
                  <div className="flex justify-center gap-4">
                    <button
                      type="submit"
                      className="rounded-sm cursor-pointer px-5 py-2 text-darker bg-light hover:brightness-75 transition duration-150"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="rounded-sm cursor-pointer px-5 py-2 text-darker hover:bg-light transition-colors duration-150"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
