import { createTheme, alpha } from "@mui/material/styles";

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
    fontFamily: ' "Matter", sans-serif',
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

export const inputStyle = {
  "& .MuiOutlinedInput-root": {
    height: 64,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(8px)",
    transition: "all 0.3s ease",
    border: "2px solid transparent",
    "&:hover": {
      backgroundColor: "#FFFFFF",
      borderColor: alpha(theme.palette.primary.main, 0.3),
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px -5px rgba(52, 207, 194, 0.15)",
    },
    "&.Mui-focused": {
      backgroundColor: "#FFFFFF",
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.12)}`,
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 600,
    color: theme.palette.text.secondary,
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
};
