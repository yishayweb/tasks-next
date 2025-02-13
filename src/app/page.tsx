import RecentTasks from "../features/tasks/RecentTasks";
import ChatRoot from "@/features/chat/ChatRoot";

export default function Home() {
  return (
    // <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
    //   <header className="bg-white shadow-sm">
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
    //       <h1 className="text-3xl font-bold text-indigo-700">Tasks App</h1>
    //       <div className="flex items-center space-x-4">
    //         <Avatar>
    //           <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    //           <AvatarFallback>CN</AvatarFallback>
    //         </Avatar>
    //         <span className="text-sm font-medium text-gray-600">John Doe</span>
    //       </div>
    //     </div>
    //   </header>

    //   <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    //     <div className="flex justify-between items-center mb-6">
    //       <h2 className="text-2xl font-semibold text-indigo-800">
    //         Recent Tasks
    //       </h2>
    //       <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
    //         <PlusCircle className="mr-2 h-4 w-4" /> Add New Task
    //       </Button>
    //     </div>

    //     <TasksList />
    //   </main>
    // </div>
    <>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-[3] p-6 overflow-hidden">
          <RecentTasks />
        </div>
        <div className="flex-[2] pr-6">
          <ChatRoot />
        </div>
      </div>
    </>
  );
}
