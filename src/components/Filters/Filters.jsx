
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
  Collapse,
  IconButton,
  Fade,
  Zoom,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Filters = ({ 
  filters, 
  onFilterChange, 
  priceRange, 
  availableAirlines,
  activeFiltersCount 
}) => {
  const [expandedSections, setExpandedSections] = React.useState({
    price: true,
    stops: true,
    airlines: true,
  });

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

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
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
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        },
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#34CFC2',
          borderRadius: '4px',
          '&:hover': {
            background: '#2bb8ad',
          },
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Filters
          </Typography>
          {activeFiltersCount > 0 && (
            <Zoom in>
              <Chip 
                label={activeFiltersCount} 
                size="small" 
                color="secondary"
                sx={{
                  animation: 'pulse 2s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                  },
                }}
              />
            </Zoom>
          )}
        </Box>
        {activeFiltersCount > 0 && (
          <Fade in>
            <Button 
              size="small" 
              startIcon={<RestartAltIcon />}
              onClick={handleReset}
              sx={{ 
                textTransform: 'none',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  bgcolor: 'secondary.light',
                },
              }}
            >
              Reset
            </Button>
          </Fade>
        )}
      </Box>

      {/* Price Range Filter */}
      <Box sx={{ mb: 3 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            cursor: 'pointer',
            mb: 2,
            '&:hover': {
              '& .section-icon': {
                color: 'secondary.main',
              },
            },
          }}
          onClick={() => toggleSection('price')}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Price Range
          </Typography>
          <IconButton size="small" className="section-icon">
            {expandedSections.price ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Collapse in={expandedSections.price}>
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
                  transition: 'all 0.3s',
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: '0 0 0 8px rgba(52, 207, 194, 0.16)',
                    transform: 'scale(1.2)',
                  },
                },
                '& .MuiSlider-track': {
                  transition: 'background 0.3s',
                },
                '& .MuiSlider-rail': {
                  opacity: 0.3,
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Chip
                label={`$${filters.priceRange?.[0] || priceRange[0]}`}
                size="small"
                variant="outlined"
                color="secondary"
                sx={{
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
              <Chip
                label={`$${filters.priceRange?.[1] || priceRange[1]}`}
                size="small"
                variant="outlined"
                color="secondary"
                sx={{
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
            </Box>
          </Box>
        </Collapse>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Stops Filter */}
      <Box sx={{ mb: 3 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            cursor: 'pointer',
            mb: 2,
            '&:hover': {
              '& .section-icon': {
                color: 'secondary.main',
              },
            },
          }}
          onClick={() => toggleSection('stops')}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Number of Stops
          </Typography>
          <IconButton size="small" className="section-icon">
            {expandedSections.stops ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Collapse in={expandedSections.stops}>
          <FormGroup>
            {[
              { value: 0, label: 'Direct (0 stops)' },
              { value: 1, label: '1 stop' },
              { value: 2, label: '2+ stops' },
            ].map((option) => (
              <Fade in key={option.value} timeout={300}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.stops?.includes(option.value) || false}
                      onChange={() => handleStopsChange(option.value)}
                      sx={{
                        color: 'secondary.main',
                        transition: 'all 0.3s',
                        '&.Mui-checked': {
                          color: 'secondary.main',
                          transform: 'scale(1.1)',
                        },
                        '&:hover': {
                          bgcolor: 'rgba(52, 207, 194, 0.08)',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography 
                      variant="body2"
                      sx={{
                        transition: 'all 0.3s',
                        fontWeight: filters.stops?.includes(option.value) ? 600 : 400,
                      }}
                    >
                      {option.label}
                    </Typography>
                  }
                  sx={{
                    transition: 'all 0.3s',
                    borderRadius: 1,
                    mx: -1,
                    px: 1,
                    '&:hover': {
                      bgcolor: 'rgba(52, 207, 194, 0.04)',
                    },
                  }}
                />
              </Fade>
            ))}
          </FormGroup>
        </Collapse>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Airlines Filter */}
      <Box>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            cursor: 'pointer',
            mb: 2,
            '&:hover': {
              '& .section-icon': {
                color: 'secondary.main',
              },
            },
          }}
          onClick={() => toggleSection('airlines')}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Airlines
          </Typography>
          <IconButton size="small" className="section-icon">
            {expandedSections.airlines ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Collapse in={expandedSections.airlines}>
          <FormGroup sx={{ maxHeight: 300, overflowY: 'auto' }}>
            {availableAirlines.map((airline, index) => (
              <Fade in key={airline.code} timeout={300 + (index * 50)}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.airlines?.includes(airline.code) || false}
                      onChange={() => handleAirlineChange(airline.code)}
                      sx={{
                        color: 'secondary.main',
                        transition: 'all 0.3s',
                        '&.Mui-checked': {
                          color: 'secondary.main',
                          transform: 'scale(1.1)',
                        },
                        '&:hover': {
                          bgcolor: 'rgba(52, 207, 194, 0.08)',
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                      <Typography 
                        variant="body2"
                        sx={{
                          transition: 'all 0.3s',
                          fontWeight: filters.airlines?.includes(airline.code) ? 600 : 400,
                        }}
                      >
                        {airline.name}
                      </Typography>
                      <Chip
                        label={airline.count}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.7rem',
                          bgcolor: filters.airlines?.includes(airline.code) ? 'secondary.main' : 'grey.200',
                          color: filters.airlines?.includes(airline.code) ? 'primary.main' : 'text.secondary',
                          transition: 'all 0.3s',
                        }}
                      />
                    </Box>
                  }
                  sx={{
                    transition: 'all 0.3s',
                    borderRadius: 1,
                    mx: -1,
                    px: 1,
                    '&:hover': {
                      bgcolor: 'rgba(52, 207, 194, 0.04)',
                      transform: 'translateX(4px)',
                    },
                  }}
                />
              </Fade>
            ))}
          </FormGroup>
        </Collapse>
      </Box>
    </Paper>
  );
};

export default Filters;