import React from "react";
import { Button } from "./ui/button";
import { validateRequest } from "@/server/auth";
import { logout } from "@/actions/signout";

async function Navbar() {
 const { user } = await validateRequest();
 return (
  <div className=" w-full h-14 border-b flex gap-4 items-center justify-between px-6">
   <div className=" flex gap-8">
    <div>{user?.name.toString().toUpperCase()}</div>
    <div>Armazenamento utilizado</div>
   </div>
   <form action={logout}>
    <Button className=" rounded-full">Logout</Button>
   </form>
  </div>
 );
}

export default Navbar;
