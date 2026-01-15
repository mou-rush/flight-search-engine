
import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import FlightCard from './FlightCard';
import { FlightResultsSkeleton } from '../Common/SkeletonLoaders';

export const FlightResults = ({ flights, dictionaries, loading, error }) => {
  
  const flightMetrics = useMemo(() => {
    if (!flights || flights.length === 0) return null;

    const prices = flights.map(f => f.price.total);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    const cheapestFlight = flights.find(f => f.price.total === minPrice);

    const flightsWithScores = flights.map(flight => {
      const priceScore = 1 - ((flight.price.total - minPrice) / (maxPrice - minPrice || 1));
      const stopsScore = flight.numberOfStops === 0 ? 1 : flight.numberOfStops === 1 ? 0.7 : 0.4;
      const totalScore = (priceScore * 0.7) + (stopsScore * 0.3);
      
      return {
        ...flight,
        score: totalScore,
      };
    });

    const bestValueFlights = flightsWithScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(f => f.id);

    return {
      cheapestFlightId: cheapestFlight?.id,
      bestValueFlightIds: bestValueFlights,
    };
  }, [flights]);

  if (loading) {
    return (
      <Box sx={{ width: '100%', py: 4 }}>
        <FlightResultsSkeleton count={5} />
      </Box>
    );
  }



  if (!flights || flights.length === 0) {
    return (
      <Box sx={{ width: '100%', textAlign: 'center', py: 8 }}>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your search criteria or dates
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', py: 4 }}>
      {/* Header with badges */}
      <Box sx={{ 
        mb: 3, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: 2,
      }}>
        
        {flightMetrics && (
          <Box sx={{ 
            display: 'flex', 
            gap: 1.5, 
            flexWrap: 'wrap',
            justifyContent: { xs: 'flex-start', sm: 'flex-end' },
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              bgcolor: 'rgba(52, 207, 194, 0.1)',
              px: 2.5,
              py: 1,
              borderRadius: 3,
              border: '1px solid rgba(52, 207, 194, 0.3)',
            }}>
              <Box sx={{ 
                width: 10, 
                height: 10, 
                borderRadius: '50%', 
                bgcolor: '#34CFC2' 
              }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Cheapest Option
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              bgcolor: 'rgba(255, 215, 0, 0.1)',
              px: 2.5,
              py: 1,
              borderRadius: 3,
              border: '1px solid rgba(255, 215, 0, 0.3)',
            }}>
              <Box sx={{ 
                width: 10, 
                height: 10, 
                borderRadius: '50%', 
                bgcolor: '#FFD700' 
              }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Best Value
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* Flight Cards */}
      <Box>
        {flights.map((flight, index) => {
          const isCheapest = flightMetrics?.cheapestFlightId === flight.id;
          const isBestPrice = !isCheapest && flightMetrics?.bestValueFlightIds?.includes(flight.id);

          return (
            <FlightCard 
              key={flight.id} 
              flight={flight} 
              dictionaries={dictionaries}
              isBestPrice={isBestPrice}
              isCheapest={isCheapest}
              index={index}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default FlightResults;