"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth"; 
import prisma from "@repo/db/client"; 
export default async function transfer () {
    
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
    return {
        error: "user not logged in ,in the transfer action" }
    }
    const userId = session.user.id;
    const name =await prisma.user.findUnique({
        where: { id: Number(userId) },
        select: { name: true }
    });
    if (!name) {
        return {
            error: "User not found"
        };
    }
    return {

        name:name,
        id: userId,
        message:"success in trnasfer action",
    }
}

       