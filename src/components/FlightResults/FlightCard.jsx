
import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Button,
  Divider,
  Avatar,
  Zoom,
  Fade
} from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { formatDuration ,formatTime,formatDate} from '../../utils/dateFormatter';
dayjs.extend(duration);

const FlightCard = ({ flight, dictionaries, isBestPrice, isCheapest, index }) => {


  const getAirlineName = (code) => {
    return dictionaries?.carriers?.[code] || code;
  };

  const getAirlineLogo = (carrierCode) => {
    return `https://images.kiwi.com/airlines/64/${carrierCode}.png`;
  };

  const renderBadges = () => {
    const badges = [];
    
    if (isCheapest) {
      badges.push(
        <Zoom in key="cheapest" style={{ transitionDelay: '100ms' }}>
          <Chip
            icon={<LocalOfferIcon />}
            label="Cheapest"
            size="small"
            sx={{
              bgcolor: '#34CFC2',
              color: '#051830',
              fontWeight: 700,
              '& .MuiChip-icon': {
                color: '#051830',
              },
            }}
          />
        </Zoom>
      );
    }
    
    if (isBestPrice && !isCheapest) {
      badges.push(
        <Zoom in key="best" style={{ transitionDelay: '200ms' }}>
          <Chip
            icon={<EmojiEventsIcon />}
            label="Best Value"
            size="small"
            sx={{
              bgcolor: '#FFD700',
              color: '#051830',
              fontWeight: 700,
              '& .MuiChip-icon': {
                color: '#051830',
              },
            }}
          />
        </Zoom>
      );
    }

    return badges;
  };

  const renderItinerarySummary = (itinerary, isReturn = false) => {
    const firstSegment = itinerary.segments[0];
    const lastSegment = itinerary.segments[itinerary.segments.length - 1];
    const stops = itinerary.segments.length - 1;

    return (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 2, md: 3 },
        flex: 1,
        minWidth: 0,
      }}>
        {/* Departure */}
        <Box sx={{ textAlign: 'left', minWidth: 80 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            {formatTime(firstSegment.departure.at)}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
            {firstSegment.departure.iataCode}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDate(firstSegment.departure.at)}
          </Typography>
        </Box>

        {/* Flight Path */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          minWidth: 220,
        }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            {formatDuration(itinerary.duration)}
          </Typography>
          
          <Box sx={{ 
            width: '100%',
            display: 'flex', 
            alignItems: 'center', 
            position: 'relative',
          }}>
            <Box sx={{ 
              height: 2, 
              flex: 1, 
              bgcolor: 'secondary.main',
              borderRadius: 2,
              position: 'relative',
            }}>
              <FlightIcon sx={{ 
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${isReturn ? '270deg' : '90deg'})`,
                fontSize: 20,
                color: 'secondary.main',
              }} />
            </Box>
          </Box>

          <Chip
            label={stops === 0 ? 'Direct' : `${stops} ${stops === 1 ? 'Stop' : 'Stops'}`}
            size="small"
            color={stops === 0 ? 'secondary' : 'default'}
            sx={{ fontWeight: 600 }}
          />
        </Box>

        {/* Arrival */}
        <Box sx={{ textAlign: 'right', minWidth: 80 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            {formatTime(lastSegment.arrival.at)}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
            {lastSegment.arrival.iataCode}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDate(lastSegment.arrival.at)}
          </Typography>
        </Box>
      </Box>
    );
  };

  const mainCarrierCode = flight.validatingAirlineCodes?.[0] || 
                          flight.itineraries?.[0]?.segments?.[0]?.carrierCode;
  
  const hasReturnFlight = flight.itineraries.length > 1;

  return (
    <Fade in timeout={300 + (index * 100)}>
      <Card 
        sx={{ 
          mb: 2,
          position: 'relative',
          overflow: 'visible',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: isCheapest ? '2px solid #34CFC2' : isBestPrice ? '2px solid #FFD700' : '1px solid',
          borderColor: isCheapest ? '#34CFC2' : isBestPrice ? '#FFD700' : 'divider',
          borderRadius: 2,
          '&:hover': {
            boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)',
            '& .select-button': {
              transform: 'scale(1.05)',
            },
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
          {/* Main Horizontal Layout - Outbound */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: { xs: 2, sm: 3, md: 4 },
            flexWrap: { xs: 'wrap', lg: 'nowrap' },
          }}>
            {/* Left Section: Airline Logo & Badges */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.5,
              minWidth: { xs: '100%', sm: 'auto' },
            }}>
              <Avatar
                src={getAirlineLogo(mainCarrierCode)}
                alt={getAirlineName(mainCarrierCode)}
                sx={{ 
                  width: 56, 
                  height: 56,
                  bgcolor: 'background.paper',
                  border: '2px solid',
                  borderColor: 'divider',
                }}
              />
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', justifyContent: 'center' }}>
                {renderBadges()}
              </Box>
            </Box>

            {/* Middle Section: Flight Details */}
            {renderItinerarySummary(flight.itineraries[0], false)}

            {/* Right Section: Price & Action */}
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 2,
              minWidth: { xs: '100%', sm: 160 },
            }}>
              <Box sx={{ textAlign: 'right' }}>
                <Typography 
                  variant="h3" 
                  color="primary" 
                  sx={{ 
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  ${flight.price.total}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {flight.price.currency}
                </Typography>
              </Box>
              
              <Button 
                className="select-button"
                variant="contained" 
                color="secondary"
                fullWidth
                sx={{ 
                  py: 1.2,
                  color: 'primary.main',
                  fontWeight: 700,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: 'linear-gradient(135deg, #34CFC2 0%, #2bb8ad 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2bb8ad 0%, #249a91 100%)',
                    boxShadow: '0 6px 20px rgba(52, 207, 194, 0.4)',
                  },
                }}
              >
                Select
              </Button>
            </Box>
          </Box>

          {/* Return Flight Summary (if exists) */}
          {hasReturnFlight && (
            <>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 2, md: 3 },
                pl: { xs: 0, sm: 10 },
              }}>
                {renderItinerarySummary(flight.itineraries[1], true)}
              </Box>
            </>
          )}

        </CardContent>
      </Card>
    </Fade>
  );
};

export default FlightCard;