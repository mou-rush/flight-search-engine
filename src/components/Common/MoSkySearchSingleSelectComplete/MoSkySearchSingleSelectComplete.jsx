import React from "react";
import {
  Autocomplete,
  Box,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import FlightIcon from "@mui/icons-material/FlightTakeoff";
import PropTypes from "prop-types";

const MoSkySearchSingleSelectComplete = ({
  value,
  onChange,
  label = "Airport",
  placeholder = "City or airport",
  options = [],
  error = false,
  helperText = "",
  icon: InputIcon = FlightIcon,
  renderOptionIcon: OptionIcon = FlightIcon,
  inputSx = {},
}) => {
  const theme = useTheme();

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) =>
        `${option.city} (${option.code}) - ${option.name}`
      }
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      renderOption={(props, option) => {
        const { key, ...restProps } = props;
        return (
          <Box component="li" key={key} {...restProps} sx={{ py: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <OptionIcon
                  sx={{ color: theme.palette.primary.main, fontSize: 20 }}
                />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 600 }}>
                  {option.city} ({option.code})
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {option.name}
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          sx={inputSx}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    backgroundColor: value
                      ? alpha(theme.palette.primary.main, 0.15)
                      : alpha(theme.palette.text.secondary, 0.08),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  <InputIcon
                    sx={{
                      color: value
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                      fontSize: 20,
                    }}
                  />
                </Box>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default MoSkySearchSingleSelectComplete;

MoSkySearchSingleSelectComplete.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  icon: PropTypes.elementType,
  renderOptionIcon: PropTypes.elementType,
  inputSx: PropTypes.object,
};
