"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function onrampAction(
    { provider, amount }: { provider: string; amount: number }
) {
    const token = (Math.random() * 1000).toString();
    const session = await getServerSession(authOptions);

    if (!session?.user || !session.user?.id) {
        return {
            error: "user not logged in ,in the on ramp action"
        };
    }

    try {
        await prisma.onRampTransaction.create({
            data: {
                amount: amount*100,
                provider: provider,
                userId: Number(session.user.id),
                status: "Processing",
                startTime: new Date(),
                token: token
            }
        });
        return { success: true ,
            message: "OnRamp transaction created success"
        };
    } catch (e) {
        console.error("Error creating onRamp transaction:", e);
        return {
            error: "Failed to create onRamp transaction"
        };
    }
}