import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Bem-vindo ao Timeline App
      </Typography>
      <Button component={Link} to="/login" variant="contained" sx={{ m: 1 }}>
        Login
      </Button>
      <Button component={Link} to="/register" variant="outlined" sx={{ m: 1 }}>
        Registrar
      </Button>
    </Container>
  );
}
