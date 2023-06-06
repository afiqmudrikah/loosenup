import React, { useState, useContext } from "react";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Feed from "./components/Feed";
import Sidebar from "./components/Sidebar";
import { Box, Stack } from "@mui/material";
import NavBar from "./components/NavBar";
import UserContext from "./context/user";
import Card from "./components/Card";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Box>
        {JSON.stringify(user)}
        {isLoggedIn ? (
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar />
            <Feed />
          </Stack>
        ) : (
          <Card setIsLoggedIn={setIsLoggedIn} />
        )}
      </Box>
    </UserContext.Provider>
  );
}

export default App;

// <Box>
//   <UserContext.Provider>
//     <NavBar />
//     <Stack direction="row" spacing={2} justifyContent="space-between">
//       <Sidebar />
//       <Feed />
//     </Stack>
//   </UserContext.Provider>
// </Box>
