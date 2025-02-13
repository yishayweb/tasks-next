"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ClientMessage } from "../types";

interface ChatMessagesProps {
  messages: ClientMessage[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <ScrollArea className="h-[calc(100vh-232px)] pr-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex mb-4 ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {message.role === "assistant" && (
            <Avatar className="w-8 h-8 mr-2">
              <AvatarImage src="/placeholder.svg" alt="AI" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
          )}
          <div
            className={`max-w-[80%] p-3 rounded-lg ${
              message.role === "user"
                ? "bg-blue-500 text-white rounded-br-none"
                : "bg-gray-100 text-gray-800 rounded-bl-none"
            }`}
          >
            {message.display}
          </div>
          {message.role === "user" && (
            <Avatar className="w-8 h-8 ml-2">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
    </ScrollArea>
  );
}
