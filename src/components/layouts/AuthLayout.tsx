import React from "react";

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
      className={`h-full min-h-[100dvh] w-full bg-slate-100 ${wrapperClass}`}
    >
      <div className="flex justify-center pt-8">
        <h1>Logo Here</h1>
      </div>
      <div className={` ${bodyClass}`}>{children}</div>
    </div>
  );
}

export default AuthLayout;
