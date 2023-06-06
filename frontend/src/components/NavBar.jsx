import { AppBar, styled, Toolbar, Typography } from "@mui/material";
import React from "react";

const NavBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>LoosenUp</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
