// theme.ts
import "../index.css";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Paleta de cores compartilhada
const sharedColors = {
  primary: {
    main: "#4361ee", // Azul vibrante mais moderno
    dark: "#3a0ca3", // Roxo profundo para contraste
    light: "#7289da", // Lilás claro
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#4cc9f0", // Azul turquesa
    dark: "#2b93d1", // Azul mais profundo
    light: "#7bdff2", // Turquesa claro
    contrastText: "#ffffff",
  },
  error: {
    main: "#ef476f", // Vermelho mais suave
    light: "#f27d98",
    dark: "#d32f58",
    contrastText: "#ffffff",
  },
  warning: {
    main: "#ffd166", // Amarelo mais agradável
    light: "#ffe0a3",
    dark: "#e5bc5c",
    contrastText: "#000000",
  },
  info: {
    main: "#4895ef", // Azul info
    light: "#70aff3",
    dark: "#2e6fd1",
    contrastText: "#ffffff",
  },
  success: {
    main: "#06d6a0", // Verde mais vibrante
    light: "#4ee3b5",
    dark: "#05a57a",
    contrastText: "#ffffff",
  },
};

// Tipografia compartilhada
const sharedTypography = {
  fontFamily: "'Montserrat', sans-serif",
  h1: {
    fontSize: "2.5rem",
    fontWeight: 700,
    letterSpacing: "-0.01562em",
    lineHeight: 1.2,
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 600,
    letterSpacing: "-0.00833em",
    lineHeight: 1.2,
  },
  h3: {
    fontSize: "1.75rem",
    fontWeight: 600,
    letterSpacing: "0em",
    lineHeight: 1.3,
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 600,
    letterSpacing: "0.00735em",
    lineHeight: 1.3,
  },
  h5: {
    fontSize: "1.25rem",
    fontWeight: 500,
    letterSpacing: "0em",
    lineHeight: 1.4,
  },
  h6: {
    fontSize: "1.125rem",
    fontWeight: 500,
    letterSpacing: "0.0075em",
    lineHeight: 1.4,
  },
  subtitle1: {
    fontSize: "1rem",
    fontWeight: 500,
    letterSpacing: "0.00938em",
    lineHeight: 1.5,
  },
  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: 500,
    letterSpacing: "0.00714em",
    lineHeight: 1.5,
  },
  body1: {
    fontSize: "1rem",
    fontWeight: 400,
    letterSpacing: "0.00938em",
    lineHeight: 1.5,
  },
  body2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    letterSpacing: "0.01071em",
    lineHeight: 1.5,
  },
  button: {
    fontSize: "0.875rem",
    fontWeight: 500,
    letterSpacing: "0.02857em",
    lineHeight: 1.75,
    textTransform: "none" as "none",
  },
  caption: {
    fontSize: "0.75rem",
    fontWeight: 400,
    letterSpacing: "0.03333em",
    lineHeight: 1.66,
  },
  overline: {
    fontSize: "0.75rem",
    fontWeight: 400,
    letterSpacing: "0.08333em",
    lineHeight: 2.66,
    textTransform: "uppercase" as "uppercase",
  },
};

// Componentes compartilhados
const sharedComponents = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: "8px 16px",
        transition: "all 0.2s",
        boxShadow: "none",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 5px 10px rgba(0, 0, 0, 0.08)",
        },
      },
      contained: {
        "&:hover": {
          boxShadow: "0 8px 15px rgba(0, 0, 0, 0.12)",
        },
      },
      outlined: {
        borderWidth: 2,
        "&:hover": {
          borderWidth: 2,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          borderRadius: 8,
          transition: "all 0.2s",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderWidth: 2,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: 2,
          },
        },
      },
    },
  },
};

// Tema claro
let lightTheme = createTheme({
  palette: {
    mode: "light",
    ...sharedColors,
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#2b2d42",
      secondary: "#575a7b",
      disabled: "#a0a0a0",
    },
    divider: "#e0e0e0",
  },
  typography: sharedTypography,
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    ...sharedComponents,
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  direction: "ltr",
});

// Tema escuro
let darkTheme = createTheme({
  palette: {
    mode: "dark",
    ...sharedColors,
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#f8f9fa",
      secondary: "#b0b0b0",
      disabled: "#6c757d",
    },
    divider: "#2e2e2e",
  },
  typography: sharedTypography,
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    ...sharedComponents,
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          backgroundImage: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  direction: "ltr",
});

// Aplicando responsividade às fontes
lightTheme = responsiveFontSizes(lightTheme);
darkTheme = responsiveFontSizes(darkTheme);

export { lightTheme, darkTheme };
