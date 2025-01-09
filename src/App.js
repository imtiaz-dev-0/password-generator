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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { ContentCopy as CopyIcon } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [passwordLength, setPasswordLength] = useState(8);
  const [password, setPassword] = useState("");
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeChars, setIncludeChars] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);

  const generatePassword = () => {
    if (!includeNumbers && !includeChars && !includeSpecial) {
      toast.error("Please select at least one option!");
      return;
    }

    let characters = "";
    if (includeChars) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) characters += "0123456789";
    if (includeSpecial) characters += "!@#$%^&*()";

    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPassword(newPassword);
    toast.success("Password generated!");
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast.success("Password copied to clipboard!");
    }
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
      {/* Toast Notifications */}
      <Toaster position="bottom-center" reverseOrder={false} />

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
          Customize your password and click "Generate"
        </Typography>

        {/* Password Length Slider */}
        <Box sx={{ my: 3 }}>
          <Typography gutterBottom>Password Length: {passwordLength}</Typography>
          <Slider
            value={passwordLength}
            onChange={(e, value) => setPasswordLength(value)}
            min={4}
            max={32}
            valueLabelDisplay="auto"
          />
        </Box>

        {/* Options for Numbers, Characters, Special Characters */}
        <Box sx={{ textAlign: "left", mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                color="primary"
              />
            }
            label="Include Numbers"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={includeChars}
                onChange={(e) => setIncludeChars(e.target.checked)}
                color="primary"
              />
            }
            label="Include Letters"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={includeSpecial}
                onChange={(e) => setIncludeSpecial(e.target.checked)}
                color="primary"
              />
            }
            label="Include Special Characters"
          />
        </Box>

        {/* Generate Password Button */}
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

        {/* Password Field and Copy Button */}
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
            />
          </Grid>
          <Grid item xs={2}>
            {password && (
              <IconButton color="primary" onClick={copyToClipboard}>
                <CopyIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default App;
