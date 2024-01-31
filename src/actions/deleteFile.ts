'use server'

import { validateRequest } from "@/server/auth"
import { db } from "@/server/db/db";
import { midiaTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  apiVersion: "latest",
  region: process.env.BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
});

export async function deleteFile(fileId: string, fileName: string) {
  const { session } = await validateRequest();

  if (!session) {
    return {
      failure: 'Sessão expirada, realize o login!'
    }
  }

  const deletedFile = await db.delete(midiaTable)
    .where(eq(midiaTable.id, fileId))
    .returning();

  const deleteFromS3 = new DeleteObjectCommand({
    Bucket: process.env.BUCKET_NAME!,
    Key: session.userId + fileName,
  })

  await s3.send(deleteFromS3);

  return {
    success: `Arquivo ${deleteFile.name} foi deletado!`
  }

}