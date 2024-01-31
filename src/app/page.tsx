import { Button } from "@/components/ui/button";
import { validateRequest } from "@/server/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Home() {
 const { session } = await validateRequest();

 if (session) {
  return redirect("/dashboard");
 }

 return (
  <main className=" h-svh pt-28">
   <section className=" flex flex-col md:flex-col xl:flex-row md:items-center md:justify-center text-center xl:text-left gap-12 ">
    <div className=" mx-8 xl:flex xl:items-center xl:justify-center md:max-w-lg lg:max-w-4xl xl:max-w-7xl gap-8">
     <div className=" flex flex-col gap-8 ">
      <h1 className="text-5xl md:text-6xl font-geist">
       Salve de forma simples na nuvem
      </h1>
      <p className=" opacity-50">
       Tenha os seus arquivos salvos em nuvem com um app minimalista e direto.
       Veja como é fácil, crie sua conta e comece a usar!
      </p>
      <div className=" flex flex-col xl:flex-col sm:flex-row sm:justify-center gap-6">
       <Link
        href={"/signup"}
        className=" sm:w-[75%] xl:w-full sm:max-w-96 md:max-w-full"
       >
        <Button className="w-full" size={"lg"}>
         Criar conta
        </Button>
       </Link>
       <Link href={"/login"} className=" md:max-w-full">
        <Button className=" w-full" variant={"outline"}>
         Entrar
        </Button>
       </Link>
      </div>
     </div>
     <div className=" px-0.5 md:px-6  flex justify-center items-center lg:justify-start">
      <Image
       src={"/media-library-dashboard.png"}
       alt="Captura da página de dashboard do app"
       width={1600}
       height={1600}
       className=" mt-20 xl:mt-0"
      />
     </div>
    </div>
   </section>
  </main>
 );
}
