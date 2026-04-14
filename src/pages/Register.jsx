import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  Grid,
  IconButton,
  alpha,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("As senhas não coincidem.");
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "viewer",
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  // Estilo reutilizável para os TextFields (Correção das Labels)
  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      "& fieldset": {
        borderColor: alpha("#fff", 0.2),
        borderRadius: "12px",
      },
      "&:hover fieldset": { borderColor: "#ffc107" },
      "&.Mui-focused fieldset": { borderColor: "#ffc107" },
    },
    "& .MuiInputLabel-root": { color: alpha("#fff", 0.7) },
    "& .MuiInputLabel-root.Mui-focused": { color: "#ffc107" },
    "& .MuiInputLabel-root.MuiInputLabel-shrink": {
      backgroundColor: "#161616", // Ajustado para o fundo do Paper
      padding: "0 8px",
      marginLeft: "-4px",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 50% 50%, #1a237e 0%, #0a0a0a 100%)",
        backgroundColor: "#0a0a0a",
        py: 4,
      }}
    >
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "#fff",
          backgroundColor: alpha("#fff", 0.1),
          "&:hover": { backgroundColor: alpha("#fff", 0.2) },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Container component="main" maxWidth="xs">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 4,
            bgcolor: alpha("#121212", 0.8),
            backdropFilter: "blur(10px)",
            border: `1px solid ${alpha("#fff", 0.1)}`,
            color: "#fff",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontWeight: 800, mb: 1 }}
          >
            Criar Conta
          </Typography>
          <Typography variant="body2" sx={{ color: alpha("#fff", 0.6), mb: 3 }}>
            Comece a mapear seu sucesso
          </Typography>

          {error && (
            <Alert
              severity="error"
              variant="filled"
              sx={{ mb: 2, width: "100%" }}
            >
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome Completo"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  sx={textFieldStyle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="E-mail"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  sx={textFieldStyle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Senha"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  sx={textFieldStyle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirmar Senha"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  sx={textFieldStyle}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                mb: 2,
                py: 1.5,
                fontWeight: "bold",
                backgroundColor: "#ffc107",
                color: "#000",
                borderRadius: "50px",
                "&:hover": { backgroundColor: "#e6af00" },
              }}
            >
              Registrar agora
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2" sx={{ color: alpha("#fff", 0.6) }}>
                Já tem uma conta?{" "}
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "#ffc107",
                    fontWeight: "bold",
                  }}
                >
                  Faça login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
