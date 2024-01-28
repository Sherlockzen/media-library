import React, { ReactNode } from "react";
import Navbar from "@/components/navbar";

function AuthorizedLayout({ children }: { children: ReactNode }) {
 return (
  <div>
   <Navbar />
   {children}
  </div>
 );
}

export default AuthorizedLayout;
