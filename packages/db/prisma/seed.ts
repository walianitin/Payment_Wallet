import { PrismaClient} from "@prisma/client";
const prisma= new PrismaClient();
async function main() {
    const alice = await prisma.user.upsert({
        where: { number: "9999999999" },
        update: {},
        create: {
            number: "9999999999",
          password:"alice",
          name:"alice",
          OnRampTransaction:{
            create:{
                startTime: new Date(),
                status:"Success",
                amount: 100000,
                token:"122",
                provider:"HdfCBank",
            },
          },
        },
    })
    const bob= await prisma.user.upsert({
        where:{number:"8888888888"},
        update:{},
        create:{
            number:"8888888888",
            password:"bob",
            name:"bob",
            OnRampTransaction:{
                create:{
                    startTime: new Date(),
                    status:"Success",
                    amount: 200000,
                    token:"122",
                    provider:"HdfCBank",
                },
            },
        }
})
console.log({ alice, bob });

}
main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => { 
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
}); 