import { Facebook, Mail } from "lucide-react";
import { Button } from "../ui/button";

type propTypes = {
  action?: "Login" | "Signup";
  wrapperClass?: string;
};
function SocialButtons({ action = "Login", wrapperClass }: propTypes) {
  return (
    <div
      className={`flex flex-col gap-2 ${wrapperClass != undefined ? wrapperClass : ""}`}
    >
      <Button className="border border-slate-600 bg-white text-black hover:bg-gray-100">
        <Mail className="mr-2 h-4 w-4" />
        {action} with Google
      </Button>
      <Button className="bg-[#2374f2] hover:bg-[#2372f2ea]">
        <Facebook className="mr-2 h-4 w-4" />
        {action} with Facebook
      </Button>
    </div>
  );
}

export default SocialButtons;
