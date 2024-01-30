import { Facebook, Mail } from "lucide-react";
import { Button } from "../ui/button";

function SocialButtons() {
  return (
    <div className="flex flex-col gap-2">
      <Button className="border border-slate-600 bg-white text-black hover:bg-gray-100">
        <Mail className="mr-2 h-4 w-4" />
        Login with Google
      </Button>
      <Button className="bg-[#2374f2] hover:bg-[#2372f2ea]">
        <Facebook className="mr-2 h-4 w-4" />
        Login with Facebook
      </Button>
    </div>
  );
}

export default SocialButtons;
