
import React from 'react';
import {
  
  Box,
  Typography,
  
} from '@mui/material';
import FlightCard from './FlightCard';

export const FlightResults = ({ flights, dictionaries, loading, error }) => {
  
  
    if (loading) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Searching for flights...
          </Typography>
        </Box>
      );
    }
  
    if (error) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      );
    }
  
    if (!flights || flights.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No flights found. Try adjusting your search criteria.
          </Typography>
        </Box>
      );
    }
  
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 3 }}>
          {flights.length} flights found
        </Typography>
        {flights.map((flight) => (
          <FlightCard 
            key={flight.id} 
            flight={flight} 
            dictionaries={dictionaries}
          />
        ))}
      </Box>
    );
  };