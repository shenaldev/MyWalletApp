export default function MobileMenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="flex cursor-pointer flex-col items-center justify-center">
      <div
        className={`h-0.5 w-5 transform bg-white transition-transform duration-200 ease-in-out ${isOpen ? "rotate-45" : ""}`}
      ></div>
      <div
        className={`h-0.5 w-5 bg-white transition-all duration-200 ease-in-out ${isOpen ? "opacity-0" : "my-1"}`}
      ></div>
      <div
        className={`h-0.5 w-5 transform bg-white transition-transform duration-200 ease-in-out ${isOpen ? "-mt-1 -rotate-45" : ""}`}
      ></div>
    </div>
  );
}
