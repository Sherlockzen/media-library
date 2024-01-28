import React from "react";
import { Button } from "./ui/button";
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";

function MediaCard({
 title,
 size,
 type,
}: {
 title: string;
 size: number;
 type: string;
}) {
 return (
  <Card>
   <CardHeader>
    <p>Card Content</p>
   </CardHeader>
   <CardContent>
    <CardTitle>{title}</CardTitle>
    <CardDescription>Tamanho: {size}</CardDescription>
   </CardContent>
   <CardFooter>
    <p>Card Footer</p>
   </CardFooter>
  </Card>
 );
}

export default MediaCard;
