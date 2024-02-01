import { Button, buttonVariants } from "@/components/ui/button";
import { validateRequest } from "@/server/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default async function Home() {
 const { session } = await validateRequest();

 if (session) {
  return redirect("/dashboard");
 }

 return (
  <main className=" h-svh pt-28">
   <section className=" flex flex-col md:flex-col xl:flex-row md:items-center md:justify-center text-center xl:text-left gap-12 ">
    <div className=" mx-8 xl:items-center xl:justify-center md:max-w-lg lg:max-w-4xl xl:max-w-7xl gap-8">
     <div className=" flex flex-col gap-8 justify-center items-center">
      <h1 className="text-5xl md:text-6xl font-geist">
       Salve de forma simples na nuvem
      </h1>
      <p className=" opacity-50">
       Tenha os seus arquivos salvos em nuvem com um app minimalista e direto.
       Veja como é fácil, crie sua conta e comece a usar!
      </p>
      <div className=" xl:w-[50%] xl:flex-col sm:flex-row gap-6 max-w-[970px]">
       <Link
        href={"/signup"}
        className={cn(
         buttonVariants({
          variant: "default",
          size: "lg",
         }),
         `w-full mb-6`
        )}
       >
        Criar uma conta
       </Link>
       <Link
        href={"/login"}
        className={cn(
         buttonVariants({
          variant: "outline",
          size: "lg",
         }),
         "w-full"
        )}
       >
        Entrar
       </Link>
      </div>
     </div>
     <div>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
       <div className="mt-16 flow-root sm:mt-24">
        <div className="-m-2 rounded-xl bg-gray-400/5 p-2 ring-1 ring-inset ring-gray-400/10 lg:-m-4 lg:rounded-2xl lg:p-4">
         <Image
          src="/media-library-dashboard.png"
          alt="product preview"
          width={9600}
          height={7866}
          quality={100}
          className="rounded-md object-cover bg-background p-2 sm:p-8 md:p-16 shadow-2xl ring-1 ring-gray-400/10"
         />
        </div>
       </div>
      </div>
     </div>
    </div>
   </section>
  </main>
 );
}
