import { numberFormat } from "@/lib/numbers";

function TotalCard({ total }: { total: number | string }) {
  return (
    <div className="mt-2 flex w-full flex-col items-end justify-center">
      <p className="rounded-md border border-primary/60  bg-[#e8eaf6] px-4 py-1 text-lg font-semibold tracking-wide shadow-sm dark:border-slate-700 dark:bg-slate-900">
        Total: {numberFormat(total)}
      </p>
    </div>
  );
}

export default TotalCard;
