import { useEffect, useRef } from "react";
import { ConversationProps, MessageProps } from "@/interfaces/chatInterface";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { UseMutateFunction } from "@tanstack/react-query";

interface ChatMessagesProps {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  input: string;
  sendMessage: () => void;
  messages: MessageProps[];
  chatLoading: boolean;
  isPending: boolean;
  activeChat: ConversationProps | undefined;
  mutate: UseMutateFunction<string, Error, void, unknown>;
}

const ChatMessages = ({
  setInput,
  input,
  sendMessage,
  messages,
  chatLoading,
  activeChat,
  isPending,
  mutate,
}: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-3/4 bg-gray-100 flex flex-col p-4">
      <div className="border-b pb-2 mb-2 flex items-center justify-between">
        <p className="text-lg font-semibold">Chat</p>
        {isPending ? (
          <p className="font-bold text-xs">Wait...</p>
        ) : (
          <Pencil className="cursor-pointer size-4" onClick={() => mutate()} />
        )}
      </div>
      {chatLoading ? (
        <p className="font-bold text-xl">Loading...</p>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto space-y-2 p-2">
            {messages?.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.user_message || msg.bot_response}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {activeChat && (
            <div className="border-t pt-2 flex items-center">
              <input
                type="text"
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage} className="ml-2">
                Send
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatMessages;
