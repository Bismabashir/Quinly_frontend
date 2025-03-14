export interface ConversationProps {
    id: string;
    created_at: string;
    user: string;
}

export interface MessageProps {
    sender: 'user' | 'bot';
    user_message?: string;
    bot_response?: string;
    sentiment?: string;
    topic?: string;
    is_emergency?: boolean;
}

export interface AllConversationsResponse {
    conversations: ConversationProps[]
}

export interface ChatMessagesResponse {
    messages: MessageProps[]
}