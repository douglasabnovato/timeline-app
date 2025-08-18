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
import { storageService } from "../utils/storageService";

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

  useEffect(() => {
    setAdminEvents(storageService.get("events_admin") || []);
    setSharedEvents(storageService.get("events_shared") || []);
  }, [currentUser]);

  useEffect(() => {
    storageService.set("events_admin", adminEvents);
  }, [adminEvents]);

  useEffect(() => {
    storageService.set("events_shared", sharedEvents);
  }, [sharedEvents]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddEvent = (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.date) {
      alert("Preencha todos os campos!");
      return;
    }

    const duplicate = adminEvents.find(
      (ev) => ev.title === form.title && ev.date === form.date
    );

    if (duplicate) {
      alert("Evento já existe com esse título e data!");
      return;
    }

    const newEvent = { ...form, id: Date.now() };
    setAdminEvents([...adminEvents, newEvent]);
    setForm({ type: "work", title: "", description: "", date: "" });
  };

  const togglePublishToClients = (event) => {
    const alreadyShared = sharedEvents.find((ev) => ev.id === event.id);

    if (alreadyShared) {
      setSharedEvents(sharedEvents.filter((ev) => ev.id !== event.id));
    } else {
      setSharedEvents([...sharedEvents, { ...event }]);
    }
  };

  const isPublished = (eventId) => sharedEvents.some((ev) => ev.id === eventId);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Bem-vindo, {currentUser?.name}
      </Typography>

      {currentUser?.role === "admin" ? (
        <>
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

          <Typography variant="h6" gutterBottom>
            Minha Timeline (Admin)
          </Typography>
          <TimelineComponent events={adminEvents} />

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
          <Typography variant="h6" gutterBottom>
            Timeline Compartilhada (Somente Visualização)
          </Typography>
          <TimelineComponent events={sharedEvents} />
        </>
      )}

      <Button variant="outlined" color="error" onClick={logout} sx={{ mt: 3 }}>
        Sair
      </Button>
    </Container>
  );
}
