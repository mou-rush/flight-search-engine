import React from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Chip,
  Box,
  Fade,
} from "@mui/material";
import { checkboxStyles } from "./styles";

const AirlinesFilter = ({ airlines = [], selected = [], onChange }) => {
  const toggleAirline = (code) => {
    if (selected.includes(code)) {
      onChange(selected.filter((a) => a !== code));
    } else {
      onChange([...selected, code]);
    }
  };

  return (
    <FormGroup sx={{ maxHeight: 300, overflowY: "auto" }}>
      {airlines.map((airline, index) => (
        <Fade in key={airline.code} timeout={300 + index * 50}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selected.includes(airline.code)}
                onChange={() => toggleAirline(airline.code)}
                sx={checkboxStyles}
              />
            }
            label={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: selected.includes(airline.code) ? 600 : 400,
                  }}
                >
                  {airline.name}
                </Typography>

                <Chip
                  label={airline.count}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.7rem",
                    bgcolor: selected.includes(airline.code)
                      ? "secondary.main"
                      : "grey.200",
                  }}
                />
              </Box>
            }
          />
        </Fade>
      ))}
    </FormGroup>
  );
};

export default AirlinesFilter;
