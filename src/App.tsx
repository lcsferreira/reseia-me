import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Register } from "./pages/Auth/Register";
import PrivateRoute from "./components/Auth/ProtectedRoutes";
import { Login } from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import ProtectedLayout from "./components/Layout/ProtectedLayout";
import { darkTheme, lightTheme } from "./themes/CustomTheme";
import { ProductsList } from "./pages/Products/ProductsList";
import { ProductDetail } from "./pages/Products/ProductDetail";
import { useState } from "react";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Router>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route
                element={
                  <ProtectedLayout
                    darkMode={darkMode}
                    toggleTheme={toggleTheme}
                  />
                }
              >
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductsList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
