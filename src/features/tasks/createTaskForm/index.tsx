"use client";

import { useActionState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { upsertTicket } from "@/features/tasks/actions/upsert-ticket";
import { EMPTY_ACTION_STATE } from "@/utils/to-action-state";
import { DatePicker } from "@/localComponents/DatePicker";
import { FieldError } from "@/localComponents/FieldError";
import { upsertTicketSchema } from "../utils/taskFormSchema";
import { format } from "date-fns";

const customTasks = [
  { name: "Groceries shopping", value: "SHOPPING" },
  { name: "Paying bills", value: "BILLS" },
  { name: "Cleaning the house", value: "CLEANING" },
  { name: "General", value: "GENERAL" },
];

const taskPriorities = [
  { name: "High", value: "HIGH" },
  { name: "Medium", value: "MEDIUM" },
  { name: "Low", value: "LOW" },
];

export default function CreateTaskForm() {
  const methods = useForm({
    defaultValues: {
      dueDate: format(new Date(), "yyyy-MM-dd"),
    },
    mode: "onBlur",
    resolver: zodResolver(upsertTicketSchema),
  });
  const { formState, register } = methods;

  const [actionState, action] = useActionState(
    upsertTicket.bind(null, undefined),
    EMPTY_ACTION_STATE
  );

  const handleSubmit = (e: React.FormEvent) => {
    if (formState.isValid) {
      console.log("Form is valid");
    } else {
      console.log("Form is invalid");
      methods.trigger();
      e.preventDefault();
    }
  };

  const clientErrors = formState.errors;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Create New Task
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="type">Task Type</Label>
            <Controller
              name="taskType"
              control={methods.control} // Make sure you have the control from useForm()
              defaultValue="GENERAL"
              render={({ field }) => (
                <Select defaultValue={field.value} name="taskType">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a task type" />
                  </SelectTrigger>
                  <SelectContent>
                    {customTasks.map((taskType) => (
                      <SelectItem
                        key={taskType.value}
                        value={taskType.value}
                        onSelect={field.onChange}
                      >
                        {taskType.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError
              actionState={actionState}
              name="taskType"
              clientErrors={clientErrors}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Task Name</Label>
            <Input
              id="title"
              placeholder="Enter task name"
              defaultValue={(actionState.payload?.get("title") as string) ?? ""}
              {...register("title")}
            />
            <FieldError
              actionState={actionState}
              name="title"
              clientErrors={clientErrors}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Task Description</Label>
            <Textarea
              id="description"
              placeholder="Enter task description"
              rows={4}
              defaultValue={
                (actionState.payload?.get("description") as string) ?? ""
              }
              {...register("description")}
            />
            <FieldError
              actionState={actionState}
              name="description"
              clientErrors={clientErrors}
            />
          </div>

          <div className="flex gap-4 justify-between">
            <div className="space-y-2 flex-1">
              <Label htmlFor="priority">Task Priority</Label>
              <Controller
                name="priority"
                control={methods.control} // Make sure you have the control from useForm()
                defaultValue="MEDIUM"
                render={({ field }) => (
                  <Select defaultValue={field.value} name="priority">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a task priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {taskPriorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError
                actionState={actionState}
                name="priority"
                clientErrors={clientErrors}
              />
            </div>

            <div className="space-y-2 flex-1">
              <Label htmlFor="dueDate">Due date</Label>
              <Controller
                control={methods.control}
                name="dueDate"
                render={({ field }) => (
                  <DatePicker
                    name="dueDate"
                    id="dueDate"
                    defaultValue={field.value}
                    onDateChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
              <FieldError
                actionState={actionState}
                name="dueDate"
                clientErrors={clientErrors}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!formState.isValid}
          >
            Create Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
