import { useRemoveCookies } from "@/hooks/api-calls/ApiCalls";
import { useMutation } from "@tanstack/react-query";
import { LogOutIcon, User2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

//IMPORT PROVIDERS
import { useAuth } from "@/components/providers/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
//IMPORT COMPONENTS
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//IMPORT UTILS
import ApiUrls from "@/lib/ApiUrls";
import { axiosCall } from "@/lib/axiosCall";

import LoadingDialog from "../../elements/dialogs/LoadingDialog";

function UserDropdown() {
  const user = useAuth();

  /**
   * Lougout Mutation
   * if logout not successfull then remove cookies and logout
   * redirect to home page
   */
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      return axiosCall({ method: "POST", urlPath: ApiUrls.auth.logout });
    },
    onError: (error) => {
      console.log("err", error);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const cookies = useRemoveCookies();
      if (cookies.isSuccess) {
        user.logout();
        window.location.replace("/");
      } else {
        toast.error("Something went wrong");
      }
    },
    onSuccess: () => {
      user.logout();
      window.location.replace("/");
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
