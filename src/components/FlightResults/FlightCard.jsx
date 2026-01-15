
import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { formatDuration ,formatTime,formatDate} from '../../utils/dateFormatter';
dayjs.extend(duration);

const FlightCard = ({ flight, dictionaries }) => {

 
  const getAirlineName = (code) => {
    return dictionaries?.carriers?.[code] || code;
  };
  

  const renderSegment = (segment, isLast) => (
    <Box key={segment.number} sx={{ mb: isLast ? 0 : 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {formatTime(segment.departure.at)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {segment.departure.iataCode}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDate(segment.departure.at)}
          </Typography>
        </Box>

        <Box sx={{ flex: 2, textAlign: 'center', px: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            {formatDuration(segment.duration)}
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            my: 1,
          }}>
            <Box sx={{ 
              height: 2, 
              flex: 1, 
              bgcolor: 'secondary.main',
              position: 'relative',
            }}>
              <FlightIcon sx={{ 
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(90deg)',
                fontSize: 20,
                color: 'secondary.main',
              }} />
            </Box>
          </Box>
          <Typography variant="caption" sx={{ display: 'block' }}>
            {getAirlineName(segment.carrierCode)} {segment.number}
          </Typography>
        </Box>

        <Box sx={{ flex: 1, textAlign: 'right' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {formatTime(segment.arrival.at)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {segment.arrival.iataCode}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDate(segment.arrival.at)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Card 
      sx={{ 
        mb: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip
              label={
                flight.numberOfStops === 0 
                  ? 'Direct' 
                  : `${flight.numberOfStops} ${flight.numberOfStops === 1 ? 'Stop' : 'Stops'}`
              }
              size="small"
              color={flight.numberOfStops === 0 ? 'secondary' : 'default'}
            />
            <Chip
              icon={<AccessTimeIcon />}
              label={formatDuration(flight.itineraries[0].duration)}
              size="small"
              variant="outlined"
            />
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
              ${flight.price.total}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {flight.price.currency}
            </Typography>
          </Box>
        </Box>

        {flight.itineraries.map((itinerary, idx) => (
          <Box key={idx}>
            {idx > 0 && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                  Return Flight
                </Typography>
              </>
            )}
            {itinerary.segments.map((segment, segIdx) => 
              renderSegment(segment, segIdx === itinerary.segments.length - 1)
            )}
          </Box>
        ))}

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            color="secondary"
            sx={{ 
              px: 4,
              color: 'primary.main',
              fontWeight: 700,
            }}
          >
            Select Flight
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};



export default FlightCard;