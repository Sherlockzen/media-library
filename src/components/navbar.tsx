"use client";
import React from "react";
import { Button } from "./ui/button";
import { logout } from "@/actions/signout";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

function Navbar() {
 const [isPending, startTransition] = useTransition();
 const router = useRouter();
 function handleLogout() {
  startTransition(() => {
   logout().then((result) => {
    if (!result.error) {
     router.push("/");
    }
   });
  });
 }
 return (
  <div className=" w-full h-14 border-b flex gap-4 items-center justify-between px-6">
   <div className=" flex gap-8"></div>
   <form action={logout}>
    <Button variant={"link"}>Sair</Button>
   </form>
  </div>
 );
}

export default Navbar;
