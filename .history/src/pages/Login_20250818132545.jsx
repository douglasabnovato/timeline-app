import { useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      login(user);
      navigate("/dashboard");
    } else {
      alert("Email ou senha incorretos!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth label="Email" margin="normal"
          value={email} onChange={(e) => setEmail(e.target.value)} required
        />
        <TextField
          fullWidth label="Senha" type="password" margin="normal"
          value={password} onChange={(e) => setPassword(e.target.value)} required
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Entrar
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Não tem conta? <Link to="/register">Registrar</Link>
      </Typography>
    </Container>
  );
}
