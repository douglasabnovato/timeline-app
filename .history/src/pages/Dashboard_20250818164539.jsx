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

  // Carrega eventos salvos ao iniciar
  useEffect(() => {
    const adminSaved = JSON.parse(localStorage.getItem("events_admin")) || [];
    const sharedSaved = JSON.parse(localStorage.getItem("events_shared")) || [];
    setAdminEvents(adminSaved);
    setSharedEvents(sharedSaved);
  }, []);

  // Persiste adminEvents
  useEffect(() => {
    localStorage.setItem("events_admin", JSON.stringify(adminEvents));
  }, [adminEvents]);

  // Persiste sharedEvents
  useEffect(() => {
    localStorage.setItem("events_shared", JSON.stringify(sharedEvents));
  }, [sharedEvents]);

  // Atualiza formulário
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Adiciona novo evento
  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEvent = { ...form, id: Date.now() };
    setAdminEvents([...adminEvents, newEvent]);
    setForm({ type: "work", title: "", description: "", date: "" });
  };

  // Publica ou remove publicação
  const handleTogglePublish = (event) => {
    const exists = sharedEvents.find((ev) => ev.id === event.id);

    if (exists) {
      // remover se já publicado
      setSharedEvents(sharedEvents.filter((ev) => ev.id !== event.id));
    } else {
      // adicionar se ainda não publicado
      setSharedEvents([...sharedEvents, event]);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Bem-vindo, {currentUser?.name}
      </Typography>

      {currentUser?.role === "admin" ? (
        <>
          {/* Formulário para adicionar evento */}
          <Typography variant="h6" gutterBottom>
            Adicionar Evento (Admin)
          </Typography>
          <Box
            component="form"
            onSubmit={handleAddEvent}
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              mb: 3,
            }}
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

          {/* Timeline do administrador */}
          <Typography variant="h6" gutterBottom>
            Minha Timeline (Admin)
          </Typography>
          <TimelineComponent events={adminEvents} />

          {/* Publicar eventos */}
          <Typography variant="h6" sx={{ mt: 3 }}>
            Publicar Eventos para Clientes
          </Typography>
          {adminEvents.map((ev) => {
            const isPublished = sharedEvents.some(
              (shared) => shared.id === ev.id
            );
            return (
              <Button
                key={ev.id}
                sx={{ mr: 1, mt: 1 }}
                variant={isPublished ? "contained" : "outlined"}
                color={isPublished ? "success" : "primary"}
                onClick={() => handleTogglePublish(ev)}
              >
                {isPublished
                  ? `Publicado: ${ev.title}`
                  : `Publicar: ${ev.title}`}
              </Button>
            );
          })}
        </>
      ) : (
        <>
          {/* Timeline compartilhada */}
          <Typography variant="h6" gutterBottom>
            Timeline Compartilhada (Somente Visualização)
          </Typography>
          <TimelineComponent events={sharedEvents} />
        </>
      )}

      {/* Botão de sair */}
      <Button variant="outlined" color="error" onClick={logout} sx={{ mt: 3 }}>
        Sair
      </Button>
    </Container>
  );
}
