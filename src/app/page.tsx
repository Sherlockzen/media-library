import { Button } from "@/components/ui/button";
import { validateRequest } from "@/server/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
 const { session } = await validateRequest();

 if (session) {
  return redirect("/authorized");
 }

 return (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
   <div className=" flex items-center md:max-w-5xl">
    <div className=" grid gap-5">
     <h1 className=" text-5xl font-extrabold ">
      Uma plataforma simples para{" "}
      <span className=" text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
       armazenamento
      </span>{" "}
      de arquivos pessoais.
     </h1>
     <p className=" text-gray-600">
      Crie o seu usuário e comece a enviar arquivos para nuvem
     </p>
     <div className=" flex gap-8">
      <Link href={"/signup"}>
       <Button>Criar Usuário</Button>
      </Link>
      <Link href={"/login"}>
       <Button>Entrar</Button>
      </Link>
     </div>
    </div>
   </div>
  </main>
 );
}
