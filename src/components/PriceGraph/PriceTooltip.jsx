import { Paper, Typography, Box, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";

const PriceTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;

  return (
    <Paper
      elevation={8}
      sx={{
        p: 2,
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(10px)",
        border: `2px solid ${alpha("#34CFC2", 0.3)}`,
        borderRadius: 3,
        minWidth: 160,
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          mb: 1.5,
          color: "#213C46",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: "#34CFC2",
          }}
        />
        {data.range}
      </Typography>
      <Stack spacing={0.75}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.secondary">
            Flights:
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: "#213C46" }}
          >
            {data.count}
          </Typography>
        </Box>
        {data.avgPrice > 0 && (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Average:
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "#34CFC2" }}
            >
              ${data.avgPrice}
            </Typography>
          </Box>
        )}
        {data.minPrice > 0 && data.maxPrice > 0 && (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption" color="text.secondary">
              Range:
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 500 }}>
              ${data.minPrice} - ${data.maxPrice}
            </Typography>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default PriceTooltip;
