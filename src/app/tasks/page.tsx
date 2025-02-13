import TasksList from "@/features/tasks/TasksList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <Card className="w-2/3 min-w-[768px] max-w-[960px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">All Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <TasksList />
      </CardContent>
    </Card>
  );
}
