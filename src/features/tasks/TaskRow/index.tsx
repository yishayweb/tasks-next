"use client";
import { Calendar, MoreVertical, CheckCircle, Circle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task } from "@prisma/client";

interface TaskRowProps {
  task: Task;
}

export default function TaskRow({ task }: TaskRowProps) {
  return (
    <li>
      <Card className={"overflow-hidden shadow-sm"}>
        <CardContent className="p-4 flex items-start gap-3">
          <div className="flex items-start justify-between w-full">
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
                  <span className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {task.dueDate.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-xl border"
                >
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
        </CardContent>
      </Card>
    </li>
  );
}
