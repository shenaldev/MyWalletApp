import { Skeleton } from "../skeleton";

function CategoryCardSkeleton({ items }: { items: number }) {
  const skeletons: JSX.Element[] = [];

  Array.from({ length: items }).map((_, index) =>
    skeletons.push(
      <div
        className="flex h-10 justify-between rounded-md bg-slate-100 p-2 font-semibold"
        key={index}
      >
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32 rounded-full" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
        </div>
      </div>,
    ),
  );

  return skeletons;
}

export default CategoryCardSkeleton;
