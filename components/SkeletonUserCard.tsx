export default function SkeletonUserCard() {
  const skeletonItems = Array(10).fill(null);
  
  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
      {skeletonItems.map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="w-full max-w-xs mx-auto p-5 border border-gray-200 rounded-xl shadow-sm animate-pulse"
        >
          <div className="flex space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-5/6" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-3 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}