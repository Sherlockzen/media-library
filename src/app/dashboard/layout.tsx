import React, { ReactNode, Suspense } from "react";
import Navbar from "@/components/navbar";

function DashboardLayout({ children }: { children: ReactNode }) {
 return (
  <div>
   <Suspense fallback={<p>Carregando...</p>}>
    <Navbar />
   </Suspense>
   {children}
  </div>
 );
}

export default DashboardLayout;
