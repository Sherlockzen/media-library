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

function MediaCard({ title, value }: { title: string; value?: string }) {
 return (
  <Card className=" w-64 items-center h-32">
   <CardHeader>
    <p>{title}</p>
   </CardHeader>
   <CardContent>
    <CardTitle>{value}</CardTitle>
   </CardContent>
  </Card>
 );
}

export default MediaCard;
