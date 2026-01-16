import React from "react";
import { Box, Container, Paper, alpha, Grid } from "@mui/material";
import { motion } from "framer-motion";
import Header from "../Header/Header";
import { useFlightSearchForm } from "../../hooks/useFlightSearchForm";
import { AnimatedBackground } from "../Common/AnimatedBackground/AnimatedBackground";
import { HeroSection } from "../HeroSection/HeroSection";
import SearchCard from "../SearchCard/SearchCard";
import { FeatureBadges } from "../FeatureBadges/FeatureBadges";

const FlightSearchForm = ({ onSearch, loading = false }) => {
  const form = useFlightSearchForm(onSearch);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        background: `
          linear-gradient(135deg, rgb(15, 32, 39) 0%, rgb(32, 58, 67) 50%, rgb(44, 83, 100) 100%),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")
        `,
        backgroundBlendMode: "overlay",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Header />
      <AnimatedBackground />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <HeroSection />

        <Paper
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.88) 100%)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${alpha("#FFFFFF", 0.5)}`,
            boxShadow: "0 30px 60px -15px rgba(5, 24, 48, 0.25)",
          }}
        >
          <SearchCard form={form} loading={loading} />
        </Paper>
        <Grid
          container
          spacing={2}
          sx={{ mt: 2, maxWidth: 900, mx: "auto" }}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <FeatureBadges />
        </Grid>
      </Container>
    </Box>
  );
};

export default FlightSearchForm;
