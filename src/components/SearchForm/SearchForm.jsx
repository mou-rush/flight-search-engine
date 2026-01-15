import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Autocomplete,
  MenuItem,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import { airports } from "../../constants/airports";

const SearchForm = ({ onSearch, loading }) => {
  const [tripType, setTripType] = useState("round-trip");
  const [formData, setFormData] = useState({
    origin: null,
    destination: null,
    departureDate: dayjs(),
    returnDate: dayjs().add(7, "day"),
    adults: 1,
    travelClass: "ECONOMY",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.origin) {
      newErrors.origin = "Origin airport is required";
    }
    if (!formData.destination) {
      newErrors.destination = "Destination airport is required";
    }
    if (
      formData.origin &&
      formData.destination &&
      formData.origin.code === formData.destination.code
    ) {
      newErrors.destination = "Destination must be different from origin";
    }
    if (!formData.departureDate) {
      newErrors.departureDate = "Departure date is required";
    }
    if (tripType === "round-trip" && !formData.returnDate) {
      newErrors.returnDate = "Return date is required";
    }
    if (
      tripType === "round-trip" &&
      formData.returnDate &&
      formData.returnDate.isBefore(formData.departureDate)
    ) {
      newErrors.returnDate = "Return date must be after departure date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const searchParams = {
      origin: formData.origin.code,
      destination: formData.destination.code,
      departureDate: formData.departureDate.format("YYYY-MM-DD"),
      adults: formData.adults,
      travelClass: formData.travelClass,
    };

    if (tripType === "round-trip" && formData.returnDate) {
      searchParams.returnDate = formData.returnDate.format("YYYY-MM-DD");
    }

    onSearch(searchParams);
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #213C46 0%, #051830 100%)",
        py: 6,
        minHeight: "400px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
            Find Your Perfect Flight
          </Typography>

          <RadioGroup
            row
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            sx={{ mb: 3 }}
          >
            <FormControlLabel
              value="round-trip"
              control={<Radio />}
              label="Round Trip"
            />
            <FormControlLabel
              value="one-way"
              control={<Radio />}
              label="One Way"
            />
          </RadioGroup>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={airports}
                  getOptionLabel={(option) =>
                    `${option.city} (${option.code}) - ${option.name}`
                  }
                  value={formData.origin}
                  onChange={(e, newValue) =>
                    handleFieldChange("origin", newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="From"
                      error={!!errors.origin}
                      helperText={errors.origin}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <FlightTakeoffIcon
                              sx={{ color: "action.active", mr: 1 }}
                            />
                            {params.InputProps.startAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={airports}
                  getOptionLabel={(option) =>
                    `${option.city} (${option.code}) - ${option.name}`
                  }
                  value={formData.destination}
                  onChange={(e, newValue) =>
                    handleFieldChange("destination", newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="To"
                      error={!!errors.destination}
                      helperText={errors.destination}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <FlightLandIcon
                              sx={{ color: "action.active", mr: 1 }}
                            />
                            {params.InputProps.startAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={tripType === "round-trip" ? 3 : 4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Departure"
                    value={formData.departureDate}
                    onChange={(newValue) =>
                      handleFieldChange("departureDate", newValue)
                    }
                    minDate={dayjs()}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.departureDate,
                        helperText: errors.departureDate,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              {tripType === "round-trip" && (
                <Grid item xs={12} sm={6} md={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Return"
                      value={formData.returnDate}
                      onChange={(newValue) =>
                        handleFieldChange("returnDate", newValue)
                      }
                      minDate={formData.departureDate}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.returnDate,
                          helperText: errors.returnDate,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              )}

              <Grid item xs={12} sm={6} md={tripType === "round-trip" ? 3 : 4}>
                <TextField
                  select
                  fullWidth
                  label="Passengers"
                  value={formData.adults}
                  onChange={(e) => handleFieldChange("adults", e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num} {num === 1 ? "Adult" : "Adults"}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={tripType === "round-trip" ? 3 : 4}>
                <TextField
                  select
                  fullWidth
                  label="Class"
                  value={formData.travelClass}
                  onChange={(e) =>
                    handleFieldChange("travelClass", e.target.value)
                  }
                >
                  <MenuItem value="ECONOMY">Economy</MenuItem>
                  <MenuItem value="PREMIUM_ECONOMY">Premium Economy</MenuItem>
                  <MenuItem value="BUSINESS">Business</MenuItem>
                  <MenuItem value="FIRST">First Class</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                  startIcon={<SearchIcon />}
                  sx={{
                    py: 1.5,
                    fontSize: "1.1rem",
                    background:
                      "linear-gradient(135deg, #34CFC2 0%, #213C46 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #2bb8ad 0%, #1a2f38 100%)",
                    },
                  }}
                >
                  {loading ? "Searching..." : "Search Flights"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default SearchForm;
