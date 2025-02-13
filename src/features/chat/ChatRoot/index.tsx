import { AI } from "../actions/make-chat";
import ChatView from "../ChatView";

export default function ChatRoot() {
  return (
    <AI>
      <ChatView />
    </AI>
  );
}
