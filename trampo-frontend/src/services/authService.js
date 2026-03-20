// src/services/authService.ts
import { api } from "./api";
// 🔧 Helper para aceitar tanto { access_token } quanto { token }
function mapAuthResponse(data) {
    return {
        token: data.token ?? data.access_token,
        user: data.user,
    };
}
export async function login(dto) {
    const { data } = await api.post("/auth/login", dto);
    // data pode vir como { access_token, user } ou { token, user }
    return mapAuthResponse(data);
}
export async function register(dto) {
    const { data } = await api.post("/auth/register", dto);
    // mesma estrutura do login
    return mapAuthResponse(data);
}
export async function me() {
    const { data } = await api.get("/auth/me");
    return data;
}
