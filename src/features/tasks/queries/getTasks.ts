import { prisma } from "@/lib/prisma";

export const getTasks = async (limit?: number) => {
  return await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
};
