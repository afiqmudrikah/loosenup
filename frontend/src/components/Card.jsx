import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const Card = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <Box
        sx={{ textAlign: "center" }}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography
              variant="h2"
              sx={{ marginTop: "50px", fontFamily: "cursive" }}
            >
              Loosen Up
            </Typography>
            <Typography>{children}</Typography>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ width: "600px", margin: "20px auto" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
          <Tab label="Login" />

          <Tab label="Register" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <LoginPage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RegisterPage handleChange={handleChange} />
      </TabPanel>
    </Box>
  );
};

export default Card;
