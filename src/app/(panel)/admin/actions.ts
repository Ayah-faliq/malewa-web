"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function setPartnerStatus(partnerId: string, status: "ACTIVE" | "SUSPENDED") {
  await requireAdmin();
  await db.partner.update({ where: { id: partnerId }, data: { status } });
  revalidatePath("/", "layout");
}
