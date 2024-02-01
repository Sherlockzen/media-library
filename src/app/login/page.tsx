"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
 Card,
 CardHeader,
 CardTitle,
 CardDescription,
 CardContent,
} from "@/components/ui/card";
import {
 Form,
 FormField,
 FormItem,
 FormLabel,
 FormControl,
 FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signinSchema } from "@/schema";
import error from "next/error";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/actions/login";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Page() {
 const [error, setError] = useState<string | undefined>("");
 const [isPending, startTransition] = useTransition();
 const form = useForm<z.infer<typeof signinSchema>>({
  resolver: zodResolver(signinSchema),
  defaultValues: {
   email: "",
   password: "",
  },
 });
 const router = useRouter();

 const onSubmit = (data: z.infer<typeof signinSchema>) => {
  startTransition(() => {
   login(data).then((result) => {
    setError(result?.error);
    if (result?.success) {
     router.push("/dashboard");
    }
   });
  });
 };

 return (
  <>
   <div className=" h-screen w-full flex items-center justify-center">
    <Card className="mx-auto max-w-sm">
     <CardHeader className="space-y-1">
      <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
      <CardDescription>Entre com seu e-mail e senha</CardDescription>
     </CardHeader>
     <CardContent>
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
          Entrar
         </Button>
         <Link
          href={"/signup"}
          className={cn(
           buttonVariants({
            variant: "link",
            size: "lg",
           }),
           "w-full"
          )}
         >
          Criar usuário
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
