"use client";
import { ColumnDef } from "@tanstack/react-table";
import ModalPreview from "../modalPreview";
import ModalDelete from "../modalDelete";
import { Button } from "../ui/button";
import { formatFileSize } from "@/utils/formatFileSize";

export type Media = {
 id: string;
 owner_id: string;
 title: string;
 url: string;
 size: number;
 type: string;
 created_at: Date | null;
 updated_at: Date | null;
};

export const columns: ColumnDef<Media>[] = [
 {
  accessorKey: "title",
  header: "Título",
  cell: ({ row }) => {
   const media = row.original;

   return (
    <ModalPreview title={media.title} url={media.url} type={media.type} />
   );
  },
 },
 {
  accessorKey: "size",
  header: "Tamanho",
  cell: ({ row }) => {
   const value = parseInt(row.getValue("size"));

   const formatted = formatFileSize(value);
   return <div>{formatted}</div>;
  },
 },
 {
  accessorKey: "type",
  header: "Tipo",
 },
 {
  accessorKey: "created_at",
  header: ({ column }) => {
   return (
    <Button
     variant={"ghost"}
     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
     Data de criação
    </Button>
   );
  },
  cell: ({ row }) => {
   const createdAt = row.original.created_at;

   return createdAt?.toLocaleDateString("pt-BR");
  },
 },
 {
  id: "actions",
  cell: ({ row }) => {
   const media = row.original;

   return <ModalDelete mediaId={media.id} fileName={media.title} />;
  },
 },
];
