import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  ListItemButton,
  Box,
  Divider,
  ListItemIcon,
  Typography,
  Switch,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  AccountBox,
  Brightness4,
  Brightness7,
  Dashboard,
  Inventory2,
  Logout,
  Menu,
  Store,
  Settings,
} from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";

interface ProtectedLayoutProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({
  darkMode,
  toggleTheme,
}) => {
  const { logout } = useAuth();
  const navigator = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleClickOption = (option: string) => {
    navigator(option);
  };

  const options = [
    { name: "Dashboard", icon: <Dashboard />, path: "/" },
    { name: "Produtos", icon: <Inventory2 />, path: "/products" },
    { name: "Lojas", icon: <Store />, path: "/stores" },
    { name: "Configurações", icon: <Settings />, path: "/settings" },
    { name: "Perfil", icon: <AccountBox />, path: "/profile" },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 2,
            }}
          >
            <img src="/logo.png" alt="Logo" height={40} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton color="inherit">
                {darkMode ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
              <Switch checked={darkMode} onChange={toggleTheme} />
            </Box>
            <Button
              color="inherit"
              onClick={logout}
              style={{ marginLeft: "auto" }}
            >
              <Logout />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "background.paper",
              color: "white",
              p: 2,
            }}
          >
            <img src="/logo.png" alt="Logo" height={40} />
          </Box>
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Typography variant="h6">Usuário</Typography>
          </Box>
          <Divider />
          <List>
            {options.map((option, index) => (
              <ListItem key={option.name} disablePadding>
                <ListItemButton onClick={() => handleClickOption(option.path)}>
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default ProtectedLayout;
