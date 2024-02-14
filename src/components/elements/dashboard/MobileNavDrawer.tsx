import { useState } from "react";
//IMPORT COMPONENTS
import NavMenu from "./NavMenu";
import { Separator } from "@/components/ui/separator";
import SelectYear from "./topbar-components/SelectYear";
import UserDropdown from "./topbar-components/UserDropdown";
import MobileMenuIcon from "./topbar-components/MobileMenuButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function MobileNavDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  function handleDrawer(status: boolean) {
    setIsOpen(status);
  }
  return (
    <Sheet onOpenChange={(status) => handleDrawer(status)}>
      <SheetTrigger>
        <MobileMenuIcon isOpen={isOpen} />
      </SheetTrigger>
      <SheetContent side="left" className="bg-primary dark:bg-slate-950">
        <div className="mt-6 flex gap-4 pb-4">
          <SelectYear />
          <UserDropdown />
        </div>
        <Separator />
        <NavMenu />
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavDrawer;
