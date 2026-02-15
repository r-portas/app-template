import { createTheme } from "@mui/material/styles";

// Fonts
import "@fontsource-variable/archivo";
import "@fontsource-variable/newsreader";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f6fff6",
      dark: "#e0e9df",
      contrastText: "#0b0d0b",
    },
    secondary: {
      main: "#cad2c9",
      dark: "#242824",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
    warning: {
      main: "#eab308",
      light: "#facc15",
      dark: "#ca8a04",
    },
    success: {
      main: "#22c55e",
      light: "#4ade80",
      dark: "#16a34a",
    },
    info: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#2563eb",
    },
    background: {
      default: "#191c19",
      paper: "#2d322d",
    },
    text: {
      primary: "#f6fff6",
      secondary: "#9ca49c",
    },
    divider: "#676767",
  },
  typography: {
    fontFamily: '"Archivo Variable", sans-serif',
    h1: {
      fontFamily: '"Newsreader Variable", serif',
      fontWeight: 300,
    },
    h2: {
      fontFamily: '"Newsreader Variable", serif',
      fontWeight: 300,
    },
    h3: {
      fontFamily: '"Newsreader Variable", serif',
      fontWeight: 300,
    },
    h4: {
      fontFamily: '"Newsreader Variable", serif',
      fontWeight: 300,
    },
    h5: {
      fontFamily: '"Newsreader Variable", serif',
      fontWeight: 300,
    },
    h6: {
      fontFamily: '"Newsreader Variable", serif',
      fontWeight: 300,
    },
    body1: {
      fontSize: "0.9rem",
    },
    body2: {
      fontSize: "0.8rem",
    },
    caption: {
      fontFamily: '"Newsreader Variable", serif',
      fontStyle: "italic",
      fontSize: "0.8rem",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiChip: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          borderRadius: 9999,
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        code: {
          fontFamily: "monospace",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          padding: "2px 6px",
          borderRadius: 4,
        },
      },
    },
  },
});
