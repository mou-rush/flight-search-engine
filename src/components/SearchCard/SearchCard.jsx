import React from "react";
import dayjs from "dayjs";
import { airports } from "../../constants/airports";
import { travelClasses } from "../../constants/travelClasses";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  IconButton,
  alpha,
  CircularProgress,
  Stack,
  Grid,
} from "@mui/material";

import AppDatePicker from "../Common/AppDatePicker/AppDatePicker";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import SearchIcon from "@mui/icons-material/Search";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";

import { motion } from "framer-motion";
import Autocomplete from "../Common/MoSkySearchSingleSelectComplete/MoSkySearchSingleSelectComplete";
import theme, { inputStyle } from "../../constants/theme";

const SearchCard = ({ form, loading }) => {
  const {
    state: {
      tripType,
      origin,
      destination,
      departureDate,
      returnDate,
      adults,
      travelClass,
      errors,
    },
    actions: {
      setTripType,
      setOrigin,
      setDestination,
      setDepartureDate,
      setReturnDate,
      setAdults,
      setTravelClass,
      swapLocations,
      handleFieldChange,
      handleSubmit,
    },
  } = form;

  return (
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
                  background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.contrastText} 100%)`,
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
                background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.contrastText} 100%)`,
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
              <AppDatePicker
                label="Departure"
                value={departureDate}
                minDate={dayjs()}
                error={!!errors.departureDate}
                helperText={errors.departureDate}
                inputSx={inputStyle}
                onChange={(value) => {
                  if (!value) return;
                  setDepartureDate(value);
                  handleFieldChange("departureDate");
                }}
              />
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
                {tripType === "round-trip" && (
                  <Grid
                    component={motion.div}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <AppDatePicker
                      label="Return"
                      value={returnDate}
                      minDate={departureDate}
                      icon={TodayRoundedIcon}
                      error={!!errors.returnDate}
                      helperText={errors.returnDate}
                      inputSx={inputStyle}
                      onChange={(value) => {
                        if (!value) return;
                        setReturnDate(value);
                        handleFieldChange("returnDate");
                      }}
                    />
                  </Grid>
                )}
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
  );
};

export default SearchCard;
