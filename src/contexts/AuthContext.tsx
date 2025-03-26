import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { authService } from "../api/services/auth";

// Interface para o tipo de usuário
interface User {
  id: string;
  name: string;
  email: string;
}

// Interface para o contexto de autenticação
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Token storage key
const TOKEN_KEY = "@reseia-me:token";
const USER_KEY = "@reseia-me:user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carrega os dados de autenticação do armazenamento local quando o aplicativo inicia
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);

        if (storedToken && storedUser) {
          // Configurar o token nos headers do Axios para todas as requisições
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;

          // Verificar se o token ainda é válido
          const isValid = await authService.validateToken(storedToken);

          if (isValid) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
          } else {
            // Se o token não for válido, limpe o armazenamento
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar autenticação:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  // Função para fazer login
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      // Chamada do serviço de login
      const { token, user } = await authService.login({ email, password });

      // Salvar no localStorage
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      // Configurar o token nos headers do Axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Atualizar o estado
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Falha na autenticação");
      } else {
        setError("Ocorreu um erro durante o login. Tente novamente.");
      }
      console.error("Erro no login:", err);
    } finally {
      setLoading(false);
    }
  };

  // Função para registrar um novo usuário
  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      // Chamada do serviço de registro
      const { token, user } = await authService.register({
        name,
        email,
        password,
      });

      // Salvar no localStorage
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      // Configurar o token nos headers do Axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Atualizar o estado
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Falha no registro");
      } else {
        setError("Ocorreu um erro durante o registro. Tente novamente.");
      }
      console.error("Erro no registro:", err);
    } finally {
      setLoading(false);
    }
  };

  // Função para redefinir a senha
  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);

      // Chamada do serviço de recuperação de senha
      await authService.resetPassword(email);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Falha na redefinição de senha");
      } else {
        setError("Ocorreu um erro. Tente novamente.");
      }
      console.error("Erro na redefinição de senha:", err);
    } finally {
      setLoading(false);
    }
  };

  // Função para fazer logout
  const logout = () => {
    // Remover do localStorage
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    // Remover o token dos headers do Axios
    delete axios.defaults.headers.common["Authorization"];

    // Atualizar o estado
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        loading,
        error,
        login,
        logout,
        register,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
