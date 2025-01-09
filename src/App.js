import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Slider,
  Typography,
  Button,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { ContentCopy as CopyIcon } from "@mui/icons-material";

const App = () => {
  const [passwordLength, setPasswordLength] = useState(8);
  const [password, setPassword] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);

  const generatePassword = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setIsToastOpen(true); 
  };

  const handleToastClose = () => {
    setIsToastOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
        boxSizing: "border-box",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          backgroundColor: "#fff",
          borderRadius: 2,
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Password Generator
        </Typography>
        <Typography variant="body1" gutterBottom>
          Select password length and click "Generate"
        </Typography>
        <Box sx={{ my: 3 }}>
          <Typography gutterBottom>Password Length: {passwordLength}</Typography>
          <Slider
            value={passwordLength}
            onChange={(e, value) => setPasswordLength(value)}
            min={4}
            max={32}
            valueLabelDisplay="auto"
            sx={{
              '& .MuiSlider-thumb': {
                transition: 'transform 0.3s ease-in-out',
                ':hover': { transform: 'scale(1.2)' },
              },
            }}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={generatePassword}
          sx={{
            marginBottom: 2,
            width: "100%",
            fontSize: { xs: "0.9rem", sm: "1rem" }, 
          }}
        >
          Generate Password
        </Button>
        <Grid
          container
          alignItems="center"
          spacing={1}
          sx={{ display: "flex", marginTop: 2 }}
        >
          <Grid item xs={10}>
            <TextField
              value={password}
              fullWidth
              disabled
              placeholder="Generated password will appear here"
              sx={{
                fontSize: { xs: "0.8rem", sm: "1rem" }, 
              }}
            />
          </Grid>
          <Grid item xs={2}>
            {password && (
              <IconButton
                color="primary"
                onClick={copyToClipboard}
                sx={{
                  ':hover': { backgroundColor: "#e0f7fa" },
                }}
              >
                <CopyIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Paper>

      {/* Snackbar for Toast Notification */}
      <Snackbar
        open={isToastOpen}
        autoHideDuration={2000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleToastClose} severity="success" sx={{ width: "100%" }}>
          Password Copied!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App;
