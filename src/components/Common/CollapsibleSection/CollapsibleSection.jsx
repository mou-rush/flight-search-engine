import React from "react";
import { Box, Typography, IconButton, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PropTypes from "prop-types";

const CollapsibleSection = ({ title, expanded, onToggle, children }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          mb: 2,
          "&:hover .section-icon": {
            color: "secondary.main",
          },
        }}
        onClick={onToggle}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>

        <IconButton size="small" className="section-icon">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>{children}</Collapse>
    </Box>
  );
};
CollapsibleSection.propTypes = {
  title: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default CollapsibleSection;
