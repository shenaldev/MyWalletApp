import useAuth from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { LogOutIcon, User2Icon } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuthProvider } from "@/components/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import LoadingDialog from "../../elements/dialogs/LoadingDialog";

function UserDropdown() {
  const { logout } = useAuth();
  const user = useAuthProvider();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      return logout("api/v1/logout");
    },
  });

  // Logout Button Click Handler Execute Logout Mutation
  async function handleLogout() {
    mutateAsync();
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild={true}>
          <Button variant="ghost" className="relative rounded-full" size="icon">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="bg-primary text-white">
                {user?.user?.name?.charAt(1).toUpperCase() || "A"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mt-1">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-bold">{user?.user?.name}</span>
              <span className="text-xs text-gray-500">{user?.user?.email}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User2Icon className="mr-2 h-4 w-4" />
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOutIcon className="mr-2 h-4 w-4" />
            <button onClick={handleLogout}>Logout</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isPending && <LoadingDialog open={true} />}
    </>
  );
}

export default UserDropdown;
