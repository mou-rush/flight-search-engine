import { Box, Typography, alpha } from "@mui/material";
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
  <Box
    sx={{
      mt: 5,
      maxWidth: 900,
      mx: "auto",
      display: "grid",
      gap: 2,
      gridTemplateColumns: {
        xs: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
      },
    }}
  >
    {FEATURES.map((feature, i) => (
      <Box
        key={feature.label}
        sx={{
          ...(i === 2 && {
            gridColumn: { xs: "1 / -1", md: "auto" },
          }),
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.1 }}
          sx={{
            height: "100%",
            p: { xs: 3, md: 2.5 },
            borderRadius: 4,
            backgroundColor: alpha("#FFF", 0.08),
            border: `1px solid ${alpha("#FFF", 0.12)}`,
            backdropFilter: "blur(8px)",

            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
            gap: { xs: 1.5, md: 2 },
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 3,
              backgroundColor: alpha("#34CFC2", 0.25),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.6rem",
              flexShrink: 0,
            }}
          >
            {feature.icon}
          </Box>

          {/* Content */}
          <Box>
            <Typography sx={{ fontWeight: 700, color: "#FFF", mb: 0.5 }}>
              {feature.label}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: alpha("#FFF", 0.65), lineHeight: 1.6 }}
            >
              {feature.desc}
            </Typography>
          </Box>
        </Box>
      </Box>
    ))}
  </Box>
);
