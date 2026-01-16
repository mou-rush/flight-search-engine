import { Box, Typography, Chip, alpha } from "@mui/material";
import { motion } from "framer-motion";
import FlightIcon from "@mui/icons-material/Flight";
import { useTheme } from "@mui/material/styles";

export const HeroSection = () => {
  const theme = useTheme();

  const titleStyles = {
    mb: 3,
    px: 2,
    py: 2.5,
    backgroundColor: alpha("#34CFC2", 0.15),
    border: `1px solid ${alpha("#34CFC2", 0.3)}`,
    color: "#34CFC2",
    fontWeight: 600,
    fontSize: "0.85rem",
    "& .MuiChip-icon": { color: "#34CFC2" },
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      sx={{ textAlign: "center", mb: 5 }}
    >
      <Chip
        icon={<FlightIcon fontSize="medium" color="secondary" />}
        label="Search & Compare Flights Instantly"
        sx={titleStyles}
      />

      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          color: "#FFFFFF",
          mb: 2,
          fontSize: { xs: "2rem", md: "3rem" },
          letterSpacing: "-0.02em",
        }}
      >
        Discover the{" "}
        <span style={{ color: theme.palette.secondary.main }}>World</span>
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: alpha("#FFFFFF", 0.7),
          fontWeight: 400,
          maxWidth: 600,
          mx: "auto",
        }}
      >
        Compare prices across hundreds of airlines and book your next adventure
        with confidence.
      </Typography>
    </Box>
  );
};
