import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import { Box, Stack } from "@mui/material";
import NavBar from "./components/NavBar";
import UserContext from "./context/user";
import Card from "./components/Card";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    // <Box>
    //   {/* <Card /> */}
    //   <NavBar />
    //   <Stack direction="row" spacing={2} justifyContent="space-between">
    //     <Sidebar />
    //     <Home />
    //   </Stack>
    // </Box>
    <Box>
      {isLoggedIn ? (
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar />
          <Home />
        </Stack>
      ) : (
        <Card setIsLoggedIn={setIsLoggedIn} />
      )}
    </Box>
  );
}

export default App;
