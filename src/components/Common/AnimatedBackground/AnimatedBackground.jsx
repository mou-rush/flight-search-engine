import { Box, alpha } from "@mui/material";
import { motion } from "framer-motion";
import FlightIcon from "@mui/icons-material/Flight";

export const AnimatedBackground = () => (
  <>
    <Box
      component={motion.div}
      animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
      transition={{ duration: 20, repeat: Infinity }}
      sx={{
        position: "absolute",
        top: "10%",
        left: "5%",
        width: 300,
        height: 300,
        background: `radial-gradient(circle, ${alpha(
          "#34CFC2",
          0.15
        )} 0%, transparent 70%)`,
        borderRadius: "50%",
        filter: "blur(40px)",
      }}
    />
    <Box
      component={motion.div}
      animate={{ x: ["-10%", "110%"], y: [100, 50, 100] }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      sx={{ position: "absolute", top: 60 }}
    >
      <FlightIcon
        sx={{
          fontSize: 32,
          color: alpha("#34CFC2", 0.2),
          transform: "rotate(45deg)",
        }}
      />
    </Box>
  </>
);
