import { Avatar, Box, Card, Grid, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import UserContext from "../context/user";

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <Box flex={8} padding={2}>
      <Box>
        <Card sx={{ maxWidth: 600 }}>
          <Avatar />
          <Typography>First name: {user.firstName}</Typography>
          <Typography>Last name: {user.lastName}</Typography>
          <Typography>Username: {user.username}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Age: {user.age}</Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default Profile;
