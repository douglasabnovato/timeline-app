import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  IconButton,
  alpha,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
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
        position: "relative",
      }}
    >
      {/* Botão Voltar Estratégico */}
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
            bgcolor: alpha("#121212", 0.8), // Transparência elegante
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
            Login
          </Typography>
          <Typography variant="body2" sx={{ color: alpha("#fff", 0.6), mb: 3 }}>
            Acesse sua jornada profissional
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
            noValidate
            sx={{ width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="E-mail"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // 1. Ajuste na Label para evitar sobreposição e erro de cor
              InputLabelProps={{
                style: {
                  color: alpha("#fff", 0.7),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  // 2. Cor do texto digitado
                  color: "#fff",
                  "& fieldset": {
                    borderColor: alpha("#fff", 0.2),
                    borderRadius: "12px", // Bordas mais suaves como na inspiração
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffc107",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffc107",
                  },
                },
                // 3. Garante que a label movida para cima (shrink) fique visível e na cor certa
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#ffc107",
                },
                "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                  backgroundColor: "#121212", // Mesma cor do fundo do Paper para "cortar" a linha
                  padding: "0 8px",
                  marginLeft: "-4px",
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Senha"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{
                style: { color: alpha("#fff", 0.7) },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": {
                    borderColor: alpha("#fff", 0.2),
                    borderRadius: "12px",
                  },
                  "&:hover fieldset": { borderColor: "#ffc107" },
                  "&.Mui-focused fieldset": { borderColor: "#ffc107" },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#ffc107",
                },
                "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                  backgroundColor: "#121212",
                  padding: "0 8px",
                  marginLeft: "-4px",
                },
              }}
            />

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
              Entrar agora
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2" sx={{ color: alpha("#fff", 0.6) }}>
                Novo por aqui?{" "}
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                    color: "#ffc107",
                    fontWeight: "bold",
                  }}
                >
                  Crie sua conta
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
