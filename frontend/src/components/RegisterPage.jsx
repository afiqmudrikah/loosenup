import React, { useState } from "react";
import { Box, Button, Container, TextField } from "@mui/material";

const RegisterPage = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(
      import.meta.env.VITE_SERVER + `/loosenup/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
          age: age,
        }),
      }
    );

    if (res.status === 200) {
      alert("Account registered, you can proceed to login");
      console.log("Registered user");
    } else {
      alert("An error has occured");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ marginTop: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            type="username"
            id="username"
            onChange={(event) => setUsername(event.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="First Name"
            type="firstName"
            id="firstName"
            onChange={(event) => setFirstName(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            type="lastName"
            id="lastName"
            onChange={(event) => setLastName(event.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            name="age"
            label="Age"
            type="age"
            id="age"
            onChange={(event) => setAge(event.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 3, marginBottom: 2 }}
            // onClick={() => props.handleChange("event", 0)}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
