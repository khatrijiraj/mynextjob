import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex justify-start items-center flex-col gap-4 mt-16">
      {children}
    </div>
  );
};

export default AuthLayout;
