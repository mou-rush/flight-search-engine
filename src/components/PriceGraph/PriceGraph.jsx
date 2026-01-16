import React, { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  alpha,
  Stack,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const PriceGraph = ({ flights }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [chartType, setChartType] = useState("area");

  const chartData = useMemo(() => {
    if (!flights || flights.length === 0) return [];

    const priceRanges = {
      budget1: { label: "$0-200", min: 0, max: 200, flights: [] },
      budget2: { label: "$200-400", min: 200, max: 400, flights: [] },
      economy1: { label: "$400-600", min: 400, max: 600, flights: [] },
      economy2: { label: "$600-800", min: 600, max: 800, flights: [] },
      premium: { label: "$800-1000", min: 800, max: 1000, flights: [] },
      business: { label: "$1000+", min: 1000, max: Infinity, flights: [] },
    };

    flights.forEach((flight) => {
      const price = flight.price.total;
      if (price < 200) {
        priceRanges.budget1.flights.push(flight);
      } else if (price < 400) {
        priceRanges.budget2.flights.push(flight);
      } else if (price < 600) {
        priceRanges.economy1.flights.push(flight);
      } else if (price < 800) {
        priceRanges.economy2.flights.push(flight);
      } else if (price < 1000) {
        priceRanges.premium.flights.push(flight);
      } else {
        priceRanges.business.flights.push(flight);
      }
    });

    // Transform into chart data
    return Object.entries(priceRanges).map(([_, range]) => ({
      range: range.label,
      count: range.flights.length,
      avgPrice:
        range.flights.length > 0
          ? Math.round(
              range.flights.reduce((sum, f) => sum + f.price.total, 0) /
                range.flights.length
            )
          : 0,
      minPrice:
        range.flights.length > 0
          ? Math.min(...range.flights.map((f) => f.price.total))
          : 0,
      maxPrice:
        range.flights.length > 0
          ? Math.max(...range.flights.map((f) => f.price.total))
          : 0,
    }));
  }, [flights]);

  const priceStats = useMemo(() => {
    if (!flights || flights.length === 0) return null;

    const prices = flights.map((f) => f.price.total);
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
      const data = payload[0].payload;
      return (
        <Paper
          elevation={8}
          sx={{
            p: 2,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(10px)",
            border: `2px solid ${alpha("#34CFC2", 0.3)}`,
            borderRadius: 3,
            minWidth: 160,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              mb: 1.5,
              color: "#213C46",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: "#34CFC2",
              }}
            />
            {data.range}
          </Typography>
          <Stack spacing={0.75}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                Flights:
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "#213C46" }}
              >
                {data.count}
              </Typography>
            </Box>
            {data.avgPrice > 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Average:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#34CFC2" }}
                >
                  ${data.avgPrice}
                </Typography>
              </Box>
            )}
            {data.minPrice > 0 && data.maxPrice > 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="caption" color="text.secondary">
                  Range:
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 500 }}>
                  ${data.minPrice} - ${data.maxPrice}
                </Typography>
              </Box>
            )}
          </Stack>
        </Paper>
      );
    }
    return null;
  };

  const chartTypeOptions = [
    {
      type: "area",
      icon: <StackedLineChartIcon fontSize="small" />,
      label: "Area",
    },
    { type: "line", icon: <ShowChartIcon fontSize="small" />, label: "Line" },
    { type: "bar", icon: <BarChartIcon fontSize="small" />, label: "Bar" },
  ];

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: {
        top: 20,
        right: 20,
        left: 0,
        bottom: 0,
      },
    };

    const axisProps = {
      xAxis: {
        dataKey: "range",
        tick: {
          fill: "#5A6B73",
          fontSize: isMobile ? 10 : 12,
          fontWeight: 500,
        },
        angle: isMobile ? -45 : 0,
        textAnchor: isMobile ? "end" : "middle",
        height: isMobile ? 60 : 30,
        axisLine: { stroke: alpha("#213C46", 0.1) },
        tickLine: { stroke: alpha("#213C46", 0.1) },
      },
      yAxis: {
        tick: { fill: "#5A6B73", fontSize: 12, fontWeight: 500 },
        axisLine: false,
        tickLine: false,
      },
    };

    switch (chartType) {
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={alpha("#34CFC2", 0.08)}
              vertical={false}
            />
            <XAxis {...axisProps.xAxis} />
            <YAxis {...axisProps.yAxis} />
            <RechartsTooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#34CFC2"
              strokeWidth={4}
              dot={{
                fill: "#34CFC2",
                strokeWidth: 3,
                r: 7,
                stroke: "#fff",
              }}
              activeDot={{
                r: 9,
                fill: "#34CFC2",
                stroke: "#213C46",
                strokeWidth: 3,
              }}
            />
          </LineChart>
        );

      case "bar":
        return (
          <BarChart {...commonProps}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34CFC2" stopOpacity={1} />
                <stop offset="100%" stopColor="#2BB8AD" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={alpha("#213C46", 0.08)}
              vertical={false}
            />
            <XAxis {...axisProps.xAxis} />
            <YAxis {...axisProps.yAxis} />
            <RechartsTooltip content={<CustomTooltip />} />
            <Bar
              dataKey="count"
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        );

      default:
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34CFC2" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#34CFC2" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#34CFC2" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={alpha("#213C46", 0.08)}
              vertical={false}
            />
            <XAxis {...axisProps.xAxis} />
            <YAxis {...axisProps.yAxis} />
            <RechartsTooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#34CFC2"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#areaGradient)"
            />
          </AreaChart>
        );
    }
  };

  if (!flights || flights.length === 0) {
    return null;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 4 },

        mb: 3,
        borderRadius: 4,
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        boxShadow: "0 10px 40px -10px rgba(5, 24, 48, 0.12)",
        transition: "all 0.3s ease",
        border: `1px solid ${alpha("#213C46", 0.06)}`,
        "&:hover": {
          boxShadow: "0 20px 60px -15px rgba(5, 24, 48, 0.18)",
        },
      }}
    >
      {/* Header */}
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(135deg, ${alpha(
                "#34CFC2",
                0.15
              )} 0%, ${alpha("#34CFC2", 0.05)} 100%)`,
            }}
          >
            <ShowChartIcon sx={{ color: "#34CFC2", fontSize: 22 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#213C46" }}>
              Price Distribution
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {flights.length} flights analyzed
            </Typography>
          </Box>
        </Box>

        {/* Chart Type Toggle */}
        <Stack direction="row" spacing={0.5}>
          {chartTypeOptions.map((option) => (
            <Tooltip key={option.type} title={option.label} arrow>
              <IconButton
                onClick={() => setChartType(option.type)}
                size="small"
                sx={{
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.75,
                  bgcolor:
                    chartType === option.type
                      ? "#34CFC2"
                      : alpha("#213C46", 0.04),
                  color: chartType === option.type ? "#fff" : "#5A6B73",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor:
                      chartType === option.type
                        ? "#2BB8AD"
                        : alpha("#213C46", 0.08),
                    transform: "scale(1.05)",
                  },
                }}
              >
                {option.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Stack>
      </Box>

      {/* Price Stats */}
      {priceStats && (
        <Stack
          direction="row"
          spacing={{ xs: 2, md: 4 }}
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 3,
            bgcolor: alpha("#213C46", 0.02),
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ minWidth: 100 }}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                Average Price
              </Typography>
              <Tooltip title="Mean price across all flights" arrow>
                <InfoOutlinedIcon
                  sx={{ fontSize: 14, color: "text.disabled" }}
                />
              </Tooltip>
            </Stack>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(135deg, #34CFC2 0%, #213C46 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ${priceStats.average}
            </Typography>
          </Box>

          <Box sx={{ minWidth: 100 }}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <TrendingDownIcon sx={{ fontSize: 16, color: "#22C55E" }} />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                Lowest
              </Typography>
            </Stack>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#22C55E" }}>
              ${priceStats.lowest}
            </Typography>
          </Box>

          <Box sx={{ minWidth: 100 }}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <TrendingUpIcon sx={{ fontSize: 16, color: "#EF4444" }} />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                Highest
              </Typography>
            </Stack>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#EF4444" }}>
              ${priceStats.highest}
            </Typography>
          </Box>
        </Stack>
      )}

      {/* Chart */}
      <Box
        sx={{
          height: isMobile ? 280 : 320,
          width: "100%",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </Box>

      {/* Footer */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          mt: 3,
          pt: 2,
          borderTop: `1px solid ${alpha("#213C46", 0.06)}`,
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Chip
          size="small"
          label="💡 Lower price ranges often have more options"
          sx={{
            bgcolor: alpha("#34CFC2", 0.08),
            color: "#5A6B73",
            fontWeight: 500,
            fontSize: "0.75rem",
          }}
        />
      </Stack>
    </Paper>
  );
};

export default PriceGraph;
