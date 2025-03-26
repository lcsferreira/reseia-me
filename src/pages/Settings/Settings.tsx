import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Divider,
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Button,
  Grid,
  Tabs,
  Tab,
  Alert,
  Snackbar,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Autocomplete,
  Chip,
  SelectChangeEvent,
} from "@mui/material";
import { useStore } from "../../contexts/StoreContext";
import { Store, StoreSettings, EcommerceIntegration } from "../../models/Store";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `settings-tab-${index}`,
    "aria-controls": `settings-tabpanel-${index}`,
  };
}

export function Settings() {
  const {
    stores,
    selectedStore,
    isLoading,
    error,
    selectStore,
    updateStoreSettings,
    updateEcommerceIntegration,
  } = useStore();

  const [tabValue, setTabValue] = useState(0);
  const [currentStore, setCurrentStore] = useState<Store | null>(null);
  const [settingsState, setSettingsState] = useState<StoreSettings>({
    writingTone: "formal",
    formatPreferences: {
      includeSpecifications: true,
      includeBenefits: true,
      maxDescriptionLength: 500,
      useEmojis: false,
      highlightKeyFeatures: true,
    },
    defaultCategory: null,
    seoOptimization: true,
  });

  const [integrationState, setIntegrationState] =
    useState<EcommerceIntegration | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const categories = [
    "Eletrônicos",
    "Vestuário",
    "Moda",
    "Casa e Decoração",
    "Esportes",
    "Beleza",
    "Livros",
    "Brinquedos",
    "Alimentos",
    "Bebidas",
    "Informática",
  ];

  useEffect(() => {
    // Seleciona a primeira loja como padrão se nenhuma estiver selecionada
    if (stores.length > 0 && !selectedStore) {
      selectStore(stores[0].id);
    }
  }, [stores, selectedStore, selectStore]);

  useEffect(() => {
    if (selectedStore) {
      setCurrentStore(selectedStore);
      setSettingsState(selectedStore.settings);
      setIntegrationState(selectedStore.ecommerceIntegration);
    }
  }, [selectedStore]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleStoreChange = (event: SelectChangeEvent) => {
    const storeId = Number(event.target.value);
    selectStore(storeId);
  };

  const handleWritingToneChange = (event: SelectChangeEvent) => {
    const value = event.target.value as
      | "formal"
      | "casual"
      | "technical"
      | "friendly";
    setSettingsState({
      ...settingsState,
      writingTone: value,
    });
  };

  const handleFormatPreferencesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSettingsState({
      ...settingsState,
      formatPreferences: {
        ...settingsState.formatPreferences,
        [event.target.name]: event.target.checked,
      },
    });
  };

  const handleMaxLengthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSettingsState({
      ...settingsState,
      formatPreferences: {
        ...settingsState.formatPreferences,
        maxDescriptionLength: Number(event.target.value) || 500,
      },
    });
  };

  const handleDefaultCategoryChange = (
    event: React.SyntheticEvent,
    value: string | null
  ) => {
    setSettingsState({
      ...settingsState,
      defaultCategory: value,
    });
  };

  const handleSEOChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettingsState({
      ...settingsState,
      seoOptimization: event.target.checked,
    });
  };

  const handleIntegrationPlatformChange = (event: SelectChangeEvent) => {
    const value = event.target.value as
      | "Shopify"
      | "WooCommerce"
      | "Magento"
      | "PrestaShop"
      | "VTEX"
      | "MercadoLivre"
      | "Other";

    if (!integrationState) {
      setIntegrationState({
        platform: value,
        apiKey: "",
        storeUrl: "",
        isActive: false,
        lastSyncDate: null,
        syncProducts: true,
        syncInventory: true,
      });
      return;
    }

    setIntegrationState({
      ...integrationState,
      platform: value,
    });
  };

  const handleIntegrationTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!integrationState) return;

    setIntegrationState({
      ...integrationState,
      [event.target.name]: event.target.value,
    });
  };

  const handleIntegrationSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!integrationState) return;

    setIntegrationState({
      ...integrationState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleIntegrationRemove = () => {
    setIntegrationState(null);
  };

  const handleSaveSettings = async () => {
    if (!currentStore) return;

    try {
      const success = await updateStoreSettings(currentStore.id, settingsState);
      setSnackbar({
        open: true,
        message: success
          ? "Configurações salvas com sucesso!"
          : "Erro ao salvar configurações",
        severity: success ? "success" : "error",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Erro ao salvar configurações",
        severity: "error",
      });
    }
  };

  const handleSaveIntegration = async () => {
    if (!currentStore) return;

    try {
      const success = await updateEcommerceIntegration(
        currentStore.id,
        integrationState
      );
      setSnackbar({
        open: true,
        message: success
          ? "Integração salva com sucesso!"
          : "Erro ao salvar integração",
        severity: success ? "success" : "error",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Erro ao salvar integração",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  if (isLoading) {
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

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom component="h1">
        Configurações
      </Typography>

      <Box sx={{ mb: 4 }}>
        <FormControl fullWidth>
          <InputLabel id="store-select-label">Selecione a Loja</InputLabel>
          <Select
            labelId="store-select-label"
            id="store-select"
            value={currentStore?.id?.toString() || ""}
            label="Selecione a Loja"
            onChange={handleStoreChange}
          >
            {stores.map((store) => (
              <MenuItem key={store.id} value={store.id}>
                {store.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {currentStore && (
        <Paper sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="configurações da loja"
            >
              <Tab label="Preferências de Escrita" {...a11yProps(0)} />
              <Tab label="Integração E-commerce" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title="Estilo de Escrita" />
                  <CardContent>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="writing-tone-label">
                        Tom de Escrita
                      </InputLabel>
                      <Select
                        labelId="writing-tone-label"
                        id="writing-tone"
                        value={settingsState.writingTone}
                        label="Tom de Escrita"
                        onChange={handleWritingToneChange}
                      >
                        <MenuItem value="formal">Formal</MenuItem>
                        <MenuItem value="casual">Casual</MenuItem>
                        <MenuItem value="technical">Técnico</MenuItem>
                        <MenuItem value="friendly">Amigável</MenuItem>
                      </Select>
                    </FormControl>

                    <Box sx={{ mt: 3 }}>
                      <Autocomplete
                        id="default-category"
                        options={categories}
                        value={settingsState.defaultCategory}
                        onChange={handleDefaultCategoryChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Categoria Padrão"
                            variant="outlined"
                          />
                        )}
                      />
                    </Box>

                    <FormControlLabel
                      control={
                        <Switch
                          checked={settingsState.seoOptimization}
                          onChange={handleSEOChange}
                          name="seoOptimization"
                        />
                      }
                      label="Otimização para SEO"
                      sx={{ mt: 2, display: "block" }}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title="Formatação" />
                  <CardContent>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              settingsState.formatPreferences
                                .includeSpecifications
                            }
                            onChange={handleFormatPreferencesChange}
                            name="includeSpecifications"
                          />
                        }
                        label="Incluir Especificações Técnicas"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              settingsState.formatPreferences.includeBenefits
                            }
                            onChange={handleFormatPreferencesChange}
                            name="includeBenefits"
                          />
                        }
                        label="Incluir Benefícios do Produto"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              settingsState.formatPreferences
                                .highlightKeyFeatures
                            }
                            onChange={handleFormatPreferencesChange}
                            name="highlightKeyFeatures"
                          />
                        }
                        label="Destacar Características Principais"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settingsState.formatPreferences.useEmojis}
                            onChange={handleFormatPreferencesChange}
                            name="useEmojis"
                          />
                        }
                        label="Usar Emojis"
                      />
                    </FormGroup>

                    <TextField
                      fullWidth
                      margin="normal"
                      label="Tamanho Máximo da Descrição (caracteres)"
                      type="number"
                      value={
                        settingsState.formatPreferences.maxDescriptionLength
                      }
                      onChange={handleMaxLengthChange}
                      InputProps={{ inputProps: { min: 100, max: 5000 } }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveSettings}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  "Salvar Preferências"
                )}
              </Button>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {integrationState ? (
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardHeader
                      title="Configuração da Plataforma"
                      action={
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={handleIntegrationRemove}
                        >
                          Remover
                        </Button>
                      }
                    />
                    <CardContent>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id="platform-label">Plataforma</InputLabel>
                        <Select
                          labelId="platform-label"
                          id="platform"
                          value={integrationState.platform}
                          label="Plataforma"
                          onChange={handleIntegrationPlatformChange}
                        >
                          <MenuItem value="Shopify">Shopify</MenuItem>
                          <MenuItem value="WooCommerce">WooCommerce</MenuItem>
                          <MenuItem value="Magento">Magento</MenuItem>
                          <MenuItem value="PrestaShop">PrestaShop</MenuItem>
                          <MenuItem value="VTEX">VTEX</MenuItem>
                          <MenuItem value="MercadoLivre">MercadoLivre</MenuItem>
                          <MenuItem value="Other">Outra</MenuItem>
                        </Select>
                      </FormControl>

                      <TextField
                        fullWidth
                        margin="normal"
                        label="URL da Loja"
                        name="storeUrl"
                        value={integrationState.storeUrl}
                        onChange={handleIntegrationTextChange}
                      />

                      <TextField
                        fullWidth
                        margin="normal"
                        label="Chave da API"
                        name="apiKey"
                        value={integrationState.apiKey}
                        onChange={handleIntegrationTextChange}
                      />
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardHeader title="Opções de Sincronização" />
                    <CardContent>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={integrationState.isActive}
                              onChange={handleIntegrationSwitchChange}
                              name="isActive"
                            />
                          }
                          label="Integração Ativa"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={integrationState.syncProducts}
                              onChange={handleIntegrationSwitchChange}
                              name="syncProducts"
                            />
                          }
                          label="Sincronizar Produtos"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={integrationState.syncInventory}
                              onChange={handleIntegrationSwitchChange}
                              name="syncInventory"
                            />
                          }
                          label="Sincronizar Estoque"
                        />
                      </FormGroup>

                      {integrationState.lastSyncDate && (
                        <Box sx={{ mt: 2 }}>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            Última sincronização:{" "}
                            {new Date(
                              integrationState.lastSyncDate.replace(" ", "T")
                            ).toLocaleString("pt-BR")}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            ) : (
              <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h6" gutterBottom>
                  Sem integração configurada
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Configure a integração com plataformas de e-commerce para
                  sincronizar produtos automaticamente.
                </Typography>
                <FormControl
                  fullWidth
                  sx={{ mt: 2, maxWidth: 400, mx: "auto" }}
                >
                  <InputLabel id="new-platform-label">
                    Selecione uma Plataforma
                  </InputLabel>
                  <Select
                    labelId="new-platform-label"
                    id="new-platform"
                    value=""
                    label="Selecione uma Plataforma"
                    onChange={handleIntegrationPlatformChange}
                  >
                    <MenuItem value="Shopify">Shopify</MenuItem>
                    <MenuItem value="WooCommerce">WooCommerce</MenuItem>
                    <MenuItem value="Magento">Magento</MenuItem>
                    <MenuItem value="PrestaShop">PrestaShop</MenuItem>
                    <MenuItem value="VTEX">VTEX</MenuItem>
                    <MenuItem value="MercadoLivre">MercadoLivre</MenuItem>
                    <MenuItem value="Other">Outra</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}

            {integrationState && (
              <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveIntegration}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Salvar Integração"
                  )}
                </Button>
              </Box>
            )}
          </TabPanel>
        </Paper>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
