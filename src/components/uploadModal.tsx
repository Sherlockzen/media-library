"use client";
import {
 Dialog,
 DialogTrigger,
 DialogContent,
 DialogTitle,
 DialogHeader,
} from "./ui/dialog";
import React, { startTransition, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Preview } from "./preview";
import { getSignedURL } from "@/actions/signedUrl";
import { saveFileToDb } from "@/actions/saveFileDb";
import { useRouter } from "next/navigation";

function UploadModal() {
 const [file, setFile] = useState<File | undefined>(undefined);
 const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
 const [uploadStatus, setUploadStatus] = useState({});
 const [uploadURL, setUploadURL] = useState<string>("");
 const router = useRouter();

 const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!file) return;
  const { name, size, type } = file as File;
  startTransition(() => {
   if (file) {
    getSignedURL(name, size, type).then(async (result) => {
     if (result.failure !== undefined) {
      setUploadStatus({ message: "Envio encontrou uma falha" });
      console.log("Envio Falhou");
     }
     if (result.success) {
      await fetch(result.url, {
       method: "PUT",
       body: file,
       headers: {
        "Content-Type": type,
        "Content-Disposition": `inline; filename="${file.name}"`,
       },
      });
      const { hostname, pathname } = new URL(result.url);
      const splitPath = pathname.split("/").filter(Boolean);
      const key = splitPath[splitPath.length - 1];
      await saveFileToDb({
       title: name,
       type: type,
       size: size,
       url: key,
      }).then((result) => {
       console.log(result);
      });
      router.refresh();
      console.log(result.url);
     }
    });
   }
  });
  console.log(file);
 };

 console.log(uploadStatus);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFile(e.target.files?.[0]);

  if (fileUrl) {
   URL.revokeObjectURL(fileUrl);
  }

  console.log(file);
 };

 useEffect(() => {
  if (file) {
   const url = URL.createObjectURL(file);
   setFileUrl(url);
  } else {
   setFileUrl(undefined);
  }
 }, [file]);

 return (
  <div className=" p-6 w-full flex flex-col items-center justify-center">
   <Dialog>
    <DialogTrigger asChild>
     <Button className=" rounded-3xl w-80">Enviar arquivo</Button>
    </DialogTrigger>
    <DialogContent>
     <DialogHeader className=" p-8 ">
      <DialogTitle className=" mb-10">
       Escolha o arquivo a ser enviado
      </DialogTitle>
     </DialogHeader>
     {file && (
      <div className=" flex flex-col gap-4 items-start justify-center w-full px-4">
       <Preview name={file?.name} type={file?.type} fileUrl={fileUrl} />
       <Button
        className=" mr-2"
        onClick={() => {
         setFileUrl(undefined);
         setFile(undefined);
        }}
        size="lg"
       >
        Remove
       </Button>
      </div>
     )}
     <form onSubmit={handleUpload} className=" flex gap-4 items-center">
      <input
       name="fileUpload"
       onChange={handleChange}
       type="file"
       className=" border-2 p-2"
      />
      <Button type="submit">Enviar</Button>
     </form>
    </DialogContent>
   </Dialog>
  </div>
 );
}

export default UploadModal;
