import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  Grid,
  Divider,
} from "@mui/material";
import TimelineComponent from "../components/TimelineComponent";
import { useAuth } from "../context/AuthContext";
import { storageService } from "../utils/storageService";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [allEvents, setAllEvents] = useState([]);
  const [sharedEvents, setSharedEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    type: "event",
    public: true,
  });

  // Carrega todos os eventos e os compartilhados
  useEffect(() => {
    const storedEvents = storageService.get("timelineEvents") || [];
    const shared = storageService.get("events_shared") || [];
    setAllEvents(storedEvents);
    setSharedEvents(shared);
  }, [currentUser]);

  // Define eventos visíveis com base no papel
  const visibleEvents = currentUser.role === "admin" ? allEvents : sharedEvents;

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      alert("Preencha os campos obrigatórios.");
      return;
    }

    const updatedEvents = [...allEvents, newEvent];
    storageService.set("timelineEvents", updatedEvents);
    setAllEvents(updatedEvents);
    setNewEvent({
      title: "",
      description: "",
      date: "",
      type: "event",
      public: true,
    });

    if (newEvent.public) {
      const updatedShared = [...sharedEvents, newEvent];
      storageService.set("events_shared", updatedShared);
      setSharedEvents(updatedShared);
    }
  };

  const togglePublishToClients = (event) => {
    const isShared = sharedEvents.some(
      (ev) => ev.date === event.date && ev.title === event.title
    );
    let updatedShared;

    if (isShared) {
      updatedShared = sharedEvents.filter(
        (ev) => !(ev.date === event.date && ev.title === event.title)
      );
    } else {
      updatedShared = [...sharedEvents, event];
    }

    storageService.set("events_shared", updatedShared);
    setSharedEvents(updatedShared);
  };

  const isPublished = (event) =>
    sharedEvents.some(
      (ev) => ev.date === event.date && ev.title === event.title
    );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bem-vindo, {currentUser.name}!
      </Typography>

      {currentUser.role === "admin" && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            Adicionar Evento à Timeline
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Data"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                label="Tipo"
                value={newEvent.type}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, type: e.target.value })
                }
              >
                <MenuItem value="event">Evento</MenuItem>
                <MenuItem value="education">Educação</MenuItem>
                <MenuItem value="work">Trabalho</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={newEvent.public}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, public: e.target.checked })
                    }
                  />
                }
                label="Publicar evento"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleAddEvent}
                sx={{ mt: 1 }}
              >
                Adicionar à Timeline
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />
          <Typography variant="h6" gutterBottom>
            Publicar Eventos para Clientes
          </Typography>
          {allEvents.map((ev, index) => (
            <Button
              key={index}
              sx={{ mr: 1, mt: 1 }}
              variant={isPublished(ev) ? "contained" : "outlined"}
              color={isPublished(ev) ? "success" : "primary"}
              onClick={() => togglePublishToClients(ev)}
            >
              {isPublished(ev) ? "Publicado: " : "Publicar: "} {ev.title}
            </Button>
          ))}
        </>
      )}

      <Divider sx={{ my: 4 }} />
      <Typography variant="h6" gutterBottom>
        Timeline
      </Typography>

      {visibleEvents.length > 0 ? (
        <TimelineComponent events={visibleEvents} />
      ) : (
        <Typography variant="body1">Nenhum evento disponível.</Typography>
      )}

      <Button
        variant="outlined"
        color="error"
        onClick={handleLogout}
        sx={{ mt: 4 }}
      >
        Sair
      </Button>
    </Container>
  );
}
