import MediaCard from "@/components/mediaCard";
import MediaContainer from "@/components/mediaContainer";
import { validateRequest } from "@/server/auth";
import React, { ChangeEvent, useState } from "react";
import MediaTable from "@/components/mediaList/mediaList";
import UploadModal from "@/components/uploadModal";
import { getSignedURL } from "@/actions/signedUrl";

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

 const signedURLResult = await getSignedURL();

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
    <MediaTable />
    <UploadModal />
   </div>
  </section>
 );
}

export default Page;
