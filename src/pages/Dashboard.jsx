import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Divider,
  Paper,
  Stack,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../context/AuthContext";
import { eventService } from "../services/eventService";
import TimelineComponent from "../components/TimelineComponent";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    type: "work",
    public: true, // Definimos como público por padrão para o Viewer ver
  });

  const loadEvents = async () => {
    try {
      setLoading(true);
      // Se for admin, busca tudo dele. Se for viewer, busca só os públicos.
      const data =
        currentUser.role === "admin"
          ? await eventService.getByOwner(currentUser.id)
          : await eventService.getPublic();

      // Ordena por data (mais recente primeiro)
      setEvents(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (error) {
      console.error("Erro ao carregar:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) loadEvents();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await eventService.update(editingId, {
          ...form,
          ownerId: currentUser.id,
        });
        setEditingId(null);
      } else {
        await eventService.create({
          ...form,
          ownerId: currentUser.id,
          id: Date.now().toString(),
        });
      }
      setForm({
        title: "",
        description: "",
        date: "",
        type: "work",
        public: true,
      });
      loadEvents();
    } catch (error) {
      alert("Erro ao processar operação");
    }
  };

  const handleEdit = (event) => {
    setForm(event);
    setEditingId(event.id);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Sobe a tela para o form
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja excluir este marco?")) {
      await eventService.delete(id);
      loadEvents();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4">Olá, {currentUser?.name}!</Typography>
        <Button variant="outlined" color="error" onClick={logout}>
          Sair
        </Button>
      </Box>

      {/* FORMULÁRIO (VISÍVEL APENAS PARA ADMIN) */}
      {currentUser.role === "admin" && (
        <Paper
          elevation={3}
          sx={{ p: 3, mb: 4, borderLeft: "6px solid #1976d2" }}
        >
          <Typography variant="h6" gutterBottom>
            {editingId ? "Editar Marco" : "Adicionar à Jornada"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mb: 2 }}
            >
              <TextField
                label="Título"
                fullWidth
                required
                name="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <TextField
                label="Data"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
              <TextField
                select
                label="Tipo"
                sx={{ minWidth: 150 }}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <MenuItem value="work">Trabalho</MenuItem>
                <MenuItem value="education">Educação</MenuItem>
                <MenuItem value="event">Evento</MenuItem>
              </TextField>
            </Stack>
            <TextField
              label="Descrição"
              fullWidth
              multiline
              rows={2}
              sx={{ mb: 2 }}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={form.public}
                  onChange={(e) =>
                    setForm({ ...form, public: e.target.checked })
                  }
                />
              }
              label="Tornar marco público para visitantes"
              sx={{ mb: 2, display: "block" }}
            />

            <Button
              type="submit"
              variant="contained"
              color={editingId ? "warning" : "primary"}
            >
              {editingId ? "Atualizar Marco" : "Salvar na Timeline"}
            </Button>
            {editingId && (
              <Button
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    title: "",
                    description: "",
                    date: "",
                    type: "work",
                    public: true,
                  });
                }}
              >
                Cancelar
              </Button>
            )}
          </Box>
        </Paper>
      )}

      {/* GESTÃO DE ITENS (LISTA RÁPIDA PARA ADMIN) */}
      {currentUser.role === "admin" && events.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Gerenciar Marcos
          </Typography>
          {events.map((ev) => (
            <Paper
              key={ev.id}
              variant="outlined"
              sx={{
                p: 1,
                mb: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">
                <strong>[{ev.date}]</strong> {ev.title}
              </Typography>
              <Box>
                <IconButton
                  size="small"
                  onClick={() => handleEdit(ev)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(ev.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      <Divider sx={{ my: 4 }}>Visualização da Timeline</Divider>

      <TimelineComponent events={events} />
    </Container>
  );
};

export default Dashboard;
