import { db } from "@/server/db/db";
import { Media, columns } from "./columns";
import { DataTable } from "./dataTable";
import { midiaTable } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";
import { validateRequest } from "@/server/auth";
import UploadModal from "../uploadModal";

async function getData(): Promise<Media[]> {
 const { user } = await validateRequest();
 const validateUserId = user ? user.id : "";
 const result = await db
  .select()
  .from(midiaTable)
  .where(eq(midiaTable.owner_id, validateUserId))
  .orderBy(desc(midiaTable.created_at));
 return result;
}

export default async function MediaTable() {
 const data = await getData();

 return (
  <div className="container mx-auto py-10 md:max-w-[1000px]">
   <div className=" flex justify-center items-center w-full py-4">
    <div className=" flex justify-between items-center w-full">
     <h1 className=" capitalize">Seus arquivos</h1>
     <div className=" ">
      <UploadModal />
     </div>
    </div>
   </div>
   <DataTable columns={columns} data={data} />
  </div>
 );
}
