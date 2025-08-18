import * as React from "react";
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
    case "work": return <WorkIcon />;
    case "course": return <SchoolIcon />;
    case "event": return <EventIcon />;
    default: return <WorkIcon />;
  }
};

export default function TimelineComponent({ events }) {
  return (
    <Timeline position="alternate">
      {events.map((item) => (
        <TimelineItem key={item.id}>
          <TimelineOppositeContent color="text.secondary">
            {item.date}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary">{getIcon(item.type)}</TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body2">{item.description}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
