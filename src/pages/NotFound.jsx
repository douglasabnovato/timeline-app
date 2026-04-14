import { Container, Typography, Button, Box, alpha } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 50% 50%, #1a237e 0%, #0a0a0a 100%)",
        color: "#fff",
        textAlign: "center",
        px: 3,
      }}
    >
      <Container maxWidth="sm">
        <ErrorOutlineIcon
          sx={{ fontSize: 80, color: "#ffc107", mb: 2, opacity: 0.8 }}
        />

        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "5rem", md: "8rem" },
            lineHeight: 1,
            mb: 2,
            background: "linear-gradient(45deg, #ffc107 30%, #fff 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Caminho não encontrado
        </Typography>

        <Typography variant="body1" sx={{ color: alpha("#fff", 0.6), mb: 4 }}>
          Parece que você se desviou da timeline. Não se preocupe, até os
          melhores marcos as vezes precisam de um novo ponto de partida.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: "50px",
            fontWeight: "bold",
            backgroundColor: "#ffc107",
            color: "#000",
            "&:hover": { backgroundColor: "#e6af00" },
          }}
        >
          Voltar para o Início
        </Button>
      </Container>
    </Box>
  );
}
