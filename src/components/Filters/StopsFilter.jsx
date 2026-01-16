import React from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Fade,
} from "@mui/material";
import { checkboxStyles } from "./styles";

const STOP_OPTIONS = [
  { value: 0, label: "Direct (0 stops)" },
  { value: 1, label: "1 stop" },
  { value: 2, label: "2+ stops" },
];

const StopsFilter = ({ selected = [], onChange }) => {
  const toggleStop = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((s) => s !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <FormGroup>
      {STOP_OPTIONS.map((option) => (
        <Fade in key={option.value}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selected.includes(option.value)}
                onChange={() => toggleStop(option.value)}
                sx={checkboxStyles}
              />
            }
            label={
              <Typography
                variant="body2"
                sx={{ fontWeight: selected.includes(option.value) ? 600 : 400 }}
              >
                {option.label}
              </Typography>
            }
          />
        </Fade>
      ))}
    </FormGroup>
  );
};

export default StopsFilter;
