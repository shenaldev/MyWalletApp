import { FolderIcon } from "lucide-react";
import { Suspense, lazy } from "react";

type CategoryIconProps = {
  icon: string | null;
  className?: string;
};

const CategoryIcon = ({ icon, className }: CategoryIconProps) => {
  const defaultIcon = <FolderIcon />;
  let Icon = null;

  switch (icon) {
    case "dining":
      Icon = lazy(() =>
        import("lucide-react").then((module) => ({ default: module.SoupIcon })),
      );
      break;
    case "fuel":
      Icon = lazy(() =>
        import("lucide-react").then((module) => ({ default: module.FuelIcon })),
      );
      break;
    case "transport":
      Icon = lazy(() =>
        import("lucide-react").then((module) => ({ default: module.CarIcon })),
      );
      break;
    case "utilities":
      Icon = lazy(() =>
        import("lucide-react").then((module) => ({
          default: module.ReceiptTextIcon,
        })),
      );
      break;
    case "groceries":
      Icon = lazy(() =>
        import("lucide-react").then((module) => ({
          default: module.ShoppingCartIcon,
        })),
      );
      break;
    case "health":
      Icon = lazy(() =>
        import("lucide-react").then((module) => ({
          default: module.HeartIcon,
        })),
      );
      break;
    case "general":
      Icon = lazy(() =>
        import("lucide-react").then((module) => ({
          default: module.FolderIcon,
        })),
      );
      break;
    default:
      Icon = lazy(() =>
        import("lucide-react").then((module) => ({
          default: module.FolderIcon,
        })),
      );
  }

  return (
    <Suspense fallback={defaultIcon}>
      <Icon className={className} />
    </Suspense>
  );
};

export default CategoryIcon;
