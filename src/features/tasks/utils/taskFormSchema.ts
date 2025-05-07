import { TaskPriority, TaskType } from "@prisma/client";
import { z } from "zod";

export const upsertTicketSchema = z.object({
  title: z.string().min(1).max(128),
  description: z.string().min(1).max(1024),
  taskType: z.nativeEnum(TaskType),
  priority: z.nativeEnum(TaskPriority),
  dueDate: z
    .string({ required_error: "Date Is required" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
});
