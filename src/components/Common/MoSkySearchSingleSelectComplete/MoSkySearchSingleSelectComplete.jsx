import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import FlightIcon from "@mui/icons-material/FlightTakeoff";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PropTypes from "prop-types";
import { useDebounce } from "../../../hooks/useDebounce";
import amadeusService from "../../../services/amadeusApi";

const MoSkySearchSingleSelectComplete = ({
  value,
  onChange,
  label = "Airport",
  placeholder = "City or airport",
  error = false,
  helperText = "",
  icon: InputIcon = FlightIcon,
  renderOptionIcon: OptionIcon = LocationOnIcon,
  inputSx = {},
}) => {
  const theme = useTheme();
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedInput = useDebounce(inputValue, 400);

  useEffect(() => {
    const fetchLocations = async () => {
      if (!debouncedInput || debouncedInput.length < 2) {
        setOptions([]);
        return;
      }

      setLoading(true);

      try {
        const locations = await amadeusService.getLocations(debouncedInput);
        setOptions(locations);
      } catch (err) {
        console.error("Failed to fetch locations:", err);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [debouncedInput]);
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) =>
        `${option.city} (${option.code}) - ${option.name}`
      }
      value={value}
      onInputChange={(_, newInput) => setInputValue(newInput)}
      loading={loading}
      onChange={(_, newValue) => onChange(newValue)}
      renderOption={(props, option) => {
        const { key, ...restProps } = props;
        return (
          <Box component="li" key={key} {...restProps} sx={{ py: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box>
                <OptionIcon
                  sx={{ color: theme.palette.secondary.main, fontSize: 20 }}
                />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 600 }}>
                  {option.city} ({option.code})
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: alpha(theme.palette.text.secondary, 0.5) }}
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
                    backgroundColor: alpha(theme.palette.secondary.main, 0.15),

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  <InputIcon
                    sx={{
                      color: theme.palette.secondary.main,
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
