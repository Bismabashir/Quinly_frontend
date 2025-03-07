export interface UserProps {
    id: string;
    full_name: string;
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    created_at: string;
    updated_at: string;
}

export interface LoginResponse {
    refresh: string;
    access: string;
    user: UserProps
}

export interface AllUsersResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: UserProps[]
}

export interface ForgotPasswordResponse {
    email: string;
}

export interface ResetPasswordResponse {
    success: boolean;
}