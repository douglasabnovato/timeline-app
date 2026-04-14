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
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  // 1. Estados para o formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  // 2. Atualização genérica de campos
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3. Submissão do cadastro
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validação básica de senha no frontend
    if (formData.password !== formData.confirmPassword) {
      return setError("As senhas não coincidem.");
    }

    try {
      // Enviamos apenas os dados necessários para o backend
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "viewer", // Definimos como padrão, o admin criamos manualmente no db.json
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
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
        <Paper elevation={3} sx={{ p: 4, width: "100%", borderRadius: 2 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Criar Conta
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Nome Completo"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="E-mail"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Senha"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Confirmar Senha"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.2 }}
            >
              Registar
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2">
                Já tem uma conta?{" "}
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#1976d2" }}
                >
                  Faça login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
