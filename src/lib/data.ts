// 'use server'
import { validateRequest } from "@/server/auth";
import { db } from "@/server/db/db";
import { midiaTable } from "@/server/db/schema";
import { eq, sum, count, sql, desc } from "drizzle-orm";
import { formatFileSize } from "@/utils/formatFileSize";



export async function fetchFilesSize() {
  const { user } = await validateRequest();

  if (!user) {
    return 'error'
  }

  const usage = await db
    .select({ value: sum(midiaTable.size) })
    .from(midiaTable)
    .where(eq(midiaTable.owner_id, user.id))
    .execute();


  const formated = formatFileSize(parseInt(usage[0].value ?? '0'));
  return formated;
}

export async function fetchFilesCount() {
  const { user } = await validateRequest();

  if (!user) {
    return 'error'
  }

  const quant = await db
    .select({ value: count() })
    .from(midiaTable)
    .where(eq(midiaTable.owner_id, user.id))
    .execute();


  return quant[0].value;
}

export async function fetchMostUsedValueWithUserID() {
  const { user } = await validateRequest();

  if (!user) {
    return 'error'
  }

  const mostUsedValueWithUserID = await db
    .select({
      value: midiaTable.type,
      count: sql<number>`COUNT(${midiaTable.type})`.mapWith(Number),
    })
    .from(midiaTable)
    .where(sql`${midiaTable.owner_id} = ${user.id}`)
    .groupBy(midiaTable.type)
    .orderBy(desc(sql<number>`COUNT(${midiaTable.type})`))
    .limit(1);

  return mostUsedValueWithUserID[0]?.value;
}