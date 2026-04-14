import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Stack,
  Box,
  useTheme,
  alpha,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CodeIcon from "@mui/icons-material/Code";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        // Fundo profundo e gradiente sutil para criar profundidade
        background: `radial-gradient(circle at 50% 50%, ${alpha("#1a237e", 0.15)} 0%, #0a0a0a 100%)`,
        backgroundColor: "#0a0a0a",
        color: "#fff",
      }}
    >
      {/* Elementos Flutuantes (Representando Fullstack & PM) */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          left: "10%",
          opacity: 0.1,
          filter: "blur(2px)",
          transform: "rotate(-15deg)",
          display: { xs: "none", md: "block" },
        }}
      >
        <CodeIcon sx={{ fontSize: 120 }} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          opacity: 0.1,
          filter: "blur(2px)",
          transform: "rotate(15deg)",
          display: { xs: "none", md: "block" },
        }}
      >
        <TrendingUpIcon sx={{ fontSize: 120 }} />
      </Box>

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center" }}>
          {/* Tag sutil superior */}
          <Typography
            variant="overline"
            sx={{ color: "#ffc107", fontWeight: "bold", letterSpacing: 2 }}
          >
            Software Engineering & Product Management
          </Typography>

          {/* Título de Alto Impacto */}
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 900,
              fontSize: { xs: "3rem", md: "5rem" },
              textTransform: "uppercase",
              lineHeight: 1,
              mb: 3,
              background: "linear-gradient(to bottom, #fff 60%, #999)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Minha Jornada
          </Typography>

          {/* Subtítulo Refinado (Proposta de Valor) */}
          <Typography
            variant="h5"
            sx={{
              color: alpha("#fff", 0.7),
              mb: 6,
              maxWidth: "600px",
              mx: "auto",
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            A fusão entre a <strong>Engenharia de Software Fullstack</strong> e
            a visão estratégica de <strong>Product Manager</strong>. Explore os
            marcos da minha evolução profissional.
          </Typography>

          {/* Botões Inspirados (Com o Amarelo da Empolgação) */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/login"
              sx={{
                px: 6,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: "bold",
                borderRadius: "50px",
                backgroundColor: "#ffc107", // Amarelo Vibrante (McDonald's Style)
                color: "#000",
                "&:hover": {
                  backgroundColor: "#e6af00",
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s ease",
              }}
            >
              ENTRAR
            </Button>

            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/register"
              sx={{
                px: 6,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: "bold",
                borderRadius: "50px",
                borderColor: alpha("#fff", 0.5),
                color: "#fff",
                "&:hover": {
                  borderColor: "#fff",
                  backgroundColor: alpha("#fff", 0.05),
                },
              }}
            >
              CADASTRAR
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
