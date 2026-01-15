
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Paper,
  Grid,
} from '@mui/material';

export const FlightCardSkeleton = () => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ p: 3 }}>
        {/* Header with badges and price */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rounded" width={80} height={24} />
            <Skeleton variant="rounded" width={100} height={24} />
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Skeleton variant="text" width={100} height={48} />
            <Skeleton variant="text" width={40} height={20} />
          </Box>
        </Box>

        {/* Flight segment */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width={60} height={32} />
            <Skeleton variant="text" width={40} height={24} />
            <Skeleton variant="text" width={50} height={20} />
          </Box>
          <Box sx={{ flex: 2, textAlign: 'center', px: 2 }}>
            <Skeleton variant="text" width={60} height={20} sx={{ mx: 'auto', mb: 1 }} />
            <Skeleton variant="text" width={120} height={2} sx={{ mx: 'auto', mb: 1 }} />
            <Skeleton variant="text" width={100} height={20} sx={{ mx: 'auto' }} />
          </Box>
          <Box sx={{ flex: 1, textAlign: 'right' }}>
            <Skeleton variant="text" width={60} height={32} sx={{ ml: 'auto' }} />
            <Skeleton variant="text" width={40} height={24} sx={{ ml: 'auto' }} />
            <Skeleton variant="text" width={50} height={20} sx={{ ml: 'auto' }} />
          </Box>
        </Box>

        {/* Button */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Skeleton variant="rounded" width={150} height={42} />
        </Box>
      </CardContent>
    </Card>
  );
};

export const FlightResultsSkeleton = ({ count = 5 }) => {
  return (
    <Box>
      {/* Results count skeleton */}
      <Skeleton variant="text" width={200} height={32} sx={{ mb: 3 }} />
      
      {/* Flight cards */}
      {Array.from({ length: count }).map((_, index) => (
        <FlightCardSkeleton key={index} />
      ))}
    </Box>
  );
};

export const FiltersSkeleton = () => {
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Skeleton variant="text" width={120} height={32} />
      </Box>

      {/* Price Range */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={100} height={24} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={4} sx={{ mb: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton variant="text" width={40} height={20} />
          <Skeleton variant="text" width={40} height={20} />
        </Box>
      </Box>

      {/* Stops */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={120} height={24} sx={{ mb: 2 }} />
        {[1, 2, 3].map((i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Skeleton variant="rectangular" width={20} height={20} sx={{ mr: 2 }} />
            <Skeleton variant="text" width={100} height={24} />
          </Box>
        ))}
      </Box>

      {/* Airlines */}
      <Box>
        <Skeleton variant="text" width={80} height={24} sx={{ mb: 2 }} />
        {[1, 2, 3, 4, 5].map((i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Skeleton variant="rectangular" width={20} height={20} sx={{ mr: 2 }} />
            <Skeleton variant="text" width={150} height={24} />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export const PriceGraphSkeleton = () => {
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      {/* Header */}
      <Skeleton variant="text" width={200} height={32} sx={{ mb: 2 }} />
      
      {/* Stats */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        {[1, 2, 3].map((i) => (
          <Box key={i}>
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={80} height={32} />
          </Box>
        ))}
      </Box>

      {/* Graph */}
      <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 1 }} />
      
      {/* Caption */}
      <Skeleton variant="text" width="80%" height={20} sx={{ mx: 'auto', mt: 2 }} />
    </Paper>
  );
};

export const SearchFormSkeleton = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #213C46 0%, #051830 100%)',
        py: 6,
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          mx: 'auto',
          maxWidth: 1200,
          width: '100%',
        }}
      >
        <Skeleton variant="text" width={300} height={48} sx={{ mb: 3 }} />
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Skeleton variant="rounded" width={120} height={40} />
          <Skeleton variant="rounded" width={120} height={40} />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rounded" width="100%" height={56} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rounded" width="100%" height={56} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton variant="rounded" width="100%" height={56} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton variant="rounded" width="100%" height={56} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton variant="rounded" width="100%" height={56} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton variant="rounded" width="100%" height={56} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rounded" width="100%" height={56} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
