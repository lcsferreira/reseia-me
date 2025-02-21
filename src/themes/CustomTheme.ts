// theme.ts
import "../index.css";
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#536DFE", // Rosa padrão do MUI
      dark: "#3D5AFE", // Rosa escuro
      light: "#C5CAE9", // Rosa claro
    },
    secondary: {
      main: "#673AB7", // Azul padrão do MUI
      dark: "#512DA8", // Azul escuro
      light: "#D1C4E9", // Azul claro
    },
    background: {
      default: "#f4f4f4",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
      disabled: "#777777",
    },
    divider: "#BDBDBD",
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#673AB7",
    },
    success: {
      main: "#4caf50",
    },
  },
  typography: {
    fontFamily: "'Montserrat', serif", // Nome exato da fonte do Google Fonts
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
    },
  },
  direction: "ltr",
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#536DFE", // Rosa padrão do MUI
      dark: "#3D5AFE", // Rosa escuro
      light: "#C5CAE9", // Rosa claro
    },
    secondary: {
      main: "#673AB7", // Azul padrão do MUI
      dark: "#512DA8", // Azul escuro
      light: "#D1C4E9", // Azul claro
    },
    background: {
      default: "#2d2a2a",
      paper: "#565353",
    },
    text: {
      primary: "#ffffff",
      secondary: "#BDBDBD",
      disabled: "#777777",
    },
    divider: "#BDBDBD",
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#673AB7",
    },
    success: {
      main: "#4caf50",
    },
  },
  typography: {
    fontFamily: "'Montserrat', serif", // Nome exato da fonte do Google Fonts
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
    },
  },
  direction: "ltr",
});
