import { getTasks } from "../queries/getTasks";
import TaskRow from "../TaskRow";

interface TasksListProps {
  limit?: number;
}

export default async function TasksList({ limit }: TasksListProps) {
  const tasksList = await getTasks(limit);

  return (
    <ul className="space-y-4">
      {tasksList.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}
    </ul>
  );
}
