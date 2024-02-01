"use client";
import { signup } from "@/actions/register";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@/components/ui/button";
import {
 Form,
 FormControl,
 FormDescription,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/schema";
import { useState, useTransition } from "react";
import { Register } from "@/components/register";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Page() {
 const [isPending, startTransition] = useTransition();
 const [error, setError] = useState<string | undefined>("");
 const form = useForm<z.infer<typeof signupSchema>>({
  resolver: zodResolver(signupSchema),
  defaultValues: {
   password: "",
   email: "",
  },
 });
 const [success, setSuccess] = useState<string | undefined>(undefined);
 const router = useRouter();

 const onSubmit = (data: z.infer<typeof signupSchema>) => {
  startTransition(() => {
   signup(data).then((result) => {
    setError(result?.error);

    if (result?.success) {
     setSuccess(result.success);
     setTimeout(() => {
      router.push("/dashboard");
     }, 500);
    }
   });
  });
 };

 return (
  <>
   <div className=" h-screen w-full flex items-center justify-center">
    <Card className="mx-auto max-w-sm">
     <CardHeader className="space-y-1">
      <CardTitle className="text-2xl font-bold">Registro</CardTitle>
      <CardDescription>
       Realize o cadastro para acessar a plataforma
      </CardDescription>
     </CardHeader>
     <CardContent>
      {success && (
       <div className="bg-emerald-500/15 p-3 rounded-md w-full flex items-center justify-center mb-8 gap-x-2 text-sm text-emerald-500">
        <div className="h-4 w-4" />
        <p>{success}</p>
       </div>
      )}
      <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
         control={form.control}
         name="email"
         render={({ field }) => (
          <FormItem>
           <FormLabel>E-mail</FormLabel>
           <FormControl>
            <Input placeholder="Digite seu email" {...field} />
           </FormControl>
           <FormMessage className=" text-red-600" />
          </FormItem>
         )}
        />
        <FormField
         control={form.control}
         name="password"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="">Senha</FormLabel>
           <FormControl>
            <Input type="password" {...field} />
           </FormControl>
           <FormMessage className=" text-red-600" />
          </FormItem>
         )}
        />
        {error && <p className="text-red-600">{error}</p>}
        <div className=" flex flex-col items-center gap-4">
         <Button disabled={isPending} type="submit">
          Criar usuário
         </Button>
         <Link
          href={"/login"}
          className={cn(
           buttonVariants({
            variant: "link",
            size: "lg",
           }),
           "w-full"
          )}
         >
          Tela de login
         </Link>
        </div>
       </form>
      </Form>
     </CardContent>
    </Card>
   </div>
  </>
 );
}
