import { PrismaClient } from "@prisma/client";

// Creamos una instancia global para evitar múltiples conexiones en desarrollo
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // opcional, muestra las consultas SQL en consola
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
