import { numberFormat } from "@/lib/Numbers";
import { cn } from "@/lib/utils";
import {
  FolderClosedIcon,
  LucideChevronDown,
  LucideChevronUp,
} from "lucide-react";
import { ReactNode, useState } from "react";

type CategoryDetails = {
  icon: string | null;
  name: string;
  total: number;
};

type CategoryCardProps = {
  children: ReactNode;
  details: CategoryDetails;
  className?: string;
  divClass?: string;
};

function CategoryCard({
  children,
  details,
  className,
  divClass,
}: CategoryCardProps) {
  const [expand, setExpand] = useState(false);
  const { name, total } = details;
  const chevronBtnClass = total > 0 ? "" : "opacity-0";
  const wrapperClass = cn(
    divClass,
    "min-h-10 bg-slate-100 p-4 text-sm rounded-md",
  );

  if (!name) return null;

  return (
    <div className={className}>
      <div className="flex justify-between font-semibold">
        <div className="flex items-center gap-2">
          <FolderClosedIcon className="h-4 w-4 opacity-60" color="blue" />
          <p>{name}</p>
        </div>
        <div className="flex items-center gap-2">
          <span>{numberFormat(total)}</span>
          <button
            className={chevronBtnClass}
            disabled={total <= 0}
            onClick={() => setExpand(!expand)}
          >
            {expand ? (
              <LucideChevronUp
                className="h-6 w-6 animate-accordion-up"
                color="green"
              />
            ) : (
              <LucideChevronDown
                className="h-6 w-6 animate-accordion-down"
                color="green"
              />
            )}
          </button>
        </div>
      </div>
      <div className={`${expand ? "block" : "hidden"} ${wrapperClass}`}>
        {children}
      </div>
    </div>
  );
}

export default CategoryCard;
