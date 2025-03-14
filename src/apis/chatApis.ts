/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/axios/axiosInstance";
import { customErrorToast } from "@/components/custom-toast";
import { AllConversationsResponse, ChatMessagesResponse, DashboardStatsResponse } from "@/interfaces/chatInterface";

export const getAllConversations = async () => {
    try {
        const respData = await api.get<AllConversationsResponse>('/chat/user-conversations/');
        return respData.data.conversations;
    } catch (error: any) {
        customErrorToast(error.response.data.message);
        throw new Error(error.response.data.message)
    }
};

export const getChatMessages = async (convId: string) => {
    try {
        const respData = await api.get<ChatMessagesResponse>(`/chat/messages/${convId}`);
        return respData.data.messages;
    } catch (error: any) {
        customErrorToast(error.response.data.message);
        throw new Error(error.response.data.message)
    }
};

export const dashboardStats = async () => {
    try {
        const respData = await api.get<DashboardStatsResponse>(`/chat/dashboard-stats/`);
        return respData.data;
    } catch (error: any) {
        customErrorToast(error.response.data.message);
        throw new Error(error.response.data.message)
    }
};

export const newChat = async () => {
    try {
        const respData = await api.post<{ conversation_id: string }>('/chat/conversations/');
        return respData.data.conversation_id;
    } catch (error: any) {
        customErrorToast(error.response.data.message);
        throw new Error(error.response.data.message)
    }
};