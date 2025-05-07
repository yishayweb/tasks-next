import TasksList from "@/features/tasks/TasksList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

export default function TasksPage() {
  return (
    <Card className="w-2/3 min-w-[768px] max-w-[960px] mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">All Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading tasks...</div>}>
          <TasksList />
        </Suspense>
      </CardContent>
    </Card>
  );
}
