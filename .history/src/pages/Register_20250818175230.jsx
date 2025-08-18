import { useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { storageService } from "../utils/storageService";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "douglasabnovato.developer@gmail.com") {
      alert("Esse email é reservado para o administrador.");
      return;
    }

    const users = storageService.get("users") || [];
    if (users.find((u) => u.email === email)) {
      alert("Email já cadastrado!");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: "viewer"
    };

    register(newUser);
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Registrar</Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          fullWidth label="Nome" margin="normal" 
          value={name} onChange={(e) => setName(e.target.value)} required
        />
        <TextField 
          fullWidth label="Email" margin="normal" 
          value={email} onChange={(e) => setEmail(e.target.value)} required
        />
        <TextField 
          fullWidth label="Senha" type="password" margin="normal" 
          value={password} onChange={(e) => setPassword(e.target.value)} required
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Registrar
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Já tem conta? <Link to="/login">Login</Link>
      </Typography>
    </Container>
  );
}
