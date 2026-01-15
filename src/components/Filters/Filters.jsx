
import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Chip,
  Button,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const Filters = ({ 
  filters, 
  onFilterChange, 
  priceRange, 
  availableAirlines,
  activeFiltersCount 
}) => {
  const handlePriceChange = (event, newValue) => {
    onFilterChange('priceRange', newValue);
  };

  const handleStopsChange = (stops) => {
    const currentStops = filters.stops || [];
    const newStops = currentStops.includes(stops)
      ? currentStops.filter(s => s !== stops)
      : [...currentStops, stops];
    onFilterChange('stops', newStops);
  };

  const handleAirlineChange = (airline) => {
    const currentAirlines = filters.airlines || [];
    const newAirlines = currentAirlines.includes(airline)
      ? currentAirlines.filter(a => a !== airline)
      : [...currentAirlines, airline];
    onFilterChange('airlines', newAirlines);
  };

  const handleReset = () => {
    onFilterChange('reset');
  };

  return (
    <Paper 
      elevation={2}
      sx={{ 
        p: 3, 
        position: 'sticky',
        top: 20,
        maxHeight: 'calc(100vh - 40px)',
        overflowY: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Filters
          </Typography>
          {activeFiltersCount > 0 && (
            <Chip 
              label={activeFiltersCount} 
              size="small" 
              color="secondary"
            />
          )}
        </Box>
        {activeFiltersCount > 0 && (
          <Button 
            size="small" 
            startIcon={<RestartAltIcon />}
            onClick={handleReset}
            sx={{ textTransform: 'none' }}
          >
            Reset
          </Button>
        )}
      </Box>

      {/* Price Range Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Price Range
        </Typography>
        <Box sx={{ px: 1 }}>
          <Slider
            value={filters.priceRange || priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `$${value}`}
            min={priceRange[0]}
            max={priceRange[1]}
            sx={{
              color: 'secondary.main',
              '& .MuiSlider-thumb': {
                backgroundColor: 'secondary.main',
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              ${filters.priceRange?.[0] || priceRange[0]}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ${filters.priceRange?.[1] || priceRange[1]}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Stops Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Number of Stops
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.stops?.includes(0) || false}
                onChange={() => handleStopsChange(0)}
                sx={{
                  color: 'secondary.main',
                  '&.Mui-checked': {
                    color: 'secondary.main',
                  },
                }}
              />
            }
            label="Direct (0 stops)"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.stops?.includes(1) || false}
                onChange={() => handleStopsChange(1)}
                sx={{
                  color: 'secondary.main',
                  '&.Mui-checked': {
                    color: 'secondary.main',
                  },
                }}
              />
            }
            label="1 stop"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.stops?.includes(2) || false}
                onChange={() => handleStopsChange(2)}
                sx={{
                  color: 'secondary.main',
                  '&.Mui-checked': {
                    color: 'secondary.main',
                  },
                }}
              />
            }
            label="2+ stops"
          />
        </FormGroup>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Airlines Filter */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Airlines
        </Typography>
        <FormGroup sx={{ maxHeight: 300, overflowY: 'auto' }}>
          {availableAirlines.map((airline) => (
            <FormControlLabel
              key={airline.code}
              control={
                <Checkbox
                  checked={filters.airlines?.includes(airline.code) || false}
                  onChange={() => handleAirlineChange(airline.code)}
                  sx={{
                    color: 'secondary.main',
                    '&.Mui-checked': {
                      color: 'secondary.main',
                    },
                  }}
                />
              }
              label={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Typography variant="body2">{airline.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    ({airline.count})
                  </Typography>
                </Box>
              }
            />
          ))}
        </FormGroup>
      </Box>
    </Paper>
  );
};

export default Filters;