import { Stack, Box, Typography, Tooltip, alpha } from "@mui/material";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const PriceStats = ({ stats }) => (
  <Stack
    direction="row"
    spacing={{ xs: 2, md: 4 }}
    sx={{
      mb: 3,
      p: 2,
      borderRadius: 3,
      bgcolor: alpha("#213C46", 0.02),
      flexWrap: "wrap",
      gap: 2,
    }}
  >
    <Box sx={{ minWidth: 100 }}>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          Average Price
        </Typography>
        <Tooltip title="Mean price across all flights" arrow>
          <InfoOutlinedIcon sx={{ fontSize: 14, color: "text.disabled" }} />
        </Tooltip>
      </Stack>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          background: "linear-gradient(135deg, #34CFC2 0%, #213C46 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        ${stats.average}
      </Typography>
    </Box>

    <Box sx={{ minWidth: 100 }}>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <TrendingDownIcon sx={{ fontSize: 16, color: "#22C55E" }} />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          Lowest
        </Typography>
      </Stack>
      <Typography variant="h5" sx={{ fontWeight: 800, color: "#22C55E" }}>
        ${stats.lowest}
      </Typography>
    </Box>

    <Box sx={{ minWidth: 100 }}>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <TrendingUpIcon sx={{ fontSize: 16, color: "#EF4444" }} />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          Highest
        </Typography>
      </Stack>
      <Typography variant="h5" sx={{ fontWeight: 800, color: "#EF4444" }}>
        ${stats.highest}
      </Typography>
    </Box>
  </Stack>
);

export default PriceStats;
