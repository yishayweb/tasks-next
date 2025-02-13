import { ReactNode } from "react";

export type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
};

export interface ServerMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
}
