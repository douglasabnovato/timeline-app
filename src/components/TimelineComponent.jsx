import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { Typography, Paper, Box } from "@mui/material";

// Ícones para cada tipo de evento
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import EventIcon from "@mui/icons-material/Event";

const TimelineComponent = ({ events }) => {
  // 1. Função auxiliar para definir o ícone e a cor baseada no tipo
  const getEventConfig = (type) => {
    switch (type) {
      case "work":
        return { icon: <WorkIcon />, color: "primary" };
      case "education":
        return { icon: <SchoolIcon />, color: "secondary" };
      default:
        return { icon: <EventIcon />, color: "grey" };
    }
  };

  // Se não houver eventos, mostra uma mensagem amigável
  if (!events || events.length === 0) {
    return (
      <Typography
        variant="body1"
        sx={{ textAlign: "center", mt: 4, color: "text.secondary" }}
      >
        Nenhum marco adicionado à jornada ainda.
      </Typography>
    );
  }

  return (
    <Timeline position="alternate">
      {events.map((event) => {
        const config = getEventConfig(event.type);

        return (
          <TimelineItem key={event.id}>
            {/* Lado Oposto: Data */}
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {event.date}
            </TimelineOppositeContent>

            {/* Centro: Linha e Ícone */}
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color={config.color} variant="outlined">
                {config.icon}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>

            {/* Lado Conteúdo: Título e Descrição */}
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ fontWeight: "bold" }}
                >
                  {event.title}
                </Typography>
                <Typography variant="body2">{event.description}</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default TimelineComponent;
