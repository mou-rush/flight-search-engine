import React, { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import SortIcon from "@mui/icons-material/Sort";
import theme from "./constants/theme";
import SearchForm from "./components/SearchForm/SearchForm";
import { FlightResults } from "./components/FlightResults/FlightResults";
import Filters from "./components/Filters/Filters";
import PriceGraph from "./components/PriceGraph/PriceGraph";
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
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <FlightIcon sx={{ mr: 2, fontSize: 32 }} />
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 700 }}
          >
            MoSkySearch
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Search Form */}
      <SearchForm onSearch={handleSearch} loading={loading} />

      {/* Results Section */}
      {hasSearched && (
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
          <Container maxWidth="xl">
            {!loading && !error && flights.length > 0 && (
              <>
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
                        {sortedFlights.length} flights found
                      </Typography>

                      <FormControl size="small" sx={{ minWidth: 200 }}>
                        <Select
                          value={sortBy}
                          onChange={handleSortChange}
                          startAdornment={
                            <SortIcon sx={{ mr: 1, color: "action.active" }} />
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

                    <FlightResults
                      flights={sortedFlights}
                      dictionaries={dictionaries}
                      loading={loading}
                      error={error}
                    />
                  </Grid>
                </Grid>
              </>
            )}

            {!loading && !error && flights.length === 0 && hasSearched && (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <FlightIcon
                  sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
                />
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  No flights found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Try adjusting your search criteria or dates
                </Typography>
              </Box>
            )}

            {error && (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="h6" color="error" gutterBottom>
                  {error}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please try again or contact support if the issue persists
                </Typography>
              </Box>
            )}

            {loading && (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  Searching for the best flights...
                </Typography>
              </Box>
            )}
          </Container>
        </Box>
      )}

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 3,
          mt: "auto",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            © 2026 MoSkySearch
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
