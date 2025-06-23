export function BoardSkeleton() {
  return (
    <div className="p-4">
      <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 animate-pulse"></div>
      <div className="flex gap-4">
        <div className="w-72 bg-gray-200 dark:bg-gray-700 rounded-md p-4 animate-pulse">
          <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded-md mb-2"></div>
          <div className="space-y-2">
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          </div>
        </div>
        <div className="w-72 bg-gray-200 dark:bg-gray-700 rounded-md p-4 animate-pulse">
          <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded-md mb-2"></div>
          <div className="space-y-2">
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          </div>
        </div>
        <div className="w-72 bg-gray-200 dark:bg-gray-700 rounded-md p-4 animate-pulse">
          <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded-md mb-2"></div>
        </div>
      </div>
    </div>
  );
} 