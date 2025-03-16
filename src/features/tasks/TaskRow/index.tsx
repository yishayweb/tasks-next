"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { Task, TaskPriority } from "@prisma/client";
import { Calendar, CheckCircle, Circle, MoreVertical } from "lucide-react";

interface TaskRowProps {
  task: Task;
}

export default function TaskRow({ task }: TaskRowProps) {
  return (
    <li
      key={task.id}
      className="bg-white rounded-lg shadow-md p-4 transition-all duration-200 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${
              task.completed
                ? "text-green-500 hover:text-green-600"
                : "text-gray-300 hover:text-gray-400"
            }`}
          >
            {task.completed ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <Circle className="h-6 w-6" />
            )}
          </Button>
          <div>
            <Link
              href={`/tasks/${task.id}`}
              className="font-semibold hover:text-blue-600"
            >
              <h3
                className={
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }
              >
                {task.title}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 mt-1">{task.description}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  task.priority === TaskPriority.HIGH
                    ? "bg-red-100 text-red-800"
                    : task.priority === TaskPriority.MEDIUM
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {task.priority}
              </span>
              <span className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {task.dueDate.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit Task</DropdownMenuItem>
            <DropdownMenuItem>Set Reminder</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  );
}
