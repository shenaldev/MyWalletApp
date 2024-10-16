import { ReactNode, useMemo, useState } from "react";

import { LucideChevronDown, LucideChevronUp } from "lucide-react";

import { ScrollArea, ScrollViewPort } from "@/components/ui/scroll-area";

import { numberFormat } from "@/lib/numbers";
//IMPORT UTILS
import { cn } from "@/lib/utils";

//IMPORT COMPONENTS
import CategoryIcon from "./CategoryIcon";

type CategoryDetails = {
  icon: string | null;
  name: string;
  slug?: string;
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
  const { name, total, icon } = details;
  const wrapperClass = cn(divClass, "min-h-10 text-sm border");

  const getIcon = useMemo(() => {
    return <CategoryIcon icon={icon} className="size-4" />;
  }, [icon]);

  if (!name) return <div></div>;

  return (
    <div className={`${className}`}>
      <div className="flex justify-between rounded-lg bg-[#FAFAFA] p-2 font-semibold shadow dark:bg-slate-900">
        <div className="flex items-center gap-2">
          {getIcon}
          <p>{name}</p>
        </div>
        <div className="flex items-center gap-2">
          <span>{numberFormat(total)}</span>
          <button onClick={() => setExpand(!expand)}>
            {expand ? (
              <LucideChevronUp className="h-6 w-6" color="green" />
            ) : (
              <LucideChevronDown className="h-6 w-6" color="green" />
            )}
          </button>
        </div>
      </div>
      <div className={`${expand ? "block" : "hidden"} ${wrapperClass}`}>
        <ScrollArea>
          <ScrollViewPort className="max-h-64">{children}</ScrollViewPort>
        </ScrollArea>
      </div>
    </div>
  );
}

export default CategoryCard;
