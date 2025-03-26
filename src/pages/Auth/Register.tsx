import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Link,
  Alert,
  CircularProgress,
  Grid,
  Paper,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export const Register = () => {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  // Estados do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações básicas
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

    // Limpa mensagens de erro
    setFormError(null);

    // Tenta registrar o usuário
    try {
      await register(name, email, password);
      navigate("/"); // Redireciona para a página inicial em caso de sucesso
    } catch (err) {
      // Os erros da API já são tratados no AuthContext
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        justifyContent: "center",
        alignItems: "center",
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
        }}
      >
        {/* Seção de informações à esquerda - escondida em telas pequenas */}
        {!(isMobile || isTablet) && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
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
              width: "50%",
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
        )}

        {/* Formulário de registro à direita */}
        <motion.div
          initial={{ x: isMobile || isTablet ? 0 : 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
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
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              maxWidth: {
                xs: "100%",
                sm: "450px",
                md: "500px",
              },
              p: { xs: 2, sm: 3, md: 4 },
              backgroundColor: alpha("#ffffff", 0.25),
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              borderRadius: { xs: 2, sm: 3, md: 4 },
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)",
                transform: {
                  xs: "none",
                  md: "translateY(-5px)",
                },
              },
            }}
          >
            <Box textAlign="center" mb={{ xs: 2, sm: 3 }}>
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
                  src="/logo.png"
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
                Crie sua conta
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  color: "#fff",
                  mb: { xs: 1, sm: 2 },
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                }}
              >
                Preencha os dados abaixo para se cadastrar
              </Typography>
            </Box>

            {/* Exibição de erros */}
            {(error || formError) && (
              <Alert
                severity="error"
                sx={{
                  mb: { xs: 1, sm: 2 },
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                }}
              >
                {error || formError}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleRegister}
              sx={{
                "& .MuiGrid-item": {
                  pb: { xs: 1, sm: 2 },
                },
              }}
            >
              <Grid container spacing={{ xs: 1, sm: 2 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nome completo"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoFocus
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Senha"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    helperText="A senha deve ter no mínimo 6 caracteres"
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
                      "& .MuiFormHelperText-root": {
                        color: "#fff",
                        opacity: 0.7,
                        fontSize: { xs: "0.7rem", sm: "0.75rem" },
                        mt: 0.5,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirmar senha"
                    type="password"
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
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
                disabled={loading}
                sx={{
                  mt: { xs: 2, sm: 3 },
                  mb: { xs: 1, sm: 2 },
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
                ) : (
                  "Criar Conta"
                )}
              </Button>

              <Box textAlign="center">
                <Link
                  component={RouterLink}
                  to="/login"
                  variant="body2"
                  color="secondary"
                  sx={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Já tem uma conta? Faça login
                </Link>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
};
