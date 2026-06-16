export default function AdSidebar() {
  return (
    <div className="hidden lg:flex flex-col gap-6 w-[300px] flex-shrink-0 sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto pb-6">
      <div className="flex flex-col items-center">
        <span className="text-xs text-[var(--theme-text-muted)] mb-1 uppercase tracking-wider font-semibold">Advertisement</span>
        <div className="w-[300px] h-[250px] bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded flex items-center justify-center">
          <span className="text-blue-500 dark:text-blue-400 font-medium">Ad Space (300x250)</span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs text-[var(--theme-text-muted)] mb-1 uppercase tracking-wider font-semibold">Advertisement</span>
        <div className="w-[300px] h-[250px] bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded flex items-center justify-center">
          <span className="text-blue-500 dark:text-blue-400 font-medium">Ad Space (300x250)</span>
        </div>
      </div>
    </div>
  );
}
