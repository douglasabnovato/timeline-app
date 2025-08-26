import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { Paper, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";

export default function TimelineComponent({ events }) {
  const getIcon = (type) => {
    switch (type) {
      case "education":
        return <SchoolIcon />;
      case "work":
        return <WorkIcon />;
      default:
        return <EventIcon />;
    }
  };

  return (
    <Timeline position="alternate">
      {events.map((event) => (
        <TimelineItem key={event.id}>
          <TimelineOppositeContent>
            <Typography variant="body2" color="text.secondary">
              {event.date}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot>{getIcon(event.type)}</TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{event.title}</Typography>
              <Typography>{event.description}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
