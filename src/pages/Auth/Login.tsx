import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Link,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login } = useAuth();
  const navigator = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [isForgot, setIsForgot] = useState(false);

  const handleLogin = () => {
    login();
    navigator("/"); // Redireciona para a rota inicial
  };

  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleToggle = (type: "register" | "forgot" | "login") => {
    if (type === "register") {
      setIsRegister(true);
      setIsForgot(false);
    } else if (type === "forgot") {
      setIsForgot(true);
      setIsRegister(false);
    } else {
      setIsRegister(false);
      setIsForgot(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        backgroundImage: `url(
          "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        )`,
        backgroundSize: "cover",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 0, md: 4 },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Animação da Imagem */}
        <motion.div
          initial={{ x: 0, width: "100%" }}
          animate={
            isMobile
              ? {} // Sem animação no mobile
              : { x: isRegister || isForgot ? "100%" : "0%", width: "50%" }
          }
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container
            maxWidth="sm"
            sx={{
              textAlign: { xs: "center", md: "start" },
              margin: {
                xs: "24px 0 0 0",
                md: "24px",
              },
            }}
          >
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                color: "white",
                fontWeight: 700,
                fontSize: { xs: "2rem" },
              }}
            >
              Bem-vindo ao ReseIA!
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ color: "white", fontWeight: 400 }}
            >
              Uma plataforma que ajuda você a economizar seu tempo e
              potencializa os seus resultados.
            </Typography>
          </Container>
        </motion.div>

        {/* Animação do Formulário */}
        <motion.div
          initial={{ x: 0, width: "100%" }}
          animate={
            isMobile
              ? {} // Sem animação no mobile
              : { x: isRegister || isForgot ? "-100%" : "0%", width: "50%" }
          }
          transition={{ duration: 0.5 }}
          style={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255, 255, 255, 0.28)",
              padding: 4,
              borderRadius: 4,
              width: {
                xs: "100%",
                md: "400px",
              },
              margin: {
                xs: "24px",
                md: "0",
              },
            }}
          >
            <img src="logo.png" alt="Logo" height="60" />
            <Typography variant="h5" gutterBottom>
              {isRegister
                ? "Crie sua conta"
                : isForgot
                ? "Recuperar senha"
                : "Entre na sua conta"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {isRegister
                ? "Cadastre-se para acessar"
                : isForgot
                ? "Digite seu email para recuperar"
                : "Faça login para continuar"}
            </Typography>

            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                variant="outlined"
              />
              {!isForgot && (
                <Box sx={{ mt: 2 }}>
                  <Link
                    onClick={() => handleToggle("forgot")}
                    sx={{
                      display: "block",
                      width: "fit-content",
                      justifySelf: "end",
                      ":hover": { color: "secondary.light", cursor: "pointer" },
                    }}
                    color="secondary"
                  >
                    Esqueci minha senha
                  </Link>
                  <TextField
                    fullWidth
                    label="Senha"
                    margin="normal"
                    type="password"
                    variant="outlined"
                  />
                </Box>
              )}

              <Button
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={handleLogin}
              >
                {isRegister
                  ? "Cadastrar"
                  : isForgot
                  ? "Recuperar Senha"
                  : "Entrar"}
              </Button>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Button
                onClick={() => handleToggle(isRegister ? "login" : "register")}
                sx={{ textTransform: "none" }}
                color="secondary"
              >
                {isRegister
                  ? "Já tem uma conta? Entrar"
                  : "Não tem conta? Cadastre-se"}
              </Button>
            </Box>
          </Container>
        </motion.div>
      </Box>
    </Box>
  );
};
