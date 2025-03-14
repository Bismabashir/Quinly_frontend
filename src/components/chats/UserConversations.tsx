import { ConversationProps } from "@/interfaces/chatInterface";

interface UserConversationsProps {
  setActiveChatId: React.Dispatch<React.SetStateAction<string | null>>;
  activeChat: ConversationProps | undefined;
  isLoading: boolean;
  chats: ConversationProps[] | undefined;
}

const UserConversations = ({
  setActiveChatId,
  activeChat,
  isLoading,
  chats,
}: UserConversationsProps) => {
  return (
    <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-3">Chats</h2>
      {isLoading ? (
        <p className="font-bold text-xl">Loading...</p>
      ) : (
        <ul className="space-y-1">
          {chats?.map((chat, index) => (
            <li
              key={index}
              className={`p-2 cursor-pointer rounded-lg ${
                chat.id === activeChat?.id
                  ? "bg-primary text-white"
                  : "hover:bg-gray-300"
              }`}
              onClick={() => setActiveChatId(chat.id)}
            >
              {`Chat ${index + 1}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserConversations;
