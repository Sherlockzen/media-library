"use client";
import { signup } from "@/actions/register";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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

export default function Page() {
 const [isPending, startTransition] = useTransition();
 const [error, setError] = useState("");
 const form = useForm<z.infer<typeof signupSchema>>({
  resolver: zodResolver(signupSchema),
  defaultValues: {
   password: "",
   email: "",
  },
 });

 const onSubmit = (data: z.infer<typeof signupSchema>) => {
  startTransition(() => {
   signup(data).then((result) => setError(result?.error));
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
        <Button type="submit">Criar usuário</Button>
       </form>
      </Form>
     </CardContent>
    </Card>
   </div>
  </>
 );
}
