"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/utils/to-action-state";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(128),
  description: z.string().min(1).max(1024),
});

export const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
    });
    console.log(data);

    const dbData = {
      ...data,
      dueDate: new Date(),
    };

    await prisma.task.upsert({
      where: { id: id || "" },
      update: dbData,
      create: dbData,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath("/");

  return toActionState("SUCCESS", "Task created");
};
