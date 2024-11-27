import { PrismaClient } from '@prisma/client';

console.log("inside db.ts")
const prismaClientSingleton = () => {
    console.log("inside singleton")
    return new PrismaClient();
  };

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export default prisma;