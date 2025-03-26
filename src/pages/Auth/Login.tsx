import { useState, useEffect } from "react";
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
  alpha,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login, register, resetPassword, loading, error } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const theme = useTheme();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

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
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(
          "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        )`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.5s ease-in-out",
        overflow: "hidden",
        padding: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 2, sm: 3, md: 4 },
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          maxWidth: { xs: "100%", sm: "95%", md: "1200px" },
          position: "relative",
        }}
      >
        {/* Imagem/Mensagem de Boas-vindas */}
        <motion.div
          initial={{ opacity: 1, x: 0 }}
          animate={{
            opacity: isMobile || isTablet ? 1 : isRegister || isForgot ? 0 : 1,
            x:
              isMobile || isTablet
                ? 0
                : isRegister || isForgot
                ? "-100%"
                : "0%",
            display:
              isMobile || isTablet
                ? isRegister || isForgot
                  ? "none"
                  : "flex"
                : "flex",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.5,
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: isMobile || isTablet ? "100%" : "50%",
            position:
              isMobile || isTablet
                ? "relative"
                : isRegister || isForgot
                ? "absolute"
                : "relative",
            zIndex: isRegister || isForgot ? 0 : 1,
          }}
        >
          <Container
            maxWidth="sm"
            sx={{
              textAlign: { xs: "center", md: "start" },
              margin: { xs: 0, md: 2 },
              padding: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                color: "white",
                fontWeight: 700,
                fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                animation: "fadeIn 0.8s ease-in-out",
                mb: { xs: 2, md: 3 },
              }}
            >
              Bem-vindo ao ReseIA!
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                color: "white",
                fontWeight: 400,
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                maxWidth: { sm: "75%", md: "100%" },
                margin: { xs: "0 auto", md: "initial" },
                mb: { xs: 3, md: 4 },
              }}
            >
              Uma plataforma que ajuda você a economizar seu tempo e
              potencializa os seus resultados.
            </Typography>
          </Container>
        </motion.div>

        {/* Formulário de Login/Registro/Recuperação */}
        <motion.div
          initial={{
            x: 0,
          }}
          animate={{
            x: 0,
            width:
              isMobile || isTablet
                ? "100%"
                : isRegister || isForgot
                ? "100%"
                : "50%",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.5,
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Container
            maxWidth={isMobile ? "xs" : isTablet ? "sm" : "md"}
            sx={{
              backgroundColor: alpha("#ffffff", 0.25),
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              padding: { xs: 2, sm: 3, md: 4 },
              borderRadius: { xs: 2, sm: 3, md: 4 },
              width: "100%",
              maxWidth: {
                xs: "100%",
                sm: "450px",
                md: "400px",
              },
              margin: {
                xs: 0,
                md: 2,
              },
              transition: "all 0.3s ease-in-out",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: { xs: 1, sm: 2 },
                transform: { xs: "scale(1)", sm: "scale(1.1)" },
                transition: "transform 0.3s ease",
              }}
            >
              <img
                src="logo.png"
                alt="Logo"
                style={{
                  height: isMobile ? "40px" : "60px",
                }}
              />
            </Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                textAlign: "center",
                fontWeight: 600,
                color: "#fff",
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                mb: { xs: 1, sm: 2 },
              }}
            >
              {isRegister
                ? "Crie sua conta"
                : isForgot
                ? "Recuperar senha"
                : "Entre na sua conta"}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                textAlign: "center",
                color: "#fff",
                mb: { xs: 2, sm: 3 },
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              {isRegister
                ? "Cadastre-se para acessar"
                : isForgot
                ? "Digite seu email para recuperar"
                : "Faça login para continuar"}
            </Typography>

            {/* Exibição de erros */}
            {(error || formError) && (
              <Alert
                severity="error"
                sx={{
                  my: { xs: 1, sm: 2 },
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                }}
              >
                {error || formError}
              </Alert>
            )}

            <Box
              component="form"
              sx={{
                mt: { xs: 1, sm: 2 },
                "& .MuiTextField-root": {
                  mb: { xs: 1, sm: 2 },
                },
              }}
            >
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: alpha("#fff", 0.1),
                      "& fieldset": {
                        borderColor: alpha("#fff", 0.3),
                      },
                      "&:hover fieldset": {
                        borderColor: alpha("#fff", 0.5),
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#fff",
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                    },
                    "& .MuiOutlinedInput-input": {
                      color: "#fff",
                      padding: { xs: "12px 14px", sm: "14px 16px" },
                    },
                  }}
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: alpha("#fff", 0.1),
                    "& fieldset": {
                      borderColor: alpha("#fff", 0.3),
                    },
                    "&:hover fieldset": {
                      borderColor: alpha("#fff", 0.5),
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#fff",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#fff",
                    padding: { xs: "12px 14px", sm: "14px 16px" },
                  },
                }}
              />

              {!isForgot && (
                <>
                  <Box
                    sx={{
                      mt: { xs: 1, sm: 2 },
                      textAlign: "right",
                      mb: { xs: 0, sm: 1 },
                    }}
                  >
                    {!isRegister && (
                      <Link
                        onClick={() => handleToggle("forgot")}
                        sx={{
                          cursor: "pointer",
                          color: "#fff",
                          textDecoration: "none",
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        Esqueceu sua senha?
                      </Link>
                    )}
                  </Box>

                  <TextField
                    fullWidth
                    label="Senha"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: alpha("#fff", 0.1),
                        "& fieldset": {
                          borderColor: alpha("#fff", 0.3),
                        },
                        "&:hover fieldset": {
                          borderColor: alpha("#fff", 0.5),
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#fff",
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      },
                      "& .MuiOutlinedInput-input": {
                        color: "#fff",
                        padding: { xs: "12px 14px", sm: "14px 16px" },
                      },
                    }}
                  />

                  {isRegister && (
                    <TextField
                      fullWidth
                      label="Confirmar Senha"
                      type="password"
                      margin="normal"
                      variant="outlined"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: alpha("#fff", 0.1),
                          "& fieldset": {
                            borderColor: alpha("#fff", 0.3),
                          },
                          "&:hover fieldset": {
                            borderColor: alpha("#fff", 0.5),
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#fff",
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "#fff",
                          padding: { xs: "12px 14px", sm: "14px 16px" },
                        },
                      }}
                    />
                  )}
                </>
              )}

              {/* Botão de ação (Login, Registro ou Reset) */}
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={
                  isRegister
                    ? handleRegister
                    : isForgot
                    ? handleResetPassword
                    : handleLogin
                }
                disabled={loading}
                sx={{
                  mt: { xs: 2, sm: 3 },
                  py: { xs: 1, sm: 1.5 },
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  fontWeight: "bold",
                  backgroundColor: "#5e35b1",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
                  "&:hover": {
                    backgroundColor: "#4527a0",
                    transform: {
                      xs: "none",
                      sm: "translateY(-2px)",
                    },
                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
              >
                {loading ? (
                  <CircularProgress size={isMobile ? 20 : 24} color="inherit" />
                ) : isRegister ? (
                  "Criar Conta"
                ) : isForgot ? (
                  "Recuperar Senha"
                ) : (
                  "Entrar"
                )}
              </Button>

              {/* Links para alternar entre login, registro e recuperação */}
              <Box
                sx={{
                  mt: { xs: 2, sm: 2 },
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {isRegister ? (
                  <Link
                    onClick={() => handleToggle("login")}
                    sx={{
                      cursor: "pointer",
                      color: "#fff",
                      mt: 1,
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Já tem uma conta? Faça login
                  </Link>
                ) : isForgot ? (
                  <Link
                    onClick={() => handleToggle("login")}
                    sx={{
                      cursor: "pointer",
                      color: "#fff",
                      mt: 1,
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Voltar para o login
                  </Link>
                ) : (
                  <Link
                    onClick={() => handleToggle("register")}
                    sx={{
                      cursor: "pointer",
                      color: "#fff",
                      mt: 1,
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Não tem uma conta? Cadastre-se
                  </Link>
                )}
              </Box>
            </Box>
          </Container>
        </motion.div>
      </Box>
    </Box>
  );
};
