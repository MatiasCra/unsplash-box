export default function ImageLoading() {
  return (
    <div className="flex flex-col lg:flex-row m-10 gap-8">
      {/* Image skeleton */}
      <div className="flex items-center justify-center w-full lg:w-1/2">
        <div className="sm:max-w-8/12 lg:max-w-full lg:w-full bg-gray-300 animate-pulse rounded-lg" style={{ aspectRatio: "16/9" }} />
      </div>

      {/* Details skeleton */}
      <div className="w-full lg:w-1/2">
        {/* Author section */}
        <div className="flex items-center h-fit gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse" />
          <div className="w-32 h-6 bg-gray-300 animate-pulse rounded" />
        </div>

        {/* Published date */}
        <div className="mt-4 w-48 h-6 bg-gray-300 animate-pulse rounded" />

        {/* Buttons */}
        <div className="mt-4 flex gap-4">
          <div className="w-40 h-10 bg-gray-300 animate-pulse rounded" />
          <div className="w-40 h-10 bg-gray-300 animate-pulse rounded" />
        </div>

        {/* Collections section */}
        <div className="mt-8">
          <div className="w-24 h-6 bg-gray-300 animate-pulse rounded" />
          <div className="flex flex-col gap-3 mt-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex h-20 w-fit">
                <div className="w-20 h-20 bg-gray-300 animate-pulse rounded-md" />
                <div className="ml-4 flex flex-col justify-center gap-2">
                  <div className="w-32 h-4 bg-gray-300 animate-pulse rounded" />
                  <div className="w-24 h-4 bg-gray-300 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
