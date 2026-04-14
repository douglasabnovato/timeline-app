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
  alpha,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
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
    public: true,
  });

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data =
        currentUser.role === "admin"
          ? await eventService.getByOwner(currentUser.id)
          : await eventService.getPublic();

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja excluir este marco?")) {
      await eventService.delete(id);
      loadEvents();
    }
  };

  // Estilo padrão para inputs no Dashboard
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      "& fieldset": { borderColor: alpha("#fff", 0.2), borderRadius: "12px" },
      "&:hover fieldset": { borderColor: "#ffc107" },
      "&.Mui-focused fieldset": { borderColor: "#ffc107" },
    },
    "& .MuiInputLabel-root": { color: alpha("#fff", 0.7) },
    "& .MuiInputLabel-root.Mui-focused": { color: "#ffc107" },
    "& .MuiInputLabel-root.MuiInputLabel-shrink": {
      backgroundColor: "#1a1a1a",
      padding: "0 8px",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0a0a0a",
        color: "#fff",
        pt: 4,
        pb: 8,
        background:
          "radial-gradient(circle at 50% 0%, #1a237e 0%, #0a0a0a 100%)",
      }}
    >
      <Container maxWidth="lg">
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 6,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              Olá, {currentUser?.name}!
            </Typography>
            <Typography variant="body2" sx={{ color: alpha("#fff", 0.5) }}>
              {currentUser.role === "admin"
                ? "Gerencie sua jornada profissional"
                : "Visualize a jornada pública"}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="error"
            onClick={logout}
            startIcon={<ExitToAppIcon />}
            sx={{ borderRadius: "50px", borderWeight: 2 }}
          >
            Sair
          </Button>
        </Box>

        {/* FORMULÁRIO ADMIN */}
        {currentUser.role === "admin" && (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 6,
              borderRadius: 4,
              bgcolor: alpha("#121212", 0.6),
              backdropFilter: "blur(10px)",
              border: `1px solid ${editingId ? "#ffc107" : alpha("#fff", 0.1)}`,
              transition: "all 0.3s ease",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: "bold",
                color: editingId ? "#ffc107" : "#fff",
              }}
            >
              {editingId ? "✨ Editando Marco" : "🚀 Adicionar à Jornada"}
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
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  sx={inputStyle}
                />
                <TextField
                  label="Data"
                  type="date"
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  sx={inputStyle}
                />
                <TextField
                  select
                  label="Tipo"
                  sx={{ ...inputStyle, minWidth: 150 }}
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
                sx={{ ...inputStyle, mb: 2 }}
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
                    sx={{
                      color: alpha("#fff", 0.3),
                      "&.Mui-checked": { color: "#ffc107" },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{ color: alpha("#fff", 0.7) }}
                  >
                    Tornar marco público para visitantes
                  </Typography>
                }
                sx={{ mb: 2, display: "block" }}
              />

              <Stack direction="row" spacing={2}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: "50px",
                    px: 4,
                    py: 1.2,
                    fontWeight: "bold",
                    bgcolor: editingId ? "#ff9800" : "#ffc107",
                    color: "#000",
                    "&:hover": { bgcolor: editingId ? "#f57c00" : "#e6af00" },
                  }}
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
                    sx={{ color: "#fff" }}
                  >
                    Cancelar
                  </Button>
                )}
              </Stack>
            </Box>
          </Paper>
        )}

        {/* GESTÃO DE ITENS */}
        {currentUser.role === "admin" && events.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Gerenciar Marcos
            </Typography>
            <Stack spacing={1}>
              {events.map((ev) => (
                <Paper
                  key={ev.id}
                  variant="outlined"
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: alpha("#fff", 0.03),
                    borderColor: alpha("#fff", 0.1),
                    borderRadius: "12px",
                    "&:hover": { bgcolor: alpha("#fff", 0.07) },
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "#fff", fontWeight: "bold" }}
                    >
                      {ev.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: alpha("#fff", 0.5) }}
                    >
                      {ev.date} {!ev.public && "• 🔒 Privado"}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(ev)}
                      sx={{ color: "#ffc107" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(ev.id)}
                      sx={{ color: alpha("#f44336", 0.7) }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}

        <Divider sx={{ my: 6, borderColor: alpha("#fff", 0.1) }}>
          <Typography
            sx={{
              px: 2,
              color: alpha("#fff", 0.3),
              textTransform: "uppercase",
              letterSpacing: 1,
              fontSize: "0.75rem",
            }}
          >
            Visualização da Timeline
          </Typography>
        </Divider>

        <Box
          sx={{
            p: { xs: 1, md: 4 },
            bgcolor: alpha("#fff", 0.02),
            borderRadius: 8,
            border: `1px solid ${alpha("#fff", 0.05)}`,
          }}
        >
          <TimelineComponent events={events} />
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
