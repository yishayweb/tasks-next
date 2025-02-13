"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Trash2 } from "lucide-react";
import { TaskType } from "@/types/task";

interface TaskRowProps {
  task: TaskType;
}

export default function TaskRow({ task }: TaskRowProps) {
  const handleDelete = (id: number) => {
    console.log(`Delete task with id: ${id}`);
    // In a real application, you would delete the task from your data store here
  };

  return (
    <li
      key={task.id}
      className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-sm border border-indigo-100"
    >
      <div className="flex items-center space-x-3">
        <CheckCircle2
          className={`h-6 w-6 ${
            task.completed ? "text-indigo-500" : "text-gray-300"
          }`}
        />
        <span
          className={`text-lg ${
            task.completed ? "line-through text-gray-400" : "text-indigo-700"
          }`}
        >
          {task.title}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <Link href={`/tasks/${task.id}`} passHref>
          <Button
            variant="outline"
            size="sm"
            className="text-indigo-600 border-indigo-300 hover:bg-indigo-50"
          >
            View
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 border-red-300 hover:bg-red-50"
          onClick={() => handleDelete(task.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </li>
  );
}
