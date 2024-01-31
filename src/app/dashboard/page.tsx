import MediaCard from "@/components/mediaCard";
import MediaContainer from "@/components/mediaContainer";
import { validateRequest } from "@/server/auth";
import React from "react";
import MediaTable from "@/components/mediaList/mediaList";
import { redirect } from "next/navigation";
import {
 fetchFilesCount,
 fetchFilesSize,
 fetchMostUsedValueWithUserID,
} from "@/lib/data";

async function Page() {
 const { user } = await validateRequest();

 if (!user) {
  return redirect("/");
 }

 const usage = await fetchFilesSize().then((value) =>
  value === "error" ? "0" : value
 );

 const count = await fetchFilesCount().then((value) =>
  value === "error" ? 0 : value
 );

 const mostUsedType = await fetchMostUsedValueWithUserID().then((value) =>
  value === "error" ? "" : value
 );

 return (
  <section className=" pt-14 border-b">
   <div>
    <MediaContainer>
     <div className=" w-full flex flex-col items-center gap-4 md:flex-row md:justify-center">
      <MediaCard title="Consumo total:" value={usage} />
      <MediaCard title="Quantidade total:" value={`${count}`} />
      <MediaCard title="Tipo mais enviado:" value={mostUsedType} />
     </div>
    </MediaContainer>
    <MediaTable />
   </div>
  </section>
 );
}

export default Page;
