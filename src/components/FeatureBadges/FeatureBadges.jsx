import { Grid, Box, Typography, alpha } from "@mui/material";
import { motion } from "framer-motion";
import PublicIcon from "@mui/icons-material/Public";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BoltIcon from "@mui/icons-material/Bolt";

const FEATURES = [
  {
    icon: <PublicIcon color="secondary" />,
    label: "500+ Airlines",
    desc: "Worldwide coverage",
  },
  {
    icon: <MonetizationOnIcon color="secondary" />,
    label: "Best Prices",
    desc: "Price match guarantee",
  },
  {
    icon: <BoltIcon color="secondary" />,
    label: "Easy Booking",
    desc: "Book in minutes",
  },
];

export const FeatureBadges = () => (
  <Grid container spacing={2} sx={{ mt: 5, maxWidth: 900, mx: "auto" }}>
    {FEATURES.map((feature, i) => (
      <Grid item xs={12} md={4} key={feature.label}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + i * 0.1 }}
          sx={{
            display: "flex",
            gap: 2,
            p: 2.5,
            borderRadius: 3,
            backgroundColor: alpha("#FFF", 0.08),
            border: `1px solid ${alpha("#FFF", 0.12)}`,
            backdropFilter: "blur(8px)",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2.5,
              backgroundColor: alpha("#34CFC2", 0.2),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
            }}
          >
            {feature.icon}
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, color: "#FFF" }}>
              {feature.label}
            </Typography>
            <Typography variant="body2" sx={{ color: alpha("#FFF", 0.6) }}>
              {feature.desc}
            </Typography>
          </Box>
        </Box>
      </Grid>
    ))}
  </Grid>
);
