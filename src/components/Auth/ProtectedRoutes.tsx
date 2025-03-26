import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Box, CircularProgress } from "@mui/material";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Exibe um indicador de carregamento enquanto verifica a autenticação
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Redireciona para a página de login se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Renderiza o conteúdo protegido se estiver autenticado
  return <Outlet />;
};

export default PrivateRoute;
