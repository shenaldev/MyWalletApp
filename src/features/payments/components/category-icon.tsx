import { useMemo } from "react";

import {
  CarIcon,
  FolderIcon,
  FuelIcon,
  HeartIcon,
  ReceiptTextIcon,
  ShoppingCartIcon,
  SoupIcon,
} from "lucide-react";

type CategoryIconProps = {
  icon: string | null;
  className?: string;
};

const CategoryIcon = ({ icon, className }: CategoryIconProps) => {
  const getIcon = useMemo(() => {
    switch (icon) {
      case "dining":
        return <SoupIcon className={className} />;
      case "fuel":
        return <FuelIcon className={className} />;
      case "transport":
        return <CarIcon className={className} />;
      case "utilities":
        return <ReceiptTextIcon className={className} />;
      case "groceries":
        return <ShoppingCartIcon className={className} />;
      case "health":
        return <HeartIcon className={className} />;
      case "general":
        return <FolderIcon className={className} />;
      default:
        return <FolderIcon className={className} />;
    }
  }, [icon, className]);

  return <>{getIcon}</>;
};

export default CategoryIcon;
