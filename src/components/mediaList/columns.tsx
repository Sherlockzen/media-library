"use client";
import { dataMediaSchema } from "@/schema";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Media = {
 id: string;
 owner_id: string;
 title: string;
 url: string;
 size: number;
 type: string;
 created_at: string;
 updated_at: string;
};

export const columns: ColumnDef<Media>[] = [
 {
  accessorKey: "title",
  header: "Título",
 },
 {
  accessorKey: "size",
  header: "Tamanho",
 },
 {
  accessorKey: "type",
  header: "Tipo",
 },
 {
  accessorKey: "created_at",
  header: "Data de criação",
 },
 {
  id: "actions",
  cell: ({ row }) => {
   const media = row.original;

   return (
    <DropdownMenu>
     <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
       <span className="sr-only">Open menu</span>
       <MoreHorizontal className="h-4 w-4" />
      </Button>
     </DropdownMenuTrigger>
     <DropdownMenuContent align="end">
      <DropdownMenuLabel>Ações</DropdownMenuLabel>
      {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(media.id)}>
       Copy payment ID
      </DropdownMenuItem>
      <DropdownMenuSeparator /> */}
      <DropdownMenuItem>Editar Título</DropdownMenuItem>
      <DropdownMenuItem>Deletar Arquivo</DropdownMenuItem>
     </DropdownMenuContent>
    </DropdownMenu>
   );
  },
 },
];
