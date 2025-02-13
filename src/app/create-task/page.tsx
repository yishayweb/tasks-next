"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

const customTasks = [
  "Groceries shopping",
  "Paying bills",
  "Cleaning the house",
];

export default function CreateTask() {
  const router = useRouter();
  const [taskType, setTaskType] = useState("");
  const [newTaskType, setNewTaskType] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({
      type: taskType === "new" ? newTaskType : taskType,
      name: taskName,
      description: taskDescription,
    });
    // Redirect to the tasks list page (you'll need to create this page)
    router.push("/tasks");
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create New Task
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <Label htmlFor="taskName">Task Name</Label>
              <Input
                id="taskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter task name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taskDescription">Task Description</Label>
              <Textarea
                id="taskDescription"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
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
