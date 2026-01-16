import React, { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  Fade,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import SortIcon from "@mui/icons-material/Sort";
import theme from "./constants/theme";
import SearchForm from "./components/Hero/Hero";
import { FlightResults } from "./components/FlightResults/FlightResults";
import Filters from "./components/Filters/Filters";
import PriceGraph from "./components/PriceGraph/PriceGraph";
import {
  FiltersSkeleton,
  PriceGraphSkeleton,
  FlightResultsSkeleton,
} from "./components/Common/SkeletonLoaders/SkeletonLoaders";
import { useFlightSearch } from "./hooks/useFlightSearch";
import { useFilters } from "./hooks/useFilters";
import { sortFlights } from "./utils/flightDataProcessor";

function App() {
  const { flights, dictionaries, loading, error, searchFlights } =
    useFlightSearch();
  const {
    filters,
    filteredFlights,
    filterOptions,
    activeFiltersCount,
    handleFilterChange,
  } = useFilters(flights);

  const [sortBy, setSortBy] = useState("price");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (searchParams) => {
    setHasSearched(true);
    await searchFlights(searchParams);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const sortedFlights = sortFlights(filteredFlights, sortBy);

  const enrichedFilterOptions = {
    ...filterOptions,
    airlines: filterOptions.airlines.map((airline) => ({
      ...airline,
      name: dictionaries?.carriers?.[airline.code] || airline.code,
    })),
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Header */}

      {/* Search Form */}
      <SearchForm onSearch={handleSearch} loading={loading} />

      {/* Results Section */}
      {hasSearched && (
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
          <Container minWidth="xl">
            {loading ? (
              /* Loading State with Skeletons */
              <>
                <PriceGraphSkeleton />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <FiltersSkeleton />
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <FlightResultsSkeleton count={5} />
                  </Grid>
                </Grid>
              </>
            ) : !error && flights.length > 0 ? (
              /* Results with Data */
              <Fade in timeout={500}>
                <Box>
                  {/* Price Graph */}
                  <PriceGraph flights={sortedFlights} />

                  <Grid container spacing={3}>
                    {/* Filters Sidebar */}
                    <Grid item xs={12} md={3}>
                      <Filters
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        priceRange={enrichedFilterOptions.priceRange}
                        availableAirlines={enrichedFilterOptions.airlines}
                        activeFiltersCount={activeFiltersCount}
                      />
                    </Grid>

                    {/* Flight Results */}
                    <Grid item xs={12} md={9}>
                      {/* Sort Controls */}
                      <Fade in timeout={600}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 3,
                            flexWrap: "wrap",
                            gap: 2,
                          }}
                        >
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {sortedFlights.length}{" "}
                            {sortedFlights.length === 1 ? "flight" : "flights"}{" "}
                            found
                          </Typography>

                          <FormControl
                            size="small"
                            sx={{
                              minWidth: 200,
                              "& .MuiOutlinedInput-root": {
                                transition: "all 0.3s",
                                "&:hover": {
                                  transform: "scale(1.02)",
                                },
                              },
                            }}
                          >
                            <Select
                              value={sortBy}
                              onChange={handleSortChange}
                              startAdornment={
                                <SortIcon
                                  sx={{ mr: 1, color: "action.active" }}
                                />
                              }
                            >
                              <MenuItem value="price">Lowest Price</MenuItem>
                              <MenuItem value="duration">
                                Shortest Duration
                              </MenuItem>
                              <MenuItem value="stops">Fewest Stops</MenuItem>
                              <MenuItem value="departure">
                                Earliest Departure
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Fade>

                      <FlightResults
                        flights={sortedFlights}
                        dictionaries={dictionaries}
                        loading={false}
                        error={null}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Fade>
            ) : !error && flights.length === 0 ? (
              /* No Results */
              <Fade in timeout={500}>
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <Box
                    sx={{
                      display: "inline-block",
                      animation: "float 3s ease-in-out infinite",
                      "@keyframes float": {
                        "0%, 100%": { transform: "translateY(0)" },
                        "50%": { transform: "translateY(-20px)" },
                      },
                    }}
                  >
                    <FlightIcon
                      sx={{
                        fontSize: 80,
                        color: "text.secondary",
                        mb: 2,
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    No flights found
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Try adjusting your search criteria or dates
                  </Typography>
                </Box>
              </Fade>
            ) : error ? (
              /* Error State */
              <Fade in timeout={500}>
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <Typography
                    variant="h6"
                    color="error"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {error}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Please try again or contact support if the issue persists
                  </Typography>
                </Box>
              </Fade>
            ) : null}
          </Container>
        </Box>
      )}

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: "text.secondary",
          color: "#80A2AA",
          py: 3,
          mt: "auto",
        }}
      >
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Typography variant="body2" align="center">
              © 2026 MoSkySearch
            </Typography>
          </Fade>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
