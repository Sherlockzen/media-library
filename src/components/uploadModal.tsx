"use client";
import {
 Dialog,
 DialogTrigger,
 DialogContent,
 DialogTitle,
 DialogHeader,
 DialogFooter,
} from "./ui/dialog";
import React, { useTransition, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Preview } from "./preview";
import { getSignedURL } from "@/actions/signedUrl";
import { saveFileToDb } from "@/actions/saveFileDb";
import { useRouter } from "next/navigation";
import { Check, Trash } from "lucide-react";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";

function UploadModal() {
 const [file, setFile] = useState<File | undefined>(undefined);
 const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
 const [uploadStatus, setUploadStatus] = useState({});
 const [uploadURL, setUploadURL] = useState<string>("");
 const [uploadProgress, setUploadProgress] = useState(0);
 const [isPending, startTransition] = useTransition();
 const [inputValue, setInputValue] = useState(undefined);
 const router = useRouter();

 const startProgress = () => {
  setUploadProgress(0);

  const interval = setInterval(() => {
   setUploadProgress((prevProgress) => {
    if (prevProgress >= 97) {
     clearInterval(interval);
     return prevProgress;
    }
    return prevProgress + 3;
   });
  }, 300);
  return interval;
 };

 const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!file) return;
  const { name, size, type } = file as File;
  startTransition(() => {
   startProgress();
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
      });
     }
    });
   }
  });
  router.refresh();
  setUploadProgress(100);
 };

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFile(e.target.files?.[0]);

  if (fileUrl) {
   URL.revokeObjectURL(fileUrl);
  }
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
  <div className=" w-full flex flex-col items-center justify-center">
   <Dialog
    onOpenChange={(open) => {
     if (!open) {
      router.refresh();

      setFile(undefined);
      setFileUrl(undefined);

      setUploadProgress(0);
     }
    }}
   >
    <DialogTrigger asChild>
     <Button>Enviar arquivo</Button>
    </DialogTrigger>
    <DialogContent className=" p-1 sm:max-w-[425px] ">
     <DialogHeader className=" p-3 ">
      <DialogTitle></DialogTitle>
     </DialogHeader>
     {file && (
      <div className=" flex flex-col items-start md:items-center justify-center w-full">
       {(file.type.startsWith("image/") || file.type.startsWith("video/")) && (
        <Trash
         color="#ef4444"
         className=" relative z-10 top-8 right-5 self-end cursor-pointer"
         onClick={() => {
          setFileUrl(undefined);
          setFile(undefined);
         }}
        />
       )}

       <Preview name={file?.name} type={file?.type} fileUrl={fileUrl} />
      </div>
     )}
     <form
      onSubmit={handleUpload}
      className=" flex flex-col items-start gap-4 md:items-center"
     >
      <div>
       <Input
        name="fileUpload"
        onChange={handleChange}
        type="file"
        className=" border-2"
       />
      </div>
      <Button type="submit">Enviar</Button>
     </form>
     <DialogFooter>
      {isPending ? (
       <div className="mx-auto mt-4 w-full max-w-xs">
        <Progress value={uploadProgress} className="h-1 w-full " />
       </div>
      ) : null}
      {!isPending && uploadProgress === 100 && (
       <div className="bg-emerald-500/15 p-3 rounded-md w-full flex items-center gap-x-2 text-sm text-emerald-500">
        <Check className="h-4 w-4" />
        <p>Upload Completo!</p>
       </div>
      )}
     </DialogFooter>
    </DialogContent>
   </Dialog>
  </div>
 );
}

export default UploadModal;
