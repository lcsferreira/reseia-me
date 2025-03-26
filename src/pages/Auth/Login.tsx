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
  CircularProgress,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login, register, resetPassword, loading, error } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [isForgot, setIsForgot] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleLogin = async () => {
    if (!email || !password) {
      setFormError("Por favor, preencha todos os campos");
      return;
    }

    setFormError(null);
    await login(email, password);
    navigate("/"); // Redireciona para a rota inicial apenas após o login bem-sucedido
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setFormError("Por favor, preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("As senhas não conferem");
      return;
    }

    if (password.length < 6) {
      setFormError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setFormError(null);
    await register(name, email, password);
    navigate("/"); // Redireciona após o registro bem-sucedido
  };

  const handleResetPassword = async () => {
    if (!email) {
      setFormError("Por favor, informe seu e-mail");
      return;
    }

    setFormError(null);
    await resetPassword(email);
    setIsForgot(false); // Volta para a tela de login
  };

  const handleToggle = (type: "register" | "forgot" | "login") => {
    setFormError(null); // Limpa erros ao mudar de tela

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

            {/* Exibição de erros */}
            {(error || formError) && (
              <Alert severity="error" sx={{ my: 2 }}>
                {error || formError}
              </Alert>
            )}

            <Box component="form" sx={{ mt: 2 }}>
              {/* Campo Nome (apenas para registro) */}
              {isRegister && (
                <TextField
                  fullWidth
                  label="Nome"
                  margin="normal"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}

              {/* Campo Email (para todos) */}
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {!isForgot && (
                <>
                  <Box sx={{ mt: 2 }}>
                    {!isRegister && (
                      <Link
                        onClick={() => handleToggle("forgot")}
                        sx={{
                          display: "block",
                          width: "fit-content",
                          justifySelf: "end",
                          ":hover": {
                            color: "secondary.light",
                            cursor: "pointer",
                          },
                        }}
                        color="secondary"
                      >
                        Esqueci minha senha
                      </Link>
                    )}

                    {/* Campo Senha */}
                    <TextField
                      fullWidth
                      label="Senha"
                      margin="normal"
                      type="password"
                      variant="outlined"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    {/* Campo Confirmar Senha (apenas para registro) */}
                    {isRegister && (
                      <TextField
                        fullWidth
                        label="Confirmar Senha"
                        margin="normal"
                        type="password"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    )}
                  </Box>
                </>
              )}

              <Button
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={
                  isRegister
                    ? handleRegister
                    : isForgot
                    ? handleResetPassword
                    : handleLogin
                }
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : isRegister ? (
                  "Cadastrar"
                ) : isForgot ? (
                  "Recuperar Senha"
                ) : (
                  "Entrar"
                )}
              </Button>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Button
                onClick={() => handleToggle(isRegister ? "login" : "register")}
                sx={{ textTransform: "none" }}
                color="secondary"
                disabled={loading}
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
