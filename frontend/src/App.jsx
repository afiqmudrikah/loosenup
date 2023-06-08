import React, { useState, useContext } from "react";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Feed from "./components/Feed";
import Sidebar from "./components/Sidebar";
import { Box, Stack } from "@mui/material";
import NavBar from "./components/NavBar";
import UserContext from "./context/user";
import Card from "./components/Card";
import Profile from "./components/Profile";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState(null);
  const [isModerator, setIsModerator] = useState("");

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        isModerator,
        setIsModerator,
      }}
    >
      {accessToken.length > 0 ? (
        <Router>
          <Box>
            <NavBar />
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Sidebar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/feed" element={<Feed />} />
              </Routes>
            </Stack>
          </Box>
        </Router>
      ) : (
        <Card />
      )}
    </UserContext.Provider>
  );
}

export default App;
