"use client";

import { OnRampTransactions } from "../../components/OnRampTransaction";
import prisma from "@repo/db/client";

import transfer from "../../lib/action/Transfer";




export default async function() {
    // Removed useState since this is a server component and useState is not valid here
 
    
    const transactions=await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(id)
        }
    });
  return <div className=" flex flex-col justify-between p-2 w-full h-full m-10">
   <div className=" font-medium h-10 w-ful m-5" >
     USERNAME :{name}
   </div>
  <div className=" flex flex-col h-full w-full p-2 px-2  rounded-md">
    <OnRampTransactions  transactions={transactions.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))}>

    </OnRampTransactions>
  </div>
</div>

}