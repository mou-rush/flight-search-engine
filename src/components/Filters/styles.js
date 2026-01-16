export const filterContainerStyles = {
  p: 3,
  position: "sticky",
  top: 20,
  maxHeight: "calc(100vh - 40px)",
  minHeight: "80vh",

  overflowY: "auto",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

  "&:hover": {
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  },

  "&::-webkit-scrollbar": {
    width: "8px",
  },

  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "4px",
  },

  "&::-webkit-scrollbar-thumb": {
    background: "#34CFC2",
    borderRadius: "4px",
    "&:hover": {
      background: "#2bb8ad",
    },
  },
};

export const checkboxStyles = {
  color: "secondary.main",
  transition: "all 0.3s",

  "&.Mui-checked": {
    color: "secondary.main",
    transform: "scale(1.1)",
  },

  "&:hover": {
    bgcolor: "rgba(52, 207, 194, 0.08)",
  },
};
