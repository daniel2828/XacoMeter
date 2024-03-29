import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signIn } from "../api/users";
import Notification from "./Notification";
import CaminoImage from  "../assets/img/concha.jpg";
import { useTranslation } from "react-i18next";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Xacometer
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

/**
 * Login form component
 * @param {setIsRegister} - Function to switch between register and login
 * @returns LoginForm component
 */
export default function LoginForm({ setIsRegister }) {
  const [responseMessage, setResponseMessage] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const { t } = useTranslation();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const body = {
      email: data.get("email"),
      password: data.get("password"),
    };

    signIn(body)
      .then((res) => {
        localStorage.setItem("ACCESS_TOKEN", res.data.accessToken);
        localStorage.setItem("REFRESH_TOKEN", res.data.refreshToken);
        window.location.href = "/data";
      })
      .catch((err) => {
        setResponseMessage(err.response);
        setAlertOpen(true);
      });
  };
  const handleClose = () => {
    setAlertOpen(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
             <img src={CaminoImage} alt="Logo"  width="50" height="50" />;
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("Xacometer Sign In")}
          </Typography>
          <Notification
            alertOpen={alertOpen}
            handleClose={handleClose}
            status={responseMessage?.status}
            message={responseMessage?.data?.message}
          />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("Email Address")}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("Password")}
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              name="submit"
              data-testid="submit"
            >
              {t("Sign In")}
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  name="changeRegister"
                  onClickCapture={() => setIsRegister(true)}
                  href="#"
                  variant="body2"
                >
                  {t("Don't have an account? Sign Up")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
