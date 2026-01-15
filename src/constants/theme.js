import { createTheme } from "@mui/material/styles";

export const COLORS = {
  primary: "#213C46",
  secondary: "#34CFC2",
  dark: "#051830",
  white: "#FFFFFF",
  light: "#F3FAFA",
};

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary,
      contrastText: COLORS.white,
    },
    secondary: {
      main: COLORS.secondary,
      contrastText: COLORS.primary,
    },
    background: {
      default: COLORS.light,
      paper: COLORS.white,
    },
    text: {
      primary: COLORS.primary,
      secondary: COLORS.dark,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: COLORS.primary,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: COLORS.primary,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export default theme;
