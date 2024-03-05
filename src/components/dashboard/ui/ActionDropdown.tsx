import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActionType } from "@/types/types";
import { EyeIcon, MoreVerticalIcon, Pencil, TrashIcon } from "lucide-react";

const buttonClasses = "flex items-center font-medium w-full";
const iconClasses = "size-4 mr-3";
const iconColor = "#2E4053";

type ActionDropdownProps = {
  onClick: (action: ActionType) => void;
};

function ActionDropdown({ onClick }: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true}>
        <button className="flex items-center">
          <MoreVerticalIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button className={buttonClasses} onClick={() => onClick("view")}>
            <EyeIcon className={iconClasses} color={iconColor} /> View
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button className={buttonClasses} onClick={() => onClick("edit")}>
            <Pencil className={iconClasses} color={iconColor} /> Edit
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button className={buttonClasses} onClick={() => onClick("delete")}>
            <TrashIcon className={iconClasses} color={iconColor} /> Delete
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionDropdown;
