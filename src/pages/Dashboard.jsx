import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../services/eventService";
import { useAuth } from "../context/AuthContext";
import TimelineComponent from "../components/TimelineComponent";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    type: "event",
  });
  const [editingId, setEditingId] = useState(null);

  // 🔹 Carregar eventos
  useEffect(() => {
    const fetchData = async () => {
      const data = await getEvents();
      // filtra eventos do usuário
      setEvents(data.filter((e) => e.ownerId === currentUser.id));
    };
    fetchData();
  }, [currentUser.id]);

  // 🔹 Handle inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Criar/Atualizar evento
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      const updated = await updateEvent(editingId, {
        ...form,
        id: editingId,
        ownerId: currentUser.id,
      });
      setEvents(events.map((ev) => (ev.id === editingId ? updated : ev)));
      setEditingId(null);
    } else {
      const newEvent = await createEvent({
        ...form,
        id: Date.now(),
        ownerId: currentUser.id,
      });
      setEvents([...events, newEvent]);
    }
    setForm({ title: "", description: "", date: "", type: "event" });
  };

  // 🔹 Editar evento
  const handleEdit = (event) => {
    setForm(event);
    setEditingId(event.id);
  };

  // 🔹 Deletar evento
  const handleDelete = async (id) => {
    await deleteEvent(id);
    setEvents(events.filter((ev) => ev.id !== id));
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Dashboard</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Olá, {currentUser?.name}!
      </Typography>

      {/* Formulário */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          label="Título"
          name="title"
          value={form.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Descrição"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Data"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <Select
          name="type"
          value={form.type}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="event">Evento</MenuItem>
          <MenuItem value="education">Educação</MenuItem>
          <MenuItem value="work">Trabalho</MenuItem>
        </Select>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          {editingId ? "Atualizar" : "Adicionar"}
        </Button>
      </Box>

      {/* Lista de eventos */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Meus Eventos</Typography>
        {events.map((event) => (
          <Paper
            key={event.id}
            sx={{ p: 2, mt: 2, display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <Typography variant="h6">{event.title}</Typography>
              <Typography>{event.date}</Typography>
            </Box>
            <Box>
              <IconButton onClick={() => handleEdit(event)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(event.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Timeline */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5">Minha Timeline</Typography>
        <TimelineComponent events={events} />
      </Box>
    </Container>
  );
}
