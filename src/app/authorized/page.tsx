import MediaCard from "@/components/mediaCard";
import MediaContainer from "@/components/mediaContainer";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/server/auth";
import React from "react";
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
 DialogClose,
} from "@/components/ui/dialog";

const arquives = [
 { title: "Anotacoes", size: 25, type: "txt" },
 { title: "Foto do gato", size: 78, type: "jpeg" },
 { title: "Livro Entendendo Algoritmos", size: 50, type: "pdf" },
];

async function Page() {
 const { user } = await validateRequest();

 if (!user) {
  return <div>NAO ESTA AUTORIZADO</div>;
 }

 return (
  <section className=" pt-14 border-b">
   <div>
    <MediaContainer>
     {arquives.map((item) => (
      <MediaCard
       key={item.title}
       title={item.title}
       size={item.size}
       type={item.type}
      />
     ))}
    </MediaContainer>
    <div className=" p-6 w-full flex justify-center">
     <Dialog>
      <DialogTrigger asChild>
       <Button className=" rounded-3xl w-80">Enviar arquivo</Button>
      </DialogTrigger>
      <DialogContent>
       <DialogHeader className=" p-8 ">
        <DialogTitle className=" mb-10">
         Escolha o arquivo a ser enviado
        </DialogTitle>
        <DialogDescription className=" flex flex-col gap-10">
         {/* <div className=" h-8 w-8 animate-spin inline-block rounded-full border-4 border-solid border-white border-r-red-500"></div> */}
         <input type="file" className=" border-2 p-2" />
         <Button type={"submit"}>Enviar</Button>
        </DialogDescription>
       </DialogHeader>
      </DialogContent>
     </Dialog>
    </div>
   </div>
  </section>
 );
}

export default Page;
