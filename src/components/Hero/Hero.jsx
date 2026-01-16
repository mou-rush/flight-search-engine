import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  MenuItem,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  IconButton,
  Chip,
  alpha,
  CircularProgress,
  Stack,
  Grid,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTheme } from "@mui/material/styles";

import FlightLandIcon from "@mui/icons-material/FlightLand";
import SearchIcon from "@mui/icons-material/Search";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import PublicIcon from "@mui/icons-material/Public";
import BoltIcon from "@mui/icons-material/Bolt";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FlightIcon from "@mui/icons-material/Flight";
import dayjs from "dayjs";
import { airports } from "../../constants/airports";
import { motion } from "framer-motion";
import Autocomplete from "../Common/MoSkySearchSingleSelectComplete/MoSkySearchSingleSelectComplete";
import { inputStyle } from "../../constants/theme";
import Header from "../Header/Header";

const travelClasses = [
  { value: "ECONOMY", label: "Economy" },
  { value: "PREMIUM_ECONOMY", label: "Premium Economy" },
  { value: "BUSINESS", label: "Business" },
  { value: "FIRST", label: "First Class" },
];

const FlightSearchForm = ({ onSearch, loading = false }) => {
  const theme = useTheme();
  const [tripType, setTripType] = useState("round-trip");
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(dayjs().add(7, "day"));
  const [adults, setAdults] = useState(1);
  const [travelClass, setTravelClass] = useState("ECONOMY");
  const [errors, setErrors] = useState({});

  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!origin) newErrors.origin = "Origin airport is required";
    if (!destination) newErrors.destination = "Destination airport is required";
    if (origin && destination && origin.code === destination.code) {
      newErrors.destination = "Destination must be different from origin";
    }
    if (!departureDate) newErrors.departureDate = "Departure date is required";
    if (tripType === "round-trip" && !returnDate) {
      newErrors.returnDate = "Return date is required";
    }
    if (
      tripType === "round-trip" &&
      returnDate &&
      returnDate.isBefore(departureDate)
    ) {
      newErrors.returnDate = "Return date must be after departure";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const searchParams = {
      origin: origin.code,
      destination: destination.code,
      departureDate: departureDate.format("YYYY-MM-DD"),
      adults,
      travelClass,
    };

    if (tripType === "round-trip" && returnDate) {
      searchParams.returnDate = returnDate.format("YYYY-MM-DD");
    }

    onSearch?.(searchParams);
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        background: `
          linear-gradient(135deg, rgb(15, 32, 39) 0%, rgb(32, 58, 67) 50%, rgb(44, 83, 100) 100%),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")
        `,
        backgroundBlendMode: "overlay",
        pt: 0,
        pb: { xs: 4, md: 8 },

        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Header />
      {/* Animated Background Elements */}
      <Box
        component={motion.div}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 300,
          height: 300,
          background: `radial-gradient(circle, ${alpha(
            "#34CFC2",
            0.15
          )} 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      />
      <Box
        component={motion.div}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 25, repeat: Infinity }}
        sx={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${alpha(
            "#34CFC2",
            0.1
          )} 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />

      {/* Floating Plane */}
      <Box
        component={motion.div}
        animate={{
          x: ["-10%", "110%"],
          y: [100, 50, 100],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        sx={{ position: "absolute", top: 60 }}
      >
        <FlightIcon
          sx={{
            fontSize: 32,
            color: alpha("#34CFC2", 0.2),
            transform: "rotate(45deg)",
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Hero Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          sx={{ textAlign: "center", mb: 5 }}
        >
          <Chip
            icon={<FlightIcon sx={{ fontSize: 18 }} />}
            label="Search & Compare Flights Instantly"
            sx={{
              mb: 3,
              px: 2,
              py: 2.5,
              backgroundColor: alpha("#34CFC2", 0.15),
              border: `1px solid ${alpha("#34CFC2", 0.3)}`,
              color: "#34CFC2",
              fontWeight: 600,
              fontSize: "0.85rem",
              "& .MuiChip-icon": { color: "#34CFC2" },
            }}
          />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "#FFFFFF",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
              letterSpacing: "-0.02em",
            }}
          >
            Discover the{" "}
            <span style={{ color: theme.palette.secondary.main }}>World</span>
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: alpha("#FFFFFF", 0.7),
              fontWeight: 400,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Compare prices across hundreds of airlines and book your next
            adventure with confidence.
          </Typography>
        </Box>

        {/* Search Card */}
        <Paper
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.88) 100%)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${alpha("#FFFFFF", 0.5)}`,
            boxShadow: "0 30px 60px -15px rgba(5, 24, 48, 0.25)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative Gradient */}
          <Box
            sx={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 150,
              height: 150,
              background: `radial-gradient(circle, ${alpha(
                "#34CFC2",
                0.2
              )} 0%, transparent 70%)`,
              borderRadius: "50%",
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { md: "center" },
                justifyContent: "space-between",
                gap: 2,
                mb: 4,
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SearchIcon sx={{ color: "#FFF", fontSize: 20 }} />
                  </Box>
                  Find Your Perfect Flight
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary, mt: 0.5 }}
                >
                  Search hundreds of airlines for the best deals
                </Typography>
              </Box>

              {/* Trip Type Toggle */}
              <RadioGroup
                row
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                sx={{
                  p: 0.5,
                  backgroundColor: alpha(theme.palette.secondary.main, 0.06),
                  borderRadius: 3,
                  gap: 0,
                }}
              >
                {[
                  { value: "round-trip", label: "Round Trip" },
                  { value: "one-way", label: "One Way" },
                ].map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio sx={{ display: "none" }} />}
                    label={option.label}
                    sx={{
                      m: 0,
                      px: 2.5,
                      py: 1,
                      borderRadius: 2.5,
                      transition: "all 0.25s ease",
                      backgroundColor:
                        tripType === option.value ? "#FFFFFF" : "transparent",
                      boxShadow:
                        tripType === option.value
                          ? "0 4px 12px rgba(0,0,0,0.08)"
                          : "none",
                      "& .MuiFormControlLabel-label": {
                        fontWeight: tripType === option.value ? 600 : 500,
                        color:
                          tripType === option.value
                            ? theme.palette.text.primary
                            : theme.palette.text.secondary,
                        fontSize: "0.9rem",
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            </Box>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                {/* Origin & Destination Row */}
                <Grid container spacing={2.5} sx={{ position: "relative" }}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Autocomplete
                      value={origin}
                      onChange={(newValue) => {
                        setOrigin(newValue);
                        handleFieldChange("origin");
                      }}
                      label="From"
                      options={airports}
                      error={!!errors.origin}
                      helperText={errors.origin}
                      inputSx={inputStyle}
                    />
                  </Grid>

                  {/* Swap Button (Desktop) */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    <IconButton
                      onClick={swapLocations}
                      component={motion.button}
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      whileTap={{ scale: 0.95 }}
                      sx={{
                        width: 48,
                        height: 48,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        color: "#FFFFFF",
                        boxShadow: "0 8px 25px -5px rgba(52, 207, 194, 0.5)",
                        "&:hover": {
                          background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                        },
                      }}
                    >
                      <SwapHorizIcon />
                    </IconButton>
                  </Box>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Autocomplete
                      value={destination}
                      onChange={(newValue) => {
                        setDestination(newValue);
                        handleFieldChange("destination");
                      }}
                      label="To"
                      options={airports}
                      error={!!errors.destination}
                      helperText={errors.destination}
                      icon={FlightLandIcon}
                      inputSx={inputStyle}
                    />
                  </Grid>
                </Grid>

                {/* Mobile Swap Button */}
                <Box
                  sx={{
                    display: { xs: "flex", md: "none" },
                    justifyContent: "center",
                    my: -1,
                  }}
                >
                  <IconButton
                    onClick={swapLocations}
                    sx={{
                      width: 44,
                      height: 44,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      color: "#FFFFFF",
                      transform: "rotate(90deg)",
                      boxShadow: "0 6px 20px -3px rgba(52, 207, 194, 0.4)",
                    }}
                  >
                    <SwapHorizIcon />
                  </IconButton>
                </Box>

                {/* Dates and Options Row */}
                <Grid container spacing={2.5}>
                  {/* Departure Date */}
                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                      md: tripType === "round-trip" ? 3 : 4,
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Departure"
                        value={departureDate}
                        onChange={(newValue) => {
                          if (newValue) setDepartureDate(newValue);
                          handleFieldChange("departureDate");
                        }}
                        minDate={dayjs()}
                        slots={{
                          openPickerIcon: CalendarTodayIcon,
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors.departureDate,
                            helperText: errors.departureDate,
                            sx: { inputStyle },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>

                  {/* Return Date */}
                  {tripType === "round-trip" && (
                    <Grid
                      size={{ xs: 12, sm: 6, md: 3 }}
                      component={motion.div}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Return"
                          value={returnDate}
                          onChange={(newValue) => {
                            if (newValue) setReturnDate(newValue);
                            handleFieldChange("returnDate");
                          }}
                          minDate={departureDate}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: !!errors.returnDate,
                              helperText: errors.returnDate,
                              sx: { inputStyle },
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>
                  )}

                  {/* Passengers */}
                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                      md: tripType === "round-trip" ? 3 : 4,
                    }}
                  >
                    <TextField
                      select
                      fullWidth
                      label="Travelers"
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      sx={inputStyle}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Box
                                sx={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 2,
                                  backgroundColor: alpha(
                                    theme.palette.primary.main,
                                    0.15
                                  ),
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <PeopleOutlineIcon
                                  sx={{
                                    color: theme.palette.primary.main,
                                    fontSize: 20,
                                  }}
                                />
                              </Box>
                            </InputAdornment>
                          ),
                        },
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <MenuItem key={num} value={num}>
                          <Typography sx={{ fontWeight: 600 }}>
                            {num}{" "}
                            <Typography
                              component="span"
                              sx={{
                                fontWeight: 400,
                                color: "text.secondary",
                              }}
                            >
                              {num === 1 ? "Adult" : "Adults"}
                            </Typography>
                          </Typography>
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Travel Class */}
                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                      md: tripType === "round-trip" ? 3 : 4,
                    }}
                  >
                    <TextField
                      select
                      fullWidth
                      label="Class"
                      value={travelClass}
                      onChange={(e) => setTravelClass(e.target.value)}
                      sx={inputStyle}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Box
                                sx={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 2,
                                  backgroundColor: alpha(
                                    theme.palette.primary.main,
                                    0.15
                                  ),
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <AirlineSeatReclineNormalIcon
                                  sx={{
                                    color: theme.palette.primary.main,
                                    fontSize: 20,
                                  }}
                                />
                              </Box>
                            </InputAdornment>
                          ),
                        },
                      }}
                    >
                      {travelClasses.map((cls) => (
                        <MenuItem key={cls.value} value={cls.value}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <Typography sx={{ fontWeight: 600 }}>
                              {cls.label}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>

                {/* Search Button */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                  component={motion.button}
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  startIcon={
                    loading ? (
                      <CircularProgress size={22} sx={{ color: "#FFF" }} />
                    ) : (
                      <SearchIcon />
                    )
                  }
                  sx={{
                    py: 2,
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    boxShadow: "0 15px 35px -10px rgba(52, 207, 194, 0.5)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
                      boxShadow: "0 20px 45px -10px rgba(52, 207, 194, 0.6)",
                    },
                    "&:disabled": {
                      background: `linear-gradient(135deg, ${alpha(
                        theme.palette.primary.main,
                        0.6
                      )} 0%, ${alpha(theme.palette.secondary.main, 0.6)} 100%)`,
                    },
                  }}
                >
                  {loading ? "Searching flights..." : "Search Flights"}
                </Button>
              </Stack>
            </form>
          </Box>
        </Paper>

        {/* Feature Badges */}
        <Grid
          container
          spacing={2}
          sx={{ mt: 5, maxWidth: 900, mx: "auto" }}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {[
            {
              icon: <PublicIcon color="secondary" />,
              label: "500+ Airlines",
              desc: "Worldwide coverage",
            },
            {
              icon: <MonetizationOnIcon color="secondary" />,
              label: "Best Prices",
              desc: "Price match guarantee",
            },
            {
              icon: <BoltIcon color="secondary" />,
              label: "Easy Booking",
              desc: "Book in minutes",
            },
          ].map((feature, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={feature.label}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2.5,
                  borderRadius: 3,
                  backgroundColor: alpha("#FFFFFF", 0.08),
                  border: `1px solid ${alpha("#FFFFFF", 0.12)}`,
                  backdropFilter: "blur(8px)",
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2.5,
                    backgroundColor: alpha("#34CFC2", 0.2),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  {feature.icon}
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, color: "#FFFFFF" }}>
                    {feature.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: alpha("#FFFFFF", 0.6) }}
                  >
                    {feature.desc}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FlightSearchForm;
