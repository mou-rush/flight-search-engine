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
import {
  ShowChart,
  BarChart as BarChatIcon,
  StackedLineChart,
} from "@mui/icons-material";
import {
  getPriceRanges,
  calculatePriceStats,
} from "../../utils/priceGraphUtils";
import ChartTypeToggle from "./ChartTypeToggle";
import PriceTooltip from "./PriceTooltip";
import PriceStats from "./PriceStats";

const PriceGraph = ({ flights }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [chartType, setChartType] = useState("area");

  const chartData = useMemo(() => getPriceRanges(flights), [flights]);
  const priceStats = useMemo(() => calculatePriceStats(flights), [flights]);

  const chartTypeOptions = [
    {
      type: "area",
      icon: <StackedLineChart fontSize="small" />,
      label: "Area",
    },
    { type: "line", icon: <ShowChart fontSize="small" />, label: "Line" },
    { type: "bar", icon: <BarChatIcon fontSize="small" />, label: "Bar" },
  ];

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 20, right: 20, left: 0, bottom: 0 },
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
            <RechartsTooltip content={<PriceTooltip />} />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#34CFC2"
              strokeWidth={4}
              dot={{ fill: "#34CFC2", strokeWidth: 3, r: 7, stroke: "#fff" }}
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
            <RechartsTooltip content={<PriceTooltip />} />
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
            <RechartsTooltip content={<PriceTooltip />} />
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

  if (!flights || flights.length === 0) return null;

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
            <ShowChart sx={{ color: "#34CFC2", fontSize: 22 }} />
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
        <ChartTypeToggle
          chartType={chartType}
          setChartType={setChartType}
          options={chartTypeOptions}
        />
      </Box>

      {/* Price Stats */}
      {priceStats && <PriceStats stats={priceStats} />}

      {/* Chart */}
      <Box sx={{ height: isMobile ? 280 : 320, width: "100%" }}>
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
