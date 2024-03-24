import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const Registration = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    user_type: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setErrorMessage("");
    setSuccessMessage("");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      user_type: "user",
    });
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { firstName, lastName, email, password, user_type } = formData;

    if (!firstName || !lastName || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const checkEmailResponse = await fetch(
        `http://localhost:8000/user?email=${email}`
      );
      const existingUserData = await checkEmailResponse.json();
      if (existingUserData && existingUserData.length > 0) {
        setErrorMessage("Email is already registered.");
        return;
      }

      const response = await fetch("http://localhost:8000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          user_type,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register. Please try again later.");
      } else {
        setSuccessMessage("Registered successfully. Redirecting to login...");
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
      >
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <Paper elevation={6}>
            <Box
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                {successMessage && (
                  <Typography variant="body2" color="success">
                    {successMessage}
                  </Typography>
                )}
                {errorMessage && (
                  <Typography variant="body2" color="error">
                    {errorMessage}
                  </Typography>
                )}
                <Link to={"/event-discovery"}>
                  {/* temporary go to event discovery for testing purposes */}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                </Link>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Grid>
    </ThemeProvider>
  );
};

export default Registration;
