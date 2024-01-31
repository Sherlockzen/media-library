"use server";

import { validateRequest } from "@/server/auth";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { log } from "console";

const s3 = new S3Client({
  apiVersion: "latest",
  region: process.env.BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
});

export async function getSignedURL(fileName: string, fileSize: number, fileType: string) {
  const { session } = await validateRequest();

  if (!session) {
    return { failure: "Não está autenticado" };
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME!,
    Key: session.userId + fileName,
    ContentDisposition: `inline; filename="${fileName}"`,
    Metadata: {
      userId: session.userId
    }
  });

  const signedURL = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60,
  });

  return {
    success: "Arquivo enviado com sucesso!",
    url: signedURL,
  };
}
