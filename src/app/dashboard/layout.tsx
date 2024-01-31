import React, { ReactNode } from "react";
import Navbar from "@/components/navbar";

function DashboardLayout({ children }: { children: ReactNode }) {
 return (
  <div>
   <Navbar />
   {children}
  </div>
 );
}

export default DashboardLayout;
