"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import ChatMessages from "../ChatMessages";
import { useActions, useUIState } from "ai/rsc";
import { nanoid } from "nanoid";
import { ClientMessage } from "../types";

export default function ChatView() {
  // const [messages, setMessages] = useState<Message[]>([
  //   {
  //     id: 1,
  //     text: "Hello! How can I assist you with your tasks today?",
  //     sender: "ai",
  //   },
  // ]);
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();

  return (
    <Card className="flex flex-col h-full border-none rounded-none">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl font-bold">Chat Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-4 overflow-hidden">
        <ChatMessages messages={conversation} />
      </CardContent>
      <CardFooter className="border-t p-4">
        <form
          className="flex w-full space-x-2"
          onSubmit={async (e) => {
            e.preventDefault();
            setInput("");
            setConversation((currentConversation: ClientMessage[]) => [
              ...currentConversation,
              { id: nanoid(), role: "user", display: input },
            ]);

            const message = await continueConversation(input);

            setConversation((currentConversation: ClientMessage[]) => [
              ...currentConversation,
              message,
            ]);
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
            type="text"
            // onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
