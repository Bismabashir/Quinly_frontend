import { getAllConversations, getChatMessages, newChat } from "@/apis/chatApis";
import ChatMessages from "@/components/chats/ChatMessages";
import UserConversations from "@/components/chats/UserConversations";
import { MessageProps } from "@/interfaces/chatInterface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

const Chats = () => {
  const queryClient = useQueryClient();

  const { data: chats, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: getAllConversations,
    staleTime: 0,
    refetchOnMount: true,
  });

  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [typingLoading, setTypingLoading] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: newChat,
    onSuccess: (data: string) => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      setActiveChatId(data);
    },
  });

  const [messages, setMessages] = useState<MessageProps[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  const { data: initialMessages, isLoading: chatLoading } = useQuery({
    queryKey: ["messages", activeChatId],
    queryFn: () =>
      activeChatId ? getChatMessages(activeChatId) : Promise.resolve([]),
    enabled: !!activeChatId,
    staleTime: 0,
    refetchOnMount: true,
  });

  useEffect(() => {
    setMessages(initialMessages || []);
  }, [initialMessages]);

  useEffect(() => {
    if (!activeChatId) return;

    const storedData = localStorage.getItem("quinly");
    if (!storedData) return;
    const parsedData = JSON.parse(storedData);
    const user = parsedData?.clientState.queries?.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (q: any) => q.queryKey[0] === "user"
    )?.state?.data;

    const socketUrl = `ws://127.0.0.1:8000/ws/chat/${activeChatId}/?token=${user.access}`;
    const ws = new WebSocket(socketUrl);
    socketRef.current = ws;

    ws.onopen = () => console.log("Connected to WebSocket ✅");

    ws.onmessage = (event) => {
      console.log("📩 Raw WebSocket Message:", event.data);

      try {
        const data = JSON.parse(event.data);
        console.log("🔍 Parsed WebSocket Message:", data);
        setTypingLoading(false);
        setMessages((prev) => [...prev, data]);
      } catch (error) {
        console.error("❌ Error parsing WebSocket message:", error);
      }
    };

    ws.onclose = () => console.log("Disconnected from WebSocket ❌");

    return () => {
      ws.close();
    };
  }, [activeChatId]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim() || !activeChatId || !socketRef.current) return;
    setTypingLoading(true);
    const newUserMessage = JSON.stringify({
      message: input,
      is_premium: false,
    });

    setMessages((prev) => [...prev, { user_message: input, sender: "user" }]);

    socketRef.current.send(newUserMessage);

    setInput("");
  };

  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg flex h-[calc(100vh-6.7rem)]">
      <UserConversations
        setActiveChatId={setActiveChatId}
        activeChat={chats?.find((chat) => chat.id === activeChatId)}
        isLoading={isLoading}
        chats={chats}
      />

      <ChatMessages
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        messages={messages}
        chatLoading={chatLoading}
        activeChat={chats?.find((chat) => chat.id === activeChatId)}
        isPending={isPending}
        mutate={mutate}
        typingLoading={typingLoading}
      />
    </div>
  );
};

export default Chats;
