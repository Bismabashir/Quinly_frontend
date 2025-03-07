import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL as string,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const storedData = localStorage.getItem("quinly");

        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const user = parsedData?.clientState.queries?.find((q: any) => q.queryKey[0] === "user")?.state?.data;
                if (user?.access) {
                    config.headers.Authorization = `Bearer ${user.access}`;
                }
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
