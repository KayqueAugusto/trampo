// src/services/authService.ts
import { api } from "./api";
import type { User } from "../store/authStore";

export type LoginDTO = {
  email: string;
  password: string;
  remember?: boolean;
};

export type RegisterDTO = {
  email: string;
  password: string;
  confirmPassword: string;
  role: "freelancer" | "demandante";
  acceptTerms: boolean;
};

// Resposta normalizada para o front
export type AuthResponse = {
  token: string;
  user: User;
};

// 🔧 Helper para aceitar tanto { access_token } quanto { token }
function mapAuthResponse(data: any): AuthResponse {
  return {
    token: data.token ?? data.access_token,
    user: data.user,
  };
}

export async function login(dto: LoginDTO): Promise<AuthResponse> {
  const { data } = await api.post("/auth/login", dto);

  // data pode vir como { access_token, user } ou { token, user }
  return mapAuthResponse(data);
}

export async function register(dto: RegisterDTO): Promise<AuthResponse> {
  const { data } = await api.post("/auth/register", dto);

  // mesma estrutura do login
  return mapAuthResponse(data);
}

export async function me(): Promise<User> {
  const { data } = await api.get("/auth/me");
  return data as User;
}
