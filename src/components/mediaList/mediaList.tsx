import { db } from "@/server/db/db";
import { Media, columns } from "./columns";
import { DataTable } from "./dataTable";
import { midiaTable } from "@/server/db/schema";

async function getData(): Promise<Media[]> {
 // Fetch data from your API here.
 const result = await db.select().from(midiaTable);
 return result;
}

export default async function MediaTable() {
 const data = await getData();

 return (
  <div className="container mx-auto py-10 max-w-[1000px]">
   <DataTable columns={columns} data={data} />
  </div>
 );
}
