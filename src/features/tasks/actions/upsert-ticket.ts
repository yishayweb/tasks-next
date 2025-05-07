"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/utils/to-action-state";
import { User } from "@prisma/client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isOwner } from "@/features/auth/utils/is-owner";
import { upsertTicketSchema } from "../utils/taskFormSchema";

export const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData
) => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  try {
    if (id) {
      const task = await prisma.task.findUnique({
        where: {
          id,
        },
      });

      if (!task || !isOwner(session?.user as User, task)) {
        return toActionState("ERROR", "Not authorized");
      }
    }

    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
      taskType: formData.get("taskType"),
      priority: formData.get("priority"),
      dueDate: formData.get("dueDate"),
    });

    const dbData = {
      ...data,
      userId: session?.user?.id,
      dueDate: new Date(data.dueDate),
    };

    await prisma.task.upsert({
      where: { id: id || "" },
      update: dbData,
      create: dbData,
    });
  } catch (error) {
    console.log("this is the error: ", error);
    return fromErrorToActionState(error, formData);
  }

  revalidatePath("/");
  redirect("/");
};
