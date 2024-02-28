import { ReactNode, useState } from "react";
//IMPORT COMPONENTS
import {
  FolderClosedIcon,
  LucideChevronDown,
  LucideChevronUp,
} from "lucide-react";
import { ScrollArea, ScrollViewPort } from "@/components/ui/scroll-area";
//IMPORT UTILS
import { cn } from "@/lib/utils";
import { numberFormat } from "@/lib/Numbers";

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
  const { name, total } = details;
  const wrapperClass = cn(divClass, "min-h-10 text-sm border");

  if (!name) return <div></div>;

  return (
    <div className={`${className}`}>
      <div className="flex justify-between rounded-md bg-violet-100 p-2 font-semibold shadow">
        <div className="flex items-center gap-2">
          <FolderClosedIcon className="h-4 w-4 opacity-60" color="blue" />
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
