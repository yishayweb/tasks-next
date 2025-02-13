import { Bell, Search, Settings, User, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TopBar() {
  return (
    <div className="h-16 min-h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-xl font-bold mr-6">TaskMaster</h1>
        </Link>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search tasks..."
            className="pl-8 w-64"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/create-task">
          <Button variant="outline" size="sm" className="flex items-center">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Task
          </Button>
        </Link>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
