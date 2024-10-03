import React from "react";
import ThemeToggle from "../dashboard/topbar/ThemeToggle";

type PropTypes = {
  children?: React.ReactNode;
  wrapperClass?: string;
  bodyClass?: string;
};

function AuthLayout({
  children,
  wrapperClass = "",
  bodyClass = "",
}: PropTypes) {
  return (
    <div
      className={`h-full min-h-[100dvh] w-full bg-background ${wrapperClass}`}
    >
      <div className="relative mx-4 flex items-center justify-between pt-4 md:justify-center md:pt-8">
        <p className="grow md:text-center">Logo</p>
        <div className="right-4 top-4 md:absolute">
          <ThemeToggle />
        </div>
      </div>
      <div className={` ${bodyClass}`}>{children}</div>
    </div>
  );
}

export default AuthLayout;
