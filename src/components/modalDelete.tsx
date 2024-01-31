"use client";
import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
 AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { deleteFile } from "@/actions/deleteFile";
import { useRouter } from "next/navigation";

function ModalDelete({
 mediaId,
 fileName,
}: {
 mediaId: string;
 fileName: string;
}) {
 const router = useRouter();
 const handleDelete = async () => {
  await deleteFile(mediaId, fileName).then((result) => {
   return {
    result,
   };
  });
 };

 return (
  <AlertDialog
   onOpenChange={(open) => {
    if (!open) {
     router.refresh();
    }
   }}
  >
   <DropdownMenu>
    <DropdownMenuTrigger asChild>
     <Button variant="ghost" className="h-8 w-8 p-0">
      <span className="sr-only">Open menu</span>
      <MoreHorizontal className="h-4 w-4" />
     </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
     <DropdownMenuItem>Copiar Link</DropdownMenuItem>
     <DropdownMenuItem>
      <AlertDialogTrigger className=" w-full">
       <DropdownMenuItem className=" p-0">
        <div>Deletar</div>
       </DropdownMenuItem>
      </AlertDialogTrigger>
     </DropdownMenuItem>
    </DropdownMenuContent>
   </DropdownMenu>
   <AlertDialogContent>
    <AlertDialogHeader>
     <AlertDialogTitle>
      Tem certeza que deseja deletar este arquivo?
     </AlertDialogTitle>
     <AlertDialogDescription>
      Para apagar permanentemente clique em DELETAR
     </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
     <AlertDialogCancel>Cancelar</AlertDialogCancel>
     <AlertDialogAction onClick={handleDelete}>DELETAR</AlertDialogAction>
    </AlertDialogFooter>
   </AlertDialogContent>
  </AlertDialog>
 );
}

export default ModalDelete;
