import { Media, columns } from "./columns";
import { DataTable } from "./dataTable";

async function getData(): Promise<Media[]> {
 // Fetch data from your API here.
 return [
  {
   id: "asdfgasefasd",
   owner_id: "alskjdf1k341l",
   size: 123,
   title: "pdf do livro",
   type: "pdf",
   created_at: "23/01/2024",
   updated_at: "",
   url: "localhost.com/pdf",
  },
 ];
}

export default async function mediaTable() {
 const data = await getData();

 return (
  <div className="container mx-auto py-10">
   <DataTable columns={columns} data={data} />
  </div>
 );
}
