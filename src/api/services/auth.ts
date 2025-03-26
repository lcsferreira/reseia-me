import axios from "axios";
import { apiProtocol, apiUrl, apiVersion } from "../utils";
import { mock } from "../api";

// API base URL
const API_URL = `${apiProtocol}://${apiUrl}/${apiVersion}`;

// Interfaces para tipagem
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Mock temporário para facilitar o desenvolvimento (remover em produção)
mock.onPost(`${API_URL}/auth/login`).reply(200, {
  token: "jwt-token-simulado",
  user: {
    id: "123",
    name: "Usuário Teste",
    email: "usuario@teste.com",
  },
});

mock.onPost(`${API_URL}/auth/register`).reply(200, {
  token: "jwt-token-simulado-registro",
  user: {
    id: "456",
    name: "Novo Usuário",
    email: "novo@usuario.com",
  },
});

mock.onPost(`${API_URL}/auth/reset-password`).reply(200, {
  message: "Instruções enviadas para o email",
});

// Serviço de autenticação
export const authService = {
  // Login do usuário
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  },

  // Registro de novo usuário
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);
      return response.data;
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      throw error;
    }
  },

  // Recuperação de senha
  async resetPassword(email: string): Promise<{ message: string }> {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        email,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao solicitar recuperação de senha:", error);
      throw error;
    }
  },

  // Validação de token (para verificar se o token ainda é válido)
  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await axios.post(
        `${API_URL}/auth/validate-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.status === 200;
    } catch (error) {
      console.error("Token inválido:", error);
      return false;
    }
  },
};
