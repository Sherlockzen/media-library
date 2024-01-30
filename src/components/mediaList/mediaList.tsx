import { db } from "@/server/db/db";
import { Media, columns } from "./columns";
import { DataTable } from "./dataTable";
import { midiaTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { validateRequest } from "@/server/auth";

async function getData(): Promise<Media[]> {
 const { user } = await validateRequest();
 const validateUserId = user ? user.id : "";
 const result = await db
  .select()
  .from(midiaTable)
  .where(eq(midiaTable.owner_id, validateUserId));
 return result;
}

export default async function MediaTable() {
 const data = await getData();

 return (
  <div className="container mx-auto py-10 md:max-w-[1000px]">
   <DataTable columns={columns} data={data} />
  </div>
 );
}
