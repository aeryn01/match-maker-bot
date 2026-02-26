export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="glass-panel p-6 rounded-2xl h-[220px] animate-pulse flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div className="w-24 h-6 bg-secondary rounded-full" />
            <div className="w-16 h-4 bg-secondary rounded" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-secondary rounded-xl" />
            <div className="space-y-2 flex-1">
              <div className="w-3/4 h-5 bg-secondary rounded" />
              <div className="w-1/2 h-6 bg-secondary rounded" />
            </div>
          </div>
          <div className="border-t border-white/5 pt-4 flex justify-between">
            <div className="w-20 h-8 bg-secondary rounded-full" />
            <div className="w-20 h-8 bg-secondary rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
