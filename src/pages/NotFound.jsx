import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h4">Página não encontrada</Typography>
      <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
        Voltar para Home
      </Button>
    </Container>
  );
}
