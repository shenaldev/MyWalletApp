import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import NavMenu from "../nav-menu";
import MobileMenuIcon from "../topbar/mobile-menu-button";
import SelectYear from "../topbar/select-year";
import UserDropdown from "../topbar/user-dropdown";

function MobileNavDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  function handleDrawer(status: boolean) {
    setIsOpen(status);
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
