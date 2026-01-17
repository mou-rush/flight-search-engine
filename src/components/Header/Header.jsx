import { AppBar, Toolbar, Zoom, Fade, Typography } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: "transparent",
        boxShadow: "none",
        borderBottom: "1px solid rgb(1, 99, 105)",
        mb: 4,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        <Zoom in timeout={500}>
          <FlightIcon sx={{ mr: 1.5, fontSize: 32 }} />
        </Zoom>

        <Fade in timeout={700}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 700,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            MoSkySearch
          </Typography>
        </Fade>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
