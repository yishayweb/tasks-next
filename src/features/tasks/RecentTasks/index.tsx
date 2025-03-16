import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import TasksList from "../TasksList";

export default async function RecentTasks() {
  return (
    <Card className="w-2/3 min-w-[768px] max-w-[960px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <TasksList limit={5} />
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
