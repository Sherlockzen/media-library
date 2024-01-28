import React from "react";
import { Button } from "./ui/button";

function MediaCard({
 title,
 size,
 type,
}: {
 title: string;
 size: number;
 type: string;
}) {
 return (
  <div className=" p-4 border-2 rounded-lg flex flex-col gap-8">
   <h2>Arquivo: {title}</h2>
   <h3>Tamanho: {size}</h3>
   <div className=" flex gap-4 ">
    <Button>Editar</Button>
    <Button>Deletar</Button>
   </div>
  </div>
 );
}

export default MediaCard;
