import React, { useEffect, useState } from "react";
import {
  Paper,
  Box,
  TextField,
  Stack,
  Typography,
  Divider,
  Button,
  Avatar,
  Collapse,
  Alert,
  IconButton,
  Container,
} from "@mui/material";
import { Add, Close, Lock, Login } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { signUp, logIn } from "../API/UserAuth";
import { display } from "@mui/system";

const Home = () => {
  const [Cred, setCred] = useState({
    log_email: "",
    log_password: "",
    first_name: "",
    last_name: "",
    sig_email: "",
    sig_password: "",
    isError: false,
    errorMessage: "",
    isRedirect: false,
  });

  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/profile")
    }
  },[])

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCred({
      ...Cred,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (type) => {
    let response;
    if (type == "signup") {
      response = await signUp(
        Cred.first_name,
        Cred.last_name,
        Cred.sig_email,
        Cred.sig_password
      );
    } else {
      response = await logIn(Cred.log_email, Cred.log_password);
    }
    if (response.success) {
      localStorage.setItem("token", response.token);
      navigate(`/profile`);
    }
    setCred({
      log_email: "",
      log_password: "",
      first_name: "",
      last_name: "",
      sig_email: "",
      sig_password: "",
      isError: !response.success ? true : false,
      errorMessage: !response.success ? response.message : "",
    });
  };
  
  return (
    <>
      <Container fixed sx={{
        height:"90vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}>
        <Paper
          elevation={3}
          sx={{
            width: "600px",
            padding: "1.5rem",
            position: "relative",
          }}
        >
          <Collapse in={Cred.isError}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  size="small"
                  onClick={() => {
                    setCred({ ...Cred, isError: false });
                  }}
                >
                  <Close />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {Cred.errorMessage}
            </Alert>
          </Collapse>
          <Avatar
            sx={{
              position: "absolute",
              top: "0%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <Lock color="warning" />
          </Avatar>
          <Stack
            spacing={2}
            direction="row"
            width="100%"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Box width="50%">
              <Typography variant="h4" align="center" gutterBottom>
                Sign up
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <Stack direction="row" gap="10px">
                  <TextField
                    label="First name"
                    required
                    variant="filled"
                    name="first_name"
                    type="text"
                    value={Cred.first_name}
                    onChange={handleChange}
                  ></TextField>
                  <TextField
                    label="Last name"
                    required
                    variant="filled"
                    name="last_name"
                    type="text"
                    value={Cred.last_name}
                    onChange={handleChange}
                  ></TextField>
                </Stack>
                <Stack direction="row" gap="10px">
                  <TextField
                    label="Email"
                    required
                    variant="filled"
                    type="email"
                    name="sig_email"
                    value={Cred.sig_email}
                    onChange={handleChange}
                  ></TextField>
                  <TextField
                    label="Password"
                    required
                    variant="filled"
                    type="password"
                    name="sig_password"
                    value={Cred.sig_password}
                    onChange={handleChange}
                  ></TextField>
                </Stack>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<Login />}
                  onClick={() => {
                    handleSubmit("signup");
                  }}
                >
                  Sign up
                </Button>
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box width="40%">
              <Typography variant="h4" align="center" gutterBottom>
                Log in
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <TextField
                  label="Email"
                  required
                  variant="filled"
                  type="email"
                  name="log_email"
                  value={Cred.log_email}
                  onChange={handleChange}
                ></TextField>
                <TextField
                  label="Password"
                  required
                  variant="filled"
                  type="password"
                  name="log_password"
                  value={Cred.log_password}
                  onChange={handleChange}
                ></TextField>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<Add />}
                  onClick={() => {
                    handleSubmit("login");
                  }}
                >
                  Log in
                </Button>
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default Home;
