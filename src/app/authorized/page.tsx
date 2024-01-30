import MediaCard from "@/components/mediaCard";
import MediaContainer from "@/components/mediaContainer";
import { validateRequest } from "@/server/auth";
import React, { ChangeEvent, useState } from "react";
import MediaTable from "@/components/mediaList/mediaList";
import UploadModal from "@/components/uploadModal";
import { getSignedURL } from "@/actions/signedUrl";
import { db } from "@/server/db/db";
import { desc, eq } from "drizzle-orm";
import { midiaTable } from "@/server/db/schema";
import { sum, count, sql } from "drizzle-orm";
import { number } from "zod";
import { redirect } from "next/navigation";

async function Page() {
 const { user } = await validateRequest();

 if (!user) {
  return redirect("/");
 }

 const usage = await db
  .select({ value: sum(midiaTable.size) })
  .from(midiaTable)
  .where(eq(midiaTable.owner_id, user.id))
  .execute();

 const usageParse = parseInt(usage[0].value ?? "0");

 const quant = await db
  .select({ value: count() })
  .from(midiaTable)
  .where(eq(midiaTable.owner_id, user.id))
  .execute();

 const types = await db
  .select({ typeMostUsed: midiaTable.type })
  .from(midiaTable)
  .groupBy(midiaTable.type)
  .orderBy();

 const mostUsedValueWithUserID = await db
  .select({
   value: midiaTable.type,
   count: sql<number>`COUNT(${midiaTable.type})`.mapWith(Number),
  })
  .from(midiaTable)
  .where(sql`${midiaTable.owner_id} = ${user.id}`)
  .groupBy(midiaTable.type)
  .orderBy(desc(sql<number>`COUNT(${midiaTable.type})`))
  .limit(1);

 console.log("COMECA AQUI");

 console.log(mostUsedValueWithUserID);

 return (
  <section className=" pt-14 border-b">
   <div>
    <MediaContainer>
     <div className=" w-full flex flex-col items-center gap-4 md:flex-row md:justify-center">
      <MediaCard
       title="Consumo total:"
       value={`${(usageParse / 1024).toFixed(1)} kb`}
      />
      <MediaCard title="Quantidade total:" value={`${quant[0].value}`} />
      <MediaCard
       title="Tipo mais enviado:"
       value={mostUsedValueWithUserID[0].value}
      />
     </div>
    </MediaContainer>
    <MediaTable />
    <UploadModal />
   </div>
  </section>
 );
}

export default Page;
