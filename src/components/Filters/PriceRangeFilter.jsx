import React from "react";
import { Box, Slider, Chip } from "@mui/material";

const PriceRangeFilter = ({ value, range, onChange }) => {
  return (
    <Box sx={{ px: 1 }}>
      <Slider
        value={value || range}
        onChange={(_, newValue) => onChange(newValue)}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `$${value}`}
        min={range[0]}
        max={range[1]}
        color="secondary"
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Chip
          label={`$${value?.[0] || range[0]}`}
          size="small"
          variant="outlined"
          color="secondary"
        />
        <Chip
          label={`$${value?.[1] || range[1]}`}
          size="small"
          variant="outlined"
          color="secondary"
        />
      </Box>
    </Box>
  );
};

export default PriceRangeFilter;
