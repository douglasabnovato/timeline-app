import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import TimelineComponent from "../components/TimelineComponent";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [adminEvents, setAdminEvents] = useState([]);
  const [sharedEvents, setSharedEvents] = useState([]);
  const [form, setForm] = useState({
    type: "work",
    title: "",
    description: "",
    date: "",
  });

  // 🔹 Carrega eventos salvos ao iniciar ou quando o usuário troca
  useEffect(() => {
    const adminSaved = JSON.parse(localStorage.getItem("events_admin")) || [];
    const sharedSaved = JSON.parse(localStorage.getItem("events_shared")) || [];
    setAdminEvents(adminSaved);
    setSharedEvents(sharedSaved);
  }, [currentUser]);

  // 🔹 Salva eventos do admin no localStorage
  useEffect(() => {
    localStorage.setItem("events_admin", JSON.stringify(adminEvents));
  }, [adminEvents]);

  // 🔹 Salva eventos compartilhados no localStorage
  useEffect(() => {
    localStorage.setItem("events_shared", JSON.stringify(sharedEvents));
  }, [sharedEvents]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEvent = { ...form, id: Date.now() };
    setAdminEvents([...adminEvents, newEvent]);
    setForm({ type: "work", title: "", description: "", date: "" });
  };

  // 🔹 Publicar ou remover evento compartilhado
  const togglePublishToClients = (event) => {
    const alreadyShared = sharedEvents.find((ev) => ev.id === event.id);

    if (alreadyShared) {
      // Remover
      setSharedEvents(sharedEvents.filter((ev) => ev.id !== event.id));
    } else {
      // Adicionar
      setSharedEvents([...sharedEvents, { ...event }]);
    }
  };

  // 🔹 Verifica se evento está publicado
  const isPublished = (eventId) => sharedEvents.some((ev) => ev.id === eventId);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Bem-vindo, {currentUser?.name}
      </Typography>

      {currentUser?.role === "admin" ? (
        <>
          {/* 🔹 Formulário de adicionar evento */}
          <Typography variant="h6" gutterBottom>
            Adicionar Evento (Admin)
          </Typography>
          <Box
            component="form"
            onSubmit={handleAddEvent}
            sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}
          >
            <TextField
              select
              label="Tipo"
              name="type"
              value={form.type}
              onChange={handleChange}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="work">Trabalho</MenuItem>
              <MenuItem value="course">Curso</MenuItem>
              <MenuItem value="event">Evento</MenuItem>
            </TextField>
            <TextField
              label="Título"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <TextField
              label="Descrição"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
            <TextField
              label="Ano"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              sx={{ width: 100 }}
            />
            <Button type="submit" variant="contained">
              Adicionar
            </Button>
          </Box>

          {/* 🔹 Timeline do Admin */}
          <Typography variant="h6" gutterBottom>
            Minha Timeline (Admin)
          </Typography>
          <TimelineComponent events={adminEvents} />

          {/* 🔹 Botões de publicação */}
          <Typography variant="h6" sx={{ mt: 3 }}>
            Publicar Eventos para Clientes
          </Typography>
          {adminEvents.map((ev) => (
            <Button
              key={ev.id}
              sx={{ mr: 1, mt: 1 }}
              variant={isPublished(ev.id) ? "contained" : "outlined"}
              color={isPublished(ev.id) ? "success" : "primary"}
              onClick={() => togglePublishToClients(ev)}
            >
              {isPublished(ev.id) ? "Publicado: " : "Publicar: "} {ev.title}
            </Button>
          ))}
        </>
      ) : (
        <>
          {/* 🔹 Timeline do Cliente */}
          <Typography variant="h6" gutterBottom>
            Timeline Compartilhada (Somente Visualização)
          </Typography>
          <TimelineComponent events={sharedEvents} />
        </>
      )}

      {/* 🔹 Botão Sair */}
      <Button variant="outlined" color="error" onClick={logout} sx={{ mt: 3 }}>
        Sair
      </Button>
    </Container>
  );
}
