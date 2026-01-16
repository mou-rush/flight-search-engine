import React from "react";
import { alpha, Stack, Tooltip, IconButton } from "@mui/material";

const ChartTypeToggle = ({ chartType, setChartType, options }) => (
  <Stack direction="row" spacing={0.5}>
    {options.map((option) => (
      <Tooltip key={option.type} title={option.label} arrow>
        <IconButton
          onClick={() => setChartType(option.type)}
          size="small"
          sx={{
            borderRadius: 2,
            px: 1.5,
            py: 0.75,
            bgcolor:
              chartType === option.type ? "#34CFC2" : alpha("#213C46", 0.04),
            color: chartType === option.type ? "#fff" : "#5A6B73",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor:
                chartType === option.type ? "#2BB8AD" : alpha("#213C46", 0.08),
              transform: "scale(1.05)",
            },
          }}
        >
          {option.icon}
        </IconButton>
      </Tooltip>
    ))}
  </Stack>
);

export default ChartTypeToggle;
