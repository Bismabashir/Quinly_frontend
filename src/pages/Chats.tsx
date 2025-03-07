import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface Chat {
  id: number;
  name: string;
  messages: Message[];
}

const Chats = () => {
  const [chats, setChats] = useState<Chat[]>([
    { id: 1, name: "Chat 1", messages: [] },
    { id: 2, name: "Chat 2", messages: [] },
  ]);
  const [activeChatId, setActiveChatId] = useState<number>(1);
  const [input, setInput] = useState("");

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const sendMessage = () => {
    if (!input.trim() || !activeChat) return;

    const newUserMessage: Message = { sender: "user", text: input };

    const updatedChats: Chat[] = chats.map((chat) =>
      chat.id === activeChatId
        ? { ...chat, messages: [...chat.messages, newUserMessage] }
        : chat
    );

    setChats(updatedChats);
    setInput("");

    setTimeout(() => {
      const newBotMessage: Message = {
        sender: "bot",
        text: "This is a bot response!",
      };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, newBotMessage] }
            : chat
        )
      );
    }, 1000);
  };

  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg flex h-[calc(100vh-6.7rem)]">
      <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-3">Chats</h2>
        <ul className="space-y-1">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={`p-2 cursor-pointer rounded-lg ${
                chat.id === activeChatId
                  ? "bg-primary text-white"
                  : "hover:bg-gray-300"
              }`}
              onClick={() => setActiveChatId(chat.id)}
            >
              {chat.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-3/4 bg-gray-100 flex flex-col p-4">
        <div className="text-lg font-semibold text-center border-b pb-2 mb-2">
          {activeChat ? activeChat.name : "Select a Chat"}
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 p-2">
          {activeChat?.messages.map((msg, index) => (
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
                {msg.text}
              </div>
            </div>
          ))}
        </div>

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
      </div>
    </div>
  );
};

export default Chats;
