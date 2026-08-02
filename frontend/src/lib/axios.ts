import axios from "axios";

declare global {
    interface Window {
        Clerk: any;
    }
}

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE= "development" ? "http://localhost:5000/api" : "/api",
});

axiosInstance.interceptors.request.use(async (config) => {
    const token = await window.Clerk?.session?.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});