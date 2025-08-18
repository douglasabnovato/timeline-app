import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { Typography, Paper } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";

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

export default function TimelineComponent({ events }) {
  return (
    <Timeline position="alternate">
      {events.map((event, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent color="text.secondary">
            {event.date}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary">
              {getIcon(event.type)}
            </TimelineDot>
            {index < events.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} sx={{ padding: "6px 16px" }}>
              <Typography variant="h6">{event.title}</Typography>
              <Typography>{event.description}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
