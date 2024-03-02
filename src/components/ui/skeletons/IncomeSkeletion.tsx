import { Skeleton } from "../skeleton";

function IncomeSkeletion({ items }: { items: number }) {
  const skeletons: JSX.Element[] = [];

  Array.from({ length: items }).map((_, index) =>
    skeletons.push(
      <li
        key={index}
        className="flex justify-between gap-4 bg-slate-100 px-3 py-3 font-medium"
      >
        <Skeleton className="h-2 w-4 rounded-full" />
        <Skeleton className="h-2 w-32 rounded-full" />
        <Skeleton className="h-2 w-6 rounded-full" />
      </li>,
    ),
  );

  return skeletons;
}

export default IncomeSkeletion;
