import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Divider,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  SelectChangeEvent,
  Paper,
  LinearProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CreditCard as CreditCardIcon,
  Store as StoreIcon,
  Work as WorkIcon,
  Description as DescriptionIcon,
  Star as StarIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";
import { User, Subscription } from "../../models/User";

// Dados mockados do usuário
const mockUserData: User = {
  name: "João Silva",
  email: "joao.silva@loja.com",
  phone: "(11) 98765-4321",
  role: "editor",
  department: "Marketing Digital",
  store: {
    name: "Loja Principal",
    id: "LOJA001",
    address: "Rua das Flores, 123 - São Paulo, SP",
  },
  avatar: "https://i.pravatar.cc/150?img=1",
  subscription: {
    plan: "Pro",
    status: "active",
    nextBilling: "2024-04-15",
    paymentMethod: "Cartão de Crédito",
    autoRenew: true,
  },
  stats: {
    totalDescriptions: 156,
    lastActive: "2024-03-27T15:30:00",
    averageRating: 4.8,
  },
};

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<User>(mockUserData);
  const [openSubscriptionDialog, setOpenSubscriptionDialog] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<Subscription>(
    mockUserData.subscription
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aqui você implementaria a chamada à API para salvar as alterações
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUserData(mockUserData);
  };

  const handleSubscriptionChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    if (name) {
      setSubscriptionData({
        ...subscriptionData,
        [name]: value,
      });
    }
  };

  const handleSaveSubscription = () => {
    setOpenSubscriptionDialog(false);
    // Aqui você implementaria a chamada à API para salvar as alterações da assinatura
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <Grid container spacing={3}>
        {/* Cabeçalho do Perfil */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar
                  src={userData.avatar}
                  sx={{ width: 100, height: 100, mr: 3 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    {userData.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip
                      label={userData.role.toUpperCase()}
                      color="primary"
                      size="small"
                    />
                    <Typography variant="subtitle1" color="text.secondary">
                      {userData.department}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                  onClick={isEditing ? handleSave : handleEdit}
                  sx={{ mr: 1 }}
                >
                  {isEditing ? "Salvar" : "Editar"}
                </Button>
                {isEditing && (
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Informações Pessoais e da Loja */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Informações Pessoais
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nome"
                    value={userData.name}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={userData.email}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Telefone"
                    value={userData.phone}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUserData({ ...userData, phone: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth disabled={!isEditing}>
                    <InputLabel>Departamento</InputLabel>
                    <Select
                      value={userData.department}
                      label="Departamento"
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          department: e.target.value,
                        })
                      }
                    >
                      <MenuItem value="Marketing Digital">
                        Marketing Digital
                      </MenuItem>
                      <MenuItem value="E-commerce">E-commerce</MenuItem>
                      <MenuItem value="Vendas">Vendas</MenuItem>
                      <MenuItem value="Operacional">Operacional</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Informações da Loja
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nome da Loja"
                    value={userData.store.name}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="ID da Loja"
                    value={userData.store.id}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Endereço da Loja"
                    value={userData.store.address}
                    disabled
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Estatísticas e Assinatura */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {/* Estatísticas */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Estatísticas
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <DescriptionIcon sx={{ mr: 1, color: "primary.main" }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Total de Descritivos
                        </Typography>
                        <Typography variant="h6">
                          {userData.stats.totalDescriptions}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <StarIcon sx={{ mr: 1, color: "warning.main" }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Avaliação Média
                        </Typography>
                        <Typography variant="h6">
                          {userData.stats.averageRating.toFixed(1)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <AccessTimeIcon sx={{ mr: 1, color: "info.main" }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Última Atividade
                        </Typography>
                        <Typography variant="h6">
                          {formatDate(userData.stats.lastActive)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Assinatura */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <CreditCardIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">Assinatura</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={
                        subscriptionData.status === "active"
                          ? "Ativa"
                          : "Inativa"
                      }
                      color={
                        subscriptionData.status === "active"
                          ? "success"
                          : "error"
                      }
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="subtitle1" gutterBottom>
                      Plano: {subscriptionData.plan}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Próxima cobrança: {subscriptionData.nextBilling}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Forma de pagamento: {subscriptionData.paymentMethod}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Renovação automática:{" "}
                      {subscriptionData.autoRenew ? "Sim" : "Não"}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => setOpenSubscriptionDialog(true)}
                  >
                    Gerenciar Assinatura
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Diálogo de Gerenciamento de Assinatura */}
      <Dialog
        open={openSubscriptionDialog}
        onClose={() => setOpenSubscriptionDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Gerenciar Assinatura</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Plano</InputLabel>
              <Select
                value={subscriptionData.plan}
                label="Plano"
                name="plan"
                onChange={handleSubscriptionChange}
              >
                <MenuItem value="Free">Free</MenuItem>
                <MenuItem value="Pro">Pro</MenuItem>
                <MenuItem value="Enterprise">Enterprise</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={subscriptionData.status}
                label="Status"
                name="status"
                onChange={handleSubscriptionChange}
              >
                <MenuItem value="active">Ativa</MenuItem>
                <MenuItem value="inactive">Inativa</MenuItem>
                <MenuItem value="pending">Pendente</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Próxima Cobrança"
              value={subscriptionData.nextBilling}
              disabled
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Forma de Pagamento</InputLabel>
              <Select
                value={subscriptionData.paymentMethod}
                label="Forma de Pagamento"
                name="paymentMethod"
                onChange={handleSubscriptionChange}
              >
                <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
                <MenuItem value="Boleto">Boleto</MenuItem>
                <MenuItem value="PIX">PIX</MenuItem>
              </Select>
            </FormControl>

            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>Dica:</strong> Você pode alterar sua forma de pagamento
                a qualquer momento. As alterações serão aplicadas na próxima
                cobrança.
              </Typography>
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSubscriptionDialog(false)}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveSubscription}
            startIcon={<SaveIcon />}
          >
            Salvar Alterações
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
