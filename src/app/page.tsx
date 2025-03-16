import RecentTasks from "../features/tasks/RecentTasks";
import ChatRoot from "@/features/chat/ChatRoot";

export default function Home() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-[3] p-6 overflow-hidden">
        <RecentTasks />
      </div>
      <div className="flex-[2] pr-6">
        <ChatRoot />
      </div>
    </div>
  );
}
