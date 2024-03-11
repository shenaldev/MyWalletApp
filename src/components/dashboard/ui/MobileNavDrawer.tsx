import { useState } from "react";
//IMPORT COMPONENTS
import NavMenu from "./NavMenu";
import SelectYear from "../topbar/SelectYear";
import UserDropdown from "../topbar/UserDropdown";
import { Separator } from "@/components/ui/separator";
import MobileMenuIcon from "../topbar/MobileMenuButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function MobileNavDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  function handleDrawer(status: boolean) {
    setIsOpen(status);
    console.log(status);
  }
  return (
    <Sheet onOpenChange={(status) => handleDrawer(status)} open={isOpen}>
      <SheetTrigger>
        <MobileMenuIcon isOpen={isOpen} />
      </SheetTrigger>
      <SheetContent side="left" className="bg-primary dark:bg-slate-950">
        <div className="mt-6 flex gap-4 pb-4">
          <SelectYear />
          <UserDropdown />
        </div>
        <Separator />
        <NavMenu onChange={handleDrawer} />
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavDrawer;
