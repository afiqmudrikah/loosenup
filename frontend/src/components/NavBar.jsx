import { AppBar, styled, Toolbar, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import UserContext from "../context/user";

const NavBar = () => {
  const { setAccessToken } = useContext(UserContext);

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>LoosenUp</Typography>
        <Button color="inherit" onClick={() => setAccessToken("")}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
