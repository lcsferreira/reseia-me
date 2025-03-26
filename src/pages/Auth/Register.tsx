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
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export const Register = () => {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  // Estados do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

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
        height: "100vh",
        backgroundImage: `url("https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        backgroundSize: "cover",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255, 255, 255, 0.28)",
          borderRadius: 4,
        }}
      >
        <Box textAlign="center" mb={3}>
          <img src="/logo.png" alt="Logo" height="60" />
          <Typography variant="h5" gutterBottom>
            Crie sua conta
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Preencha os dados abaixo para se cadastrar
          </Typography>
        </Box>

        {/* Exibição de erros */}
        {(error || formError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || formError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome completo"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
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
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Cadastrar"
            )}
          </Button>

          <Box textAlign="center">
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              color="secondary"
            >
              Já tem uma conta? Faça login
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
