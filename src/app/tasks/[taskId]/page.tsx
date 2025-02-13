"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Circle,
  Calendar,
  Clock,
  ArrowLeft,
  Edit2,
  Trash2,
  User,
} from "lucide-react";

// This would typically come from an API or database
const task = {
  id: 1,
  title: "Complete project proposal",
  description:
    "Finalize the proposal for the new client project, including timeline, budget, and deliverables. Ensure all stakeholders have reviewed and approved the final draft before submission.",
  completed: false,
  dueDate: "2023-06-15",
  priority: "High",
  estimatedTime: "4 hours",
  assignedTo: "John Doe",
};

export default function TaskPage({ params }: { params: { taskId: string } }) {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(task.completed);
  console.log(params);

  const handleToggleComplete = () => {
    setIsCompleted(!isCompleted);
    // Here you would typically update the task status in your backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/tasks/2")}
              className="mr-4"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <CardTitle className="text-2xl font-bold">Task Details</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${
              isCompleted
                ? "text-green-500 hover:text-green-600"
                : "text-gray-300 hover:text-gray-400"
            }`}
            onClick={handleToggleComplete}
          >
            {isCompleted ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <Circle className="h-6 w-6" />
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {task.title}
              </h2>
              <Textarea
                className="mt-2 min-h-[100px] text-gray-600 bg-gray-50 border-gray-200"
                value={task.description}
                readOnly
              />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  task.priority === "High"
                    ? "bg-red-100 text-red-800"
                    : task.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {task.priority} Priority
              </span>
              <span className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                Due: {task.dueDate}
              </span>
              <span className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                Est. Time: {task.estimatedTime}
              </span>
              <span className="flex items-center text-sm text-gray-500">
                <User className="h-4 w-4 mr-1" />
                Assigned to: {task.assignedTo}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Link href={`/tasks/${2}/edit`}>
                  <Button variant="outline" className="flex items-center">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <Button variant="destructive" className="flex items-center">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
              <Link
                href="/tasks"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Back to Tasks
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
