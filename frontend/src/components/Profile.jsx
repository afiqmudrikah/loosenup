import {
  Avatar,
  Box,
  Button,
  Card,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/user";

const Profile = () => {
  const { user, accessToken } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [editing, setEditing] = useState(false);

  const getUser = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + `/loosenup/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        id: user.userID,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      if (data.status === "error") {
        alert("Unable to retrieve profile");
      } else {
        setProfile(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setAge(data.age);
      }
    }
  };

  const updateProfile = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + `/loosenup/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        id: profile.userID,
        firstName: firstName,
        lastName: lastName,
        age: age,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      if (data.status === "error") {
        alert("Unable to update profile");
      } else {
        setProfile(data);
        setEditing(false);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setAge(profile.age);
  };

  const handleSaveClick = () => {
    updateProfile();
  };

  return (
    <Box flex={8} padding={2}>
      {profile && (
        <Box>
          <Card sx={{ maxWidth: 600 }}>
            <Avatar />
            {editing ? (
              <>
                <TextField
                  label="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </>
            ) : (
              <>
                <Typography>First name: {profile.firstName}</Typography>
                <Typography>Last name: {profile.lastName}</Typography>
                <Typography>Username: {profile.username}</Typography>
                <Typography>Email: {profile.email}</Typography>
                <Typography>Age: {profile.age}</Typography>
              </>
            )}
            {editing ? (
              <>
                <Button variant="contained" onClick={handleSaveClick}>
                  Save
                </Button>
                <Button variant="contained" onClick={handleCancelClick}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="contained" onClick={handleEditClick}>
                Edit
              </Button>
            )}
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
