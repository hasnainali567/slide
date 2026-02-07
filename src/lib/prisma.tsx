import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  var prisma: PrismaClient | undefined;
}

export const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const client = globalThis.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;
