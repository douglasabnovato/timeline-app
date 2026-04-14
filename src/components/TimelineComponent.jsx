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
import { Typography, Paper, Box, alpha } from "@mui/material";

// Ícones
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import EventIcon from "@mui/icons-material/Event";

const TimelineComponent = ({ events }) => {
  // Configuração de cores inspirada no design vibrante
  const getEventConfig = (type) => {
    switch (type) {
      case "work":
        return { icon: <WorkIcon />, color: "#ffc107" }; // Amarelo Méqui
      case "education":
        return { icon: <SchoolIcon />, color: "#00e5ff" }; // Ciano vibrante
      default:
        return { icon: <EventIcon />, color: "#ff4081" }; // Rosa destaque
    }
  };

  if (!events || events.length === 0) {
    return (
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          mt: 4,
          color: alpha("#fff", 0.5),
          fontStyle: "italic",
        }}
      >
        Nenhum marco adicionado à jornada ainda.
      </Typography>
    );
  }

  return (
    <Timeline position="alternate" sx={{ px: { xs: 0, md: 2 } }}>
      {events.map((event) => {
        const config = getEventConfig(event.type);

        return (
          <TimelineItem key={event.id}>
            {/* Lado Oposto: Data com estilo elegante */}
            <TimelineOppositeContent
              sx={{
                m: "auto 0",
                fontWeight: "bold",
                color: alpha("#fff", 0.4),
              }}
              variant="caption"
            >
              {new Date(event.date).toLocaleDateString("pt-BR")}
            </TimelineOppositeContent>

            {/* Centro: Conectores e Dot Customizado */}
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: alpha("#fff", 0.1) }} />
              <TimelineDot
                sx={{
                  bgcolor: "transparent",
                  borderColor: config.color,
                  borderWidth: 2,
                  boxShadow: `0 0 10px ${alpha(config.color, 0.5)}`,
                }}
              >
                {React.cloneElement(config.icon, {
                  sx: { color: config.color, fontSize: 20 },
                })}
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: alpha("#fff", 0.1) }} />
            </TimelineSeparator>

            {/* Conteúdo: Card em Glassmorphism */}
            <TimelineContent sx={{ py: "20px", px: 2 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 4,
                  bgcolor: alpha("#fff", 0.05),
                  backdropFilter: "blur(5px)",
                  border: `1px solid ${alpha("#fff", 0.1)}`,
                  textAlign: "left",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    bgcolor: alpha("#fff", 0.08),
                    borderColor: alpha(config.color, 0.4),
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{
                    fontWeight: 800,
                    color: config.color,
                    lineHeight: 1.2,
                    mb: 0.5,
                  }}
                >
                  {event.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: alpha("#fff", 0.7), lineHeight: 1.4 }}
                >
                  {event.description}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default TimelineComponent;
