export default function CollectionDetailsLoading() {
  return (
    <div className="flex flex-col w-full items-center justify-center bg-lightest min-h-screen pb-12">
      <div className="w-full px-10 mt-8 flex flex-col items-center justify-center text-center">
        <div className="h-10 w-48 bg-gray-300 animate-pulse rounded mb-4" />
        <div className="h-4 w-32 bg-gray-300 animate-pulse rounded" />
      </div>

      <div className="p-18 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-10 space-y-7 w-full">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="w-full h-64 bg-gray-300 animate-pulse rounded-sm"
          />
        ))}
      </div>
    </div>
  );
}
