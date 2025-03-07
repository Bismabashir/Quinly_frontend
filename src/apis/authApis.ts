/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/axios/axiosInstance";
import { customErrorToast } from "@/components/custom-toast";
import { AllUsersResponse, ForgotPasswordResponse, LoginResponse, ResetPasswordResponse } from "@/interfaces/authInterface";
import { forgotPasswordValues, loginValues, registerUserValues, resetPasswordValues } from "@/validations/authValidation";

export const login = async (data: loginValues) => {
    try {
        const respData = await api.post<LoginResponse>('/users/login/', data);
        return respData.data;
    } catch (error: any) {
        customErrorToast(error.response.data.message);
        throw new Error(error.response.data.message)
    }
};

export const register = async (data: registerUserValues) => {
    try {
        const respData = await api.post('/users/register/', data);
        return respData.data;
    } catch (error: any) {
        customErrorToast(error.response.data.message);
        throw new Error(error.response.data.message)
    }
};

export const forgotPassword = async (data: forgotPasswordValues) => {
    try {
        const respData = await api.post<ForgotPasswordResponse>('/users/forgot-password/', data);
        return respData.data;
    } catch (error: any) {
        customErrorToast(error.response.data.message);
        throw new Error(error.response.data.message)
    }
};

export const resetPassword = async (data: resetPasswordValues & { email: string }) => {
    try {
        const respData = await api.patch<ResetPasswordResponse>('/users/reset-password/', data);
        return respData.data;
    } catch (error: any) {
        customErrorToast(error.response.data.message);
        throw new Error(error.response.data.message)
    }
};

export const allUsers = async () => {
    try {
        const respData = await api.get<AllUsersResponse>('/users/all-users/');
        return respData.data;
    } catch (error: any) {
        customErrorToast(error.response.data.message || error.response.data.detail || "Something went wrong");
        throw new Error(error.response.data.message || error.response.data.detail || "Something went wrong")
    }
};