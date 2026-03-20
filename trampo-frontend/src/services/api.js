import axios from "axios";
import { useAuthStore } from "../store/authStore";
const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";
console.log("[API] baseURL =", baseURL);
// @ts-ignore – só pra facilitar teste no console
window.__API_URL__ = baseURL;
export const api = axios.create({
    baseURL,
    withCredentials: true, // envia cookie do refresh
});
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
});
let isRefreshing = false;
let queue = [];
api.interceptors.response.use((res) => res, async (error) => {
    const original = error.config;
    if (error?.response?.status === 401 && !original.__isRetry) {
        if (isRefreshing) {
            await new Promise((ok) => queue.push(ok));
            return api(original);
        }
        original.__isRetry = true;
        try {
            isRefreshing = true;
            const { data } = await api.post("/auth/refresh");
            useAuthStore.getState().setToken(data.access_token);
            queue.forEach((fn) => fn());
            queue = [];
            return api(original);
        }
        catch (e) {
            useAuthStore.getState().logout();
            throw e;
        }
        finally {
            isRefreshing = false;
        }
    }
    throw error;
});
