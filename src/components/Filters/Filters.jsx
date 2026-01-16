import React from "react";
import { Paper, Divider } from "@mui/material";

import FilterHeader from "./FilterHeader";
import FilterSection from "../Common/CollapsibleSection/CollapsibleSection";
import PriceRangeFilter from "./PriceRangeFilter";
import StopsFilter from "./StopsFilter";
import AirlinesFilter from "./AirlinesFilter";

import { filterContainerStyles } from "./styles";

const Filters = ({
  filters,
  onFilterChange,
  priceRange,
  availableAirlines,
  activeFiltersCount,
}) => {
  const [expanded, setExpanded] = React.useState({
    price: true,
    stops: true,
    airlines: true,
  });

  const toggle = (section) =>
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));

  return (
    <Paper elevation={2} sx={filterContainerStyles}>
      <FilterHeader
        activeFiltersCount={activeFiltersCount}
        onReset={() => onFilterChange("reset")}
      />

      <FilterSection
        title="Price Range"
        expanded={expanded.price}
        onToggle={() => toggle("price")}
      >
        <PriceRangeFilter
          value={filters.priceRange}
          range={priceRange}
          onChange={(val) => onFilterChange("priceRange", val)}
        />
      </FilterSection>

      <Divider sx={{ my: 3 }} />

      <FilterSection
        title="Number of Stops"
        expanded={expanded.stops}
        onToggle={() => toggle("stops")}
      >
        <StopsFilter
          selected={filters.stops}
          onChange={(val) => onFilterChange("stops", val)}
        />
      </FilterSection>

      <Divider sx={{ my: 3 }} />

      <FilterSection
        title="Airlines"
        expanded={expanded.airlines}
        onToggle={() => toggle("airlines")}
      >
        <AirlinesFilter
          airlines={availableAirlines}
          selected={filters.airlines}
          onChange={(val) => onFilterChange("airlines", val)}
        />
      </FilterSection>
    </Paper>
  );
};

export default Filters;
