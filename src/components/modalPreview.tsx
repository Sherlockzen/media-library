"use client";
import React from "react";
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "./ui/dialog";

import Image from "next/image";

interface propsModalPreview {
 title: string;
 url: string;
 type?: string;
}

function ModalPreview({ title, url, type }: propsModalPreview) {
 const extractedText = type?.split("/")[0];

 switch (extractedText) {
  case "image":
   return (
    <Dialog>
     <DialogTrigger>{title}</DialogTrigger>
     <DialogContent>
      <DialogHeader>
       <DialogDescription className=" m-auto">
        <Image src={url} width={350} height={350} alt={title} />
       </DialogDescription>
       <DialogTitle className=" text-center">{title}</DialogTitle>
      </DialogHeader>
     </DialogContent>
    </Dialog>
   );
   break;

  case "video":
   return (
    <Dialog>
     <DialogTrigger>{title}</DialogTrigger>
     <DialogContent>
      <DialogHeader>
       <DialogDescription className=" m-auto">
        <video src={url} controls></video>
       </DialogDescription>
       <DialogTitle className=" text-center">{title}</DialogTitle>
      </DialogHeader>
     </DialogContent>
    </Dialog>
   );
   break;

  default:
   return (
    <a href={url} target="_blank">
     {title}
    </a>
   );
 }
}

export default ModalPreview;
