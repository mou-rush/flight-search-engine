
import React, { useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const PriceGraph = ({ flights }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const chartData = useMemo(() => {
    if (!flights || flights.length === 0) return [];

    const priceRanges = {
      budget: { label: '$0-300', min: 0, max: 300, flights: [] },
      economy: { label: '$300-600', min: 300, max: 600, flights: [] },
      premium: { label: '$600-1000', min: 600, max: 1000, flights: [] },
      business: { label: '$1000+', min: 1000, max: Infinity, flights: [] },
    };

    flights.forEach(flight => {
      const price = flight.price.total;
      if (price <= 300) priceRanges.budget.flights.push(flight);
      else if (price <= 600) priceRanges.economy.flights.push(flight);
      else if (price <= 1000) priceRanges.premium.flights.push(flight);
      else priceRanges.business.flights.push(flight);
    });

    return Object.entries(priceRanges).map(([key, range]) => ({
      range: range.label,
      count: range.flights.length,
      avgPrice: range.flights.length > 0
        ? Math.round(
            range.flights.reduce((sum, f) => sum + f.price.total, 0) / range.flights.length
          )
        : 0,
      minPrice: range.flights.length > 0
        ? Math.min(...range.flights.map(f => f.price.total))
        : 0,
      maxPrice: range.flights.length > 0
        ? Math.max(...range.flights.map(f => f.price.total))
        : 0,
    })).filter(d => d.count > 0);
  }, [flights]);

  const priceStats = useMemo(() => {
    if (!flights || flights.length === 0) return null;

    const prices = flights.map(f => f.price.total);
    const avg = prices.reduce((sum, p) => sum + p, 0) / prices.length;
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return {
      average: Math.round(avg),
      lowest: Math.round(min),
      highest: Math.round(max),
    };
  }, [flights]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          elevation={3}
          sx={{
            p: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: `2px solid ${theme.palette.secondary.main}`,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
            {payload[0].payload.range}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Available: {payload[0].payload.count} flights
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Avg Price: ${payload[0].payload.avgPrice}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            Range: ${payload[0].payload.minPrice} - ${payload[0].payload.maxPrice}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  if (!flights || flights.length === 0) {
    return null;
  }

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Price Distribution
        </Typography>
        
        {priceStats && (
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Average Price
              </Typography>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                ${priceStats.average}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingDownIcon fontSize="small" color="success" />
                Lowest Price
              </Typography>
              <Typography variant="h6" color="success.main" sx={{ fontWeight: 700 }}>
                ${priceStats.lowest}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingUpIcon fontSize="small" color="error" />
                Highest Price
              </Typography>
              <Typography variant="h6" color="error.main" sx={{ fontWeight: 700 }}>
                ${priceStats.highest}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={theme.palette.secondary.main} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={theme.palette.secondary.main} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis 
            dataKey="range" 
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
          />
          <YAxis 
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            label={{ 
              value: 'Flights', 
              angle: -90, 
              position: 'insideLeft',
              style: { fill: theme.palette.text.secondary }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="count"
            stroke={theme.palette.secondary.main}
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>

      <Typography 
        variant="caption" 
        color="text.secondary" 
        sx={{ display: 'block', mt: 2, textAlign: 'center' }}
      >
        Distribution of available flights across price ranges
      </Typography>
    </Paper>
  );
};

export default PriceGraph;