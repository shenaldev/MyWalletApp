import { Facebook, Mail } from "lucide-react";

import { Button } from "../ui/button";

function SocialButtons() {
  return (
    <div className="flex space-x-4">
      <Button
        variant="outline"
        className="w-full dark:bg-card dark:hover:bg-slate-700"
      >
        <Facebook className="mr-2 h-4 w-4" />
        Facebook
      </Button>
      <Button
        variant="outline"
        className="w-full dark:bg-card dark:hover:bg-slate-700"
      >
        <Mail className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
}

export default SocialButtons;
