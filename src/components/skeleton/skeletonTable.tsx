import React from "react";
import UploadModal from "../uploadModal";
import {
 ColumnDef,
 flexRender,
 getCoreRowModel,
 useReactTable,
 getPaginationRowModel,
 SortingState,
 getSortedRowModel,
} from "@tanstack/react-table";

import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Loader2 } from "lucide-react";

function SkeletonTable() {
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
   <div className="rounded-md border">
    <Table>
     <TableHeader>
      <TableRow>
       <TableHead>
        <Skeleton className=" w-32 h-6" />
       </TableHead>
       <TableHead>
        <Skeleton className=" w-24 h-6" />
       </TableHead>
       <TableHead>
        <Skeleton className=" w-24 h-6" />
       </TableHead>
       <TableHead>
        <Skeleton className=" w-16 h-6" />
       </TableHead>
      </TableRow>
     </TableHeader>
     <TableBody>
      {Array.from({ length: 5 }).map((_, i) => (
       <TableRow key={i} className="hover:bg-transparent">
        {Array.from({ length: 4 }).map((_, i) => (
         <TableCell key={i}>
          <Skeleton className="h-6 w-full" />
         </TableCell>
        ))}
       </TableRow>
      ))}
     </TableBody>
    </Table>
    <div className="flex items-center justify-end space-x-2 py-4">
     <Button disabled variant="outline" size="sm">
      Anterior
     </Button>
     <Button disabled variant="outline" size="sm">
      Próximo
     </Button>
    </div>
   </div>
  </div>
 );
}

export default SkeletonTable;
