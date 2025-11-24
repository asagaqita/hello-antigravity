'use server';

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getSubscriptions() {
    const { userId } = await auth();
    if (!userId) return [];

    return await db.select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, userId))
        .orderBy(desc(subscriptions.createdAt));
}

export async function addSubscription(formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const name = formData.get("name") as string;
    const price = parseInt(formData.get("price") as string);
    const isYearly = formData.get("isYearly") === "true";

    if (!name || isNaN(price)) {
        throw new Error("Invalid input");
    }

    await db.insert(subscriptions).values({
        userId,
        name,
        price,
        isYearly,
    });

    revalidatePath("/");
    redirect("/");
}

export async function deleteSubscription(id: number) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await db.delete(subscriptions)
        .where(and(eq(subscriptions.id, id), eq(subscriptions.userId, userId)));

    revalidatePath("/");
}
