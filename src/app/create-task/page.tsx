"use client";

import { useActionState, useState } from "react";
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

const customTasks = [
  "Groceries shopping",
  "Paying bills",
  "Cleaning the house",
];

export default function CreateTask() {
  const [taskType, setTaskType] = useState("");
  const [newTaskType, setNewTaskType] = useState("");
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, undefined),
    EMPTY_ACTION_STATE
  );
  console.log(actionState);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create New Task
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="taskType">Task Type</Label>
              <Select value={taskType} onValueChange={setTaskType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a task type" />
                </SelectTrigger>
                <SelectContent>
                  {customTasks.map((task) => (
                    <SelectItem key={task} value={task}>
                      {task}
                    </SelectItem>
                  ))}
                  <SelectItem value="new">Create new task type</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {taskType === "new" && (
              <div className="space-y-2">
                <Label htmlFor="newTaskType">New Task Type</Label>
                <Input
                  id="newTaskType"
                  value={newTaskType}
                  onChange={(e) => setNewTaskType(e.target.value)}
                  placeholder="Enter new task type"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Task Name</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter task name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Task Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter task description"
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full">
              Create Task
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
