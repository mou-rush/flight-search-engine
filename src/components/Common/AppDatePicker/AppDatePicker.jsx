import React from "react";
import PropTypes from "prop-types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InsertInvitationRoundedIcon from "@mui/icons-material/InsertInvitationRounded";
import { alpha, useTheme } from "@mui/material/styles";

const AppDatePicker = ({
  label,
  value,
  onChange,
  minDate,
  error,
  helperText,
  inputSx,
  disabled = false,
  icon = InsertInvitationRoundedIcon,
}) => {
  const theme = useTheme();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        minDate={minDate}
        disabled={disabled}
        slots={{
          openPickerIcon: icon,
        }}
        slotProps={{
          textField: {
            fullWidth: true,
            error,
            helperText,
            sx: {
              ...inputSx,
              "& .MuiSvgIcon-root": {
                color: alpha(theme.palette.secondary.main, 0.6),
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default AppDatePicker;

AppDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  minDate: PropTypes.object,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  inputSx: PropTypes.object,
  disabled: PropTypes.bool,
  icon: PropTypes.elementType,
};
