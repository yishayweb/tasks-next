import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import TasksList from "../TasksList";

export default function RecentTasks() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <TasksList />
        <div className="mt-4 text-right">
          <Link
            href="/tasks"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Show More
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
