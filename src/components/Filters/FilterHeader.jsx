import React from "react";
import { Box, Typography, Chip, Button, Zoom, Fade } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const FilterHeader = ({ activeFiltersCount, onReset }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <FilterListIcon color="primary" />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Filters
        </Typography>

        {activeFiltersCount > 0 && (
          <Zoom in>
            <Chip label={activeFiltersCount} size="small" color="secondary" />
          </Zoom>
        )}
      </Box>

      {activeFiltersCount > 0 && (
        <Fade in>
          <Button
            size="small"
            startIcon={<RestartAltIcon />}
            onClick={onReset}
            sx={{ textTransform: "none" }}
          >
            Reset
          </Button>
        </Fade>
      )}
    </Box>
  );
};

export default FilterHeader;
