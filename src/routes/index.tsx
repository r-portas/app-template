import { createFileRoute } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const todos = [
  {
    id: 1,
    text: "Design the new landing page",
    done: true,
    tag: "Design",
    date: "Feb 12, 2026",
  },
  {
    id: 2,
    text: "Set up CI/CD pipeline for staging",
    done: false,
    tag: "DevOps",
    date: "Feb 13, 2026",
  },
  {
    id: 3,
    text: "Write integration tests for auth flow",
    done: false,
    tag: "Testing",
    date: "Feb 14, 2026",
  },
  {
    id: 4,
    text: "Review pull request #42",
    done: false,
    tag: "Code Review",
    date: "Feb 15, 2026",
  },
  {
    id: 5,
    text: "Update dependencies to latest versions",
    done: true,
    tag: "Maintenance",
    date: "Feb 10, 2026",
  },
];

const App = () => {
  const pending = todos.filter((t) => !t.done);
  const completed = todos.filter((t) => t.done);

  return (
    <Box sx={{ py: 6, maxWidth: 640, mx: "auto" }}>
      <Typography variant="h1" gutterBottom>
        To Do
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {pending.length} tasks remaining &middot; {completed.length} completed
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            "&:last-child": { pb: 2 },
          }}
        >
          <InputBase
            placeholder="Add a new task..."
            fullWidth
            sx={{
              fontSize: "0.9rem",
              px: 1,
            }}
          />
          <Button variant="contained" size="small">
            Add
          </Button>
        </CardContent>
      </Card>

      <Stack spacing={1} sx={{ mb: 5 }}>
        {pending.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h4" sx={{ mb: 2 }}>
        Completed
      </Typography>
      <Stack spacing={1}>
        {completed.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </Stack>
    </Box>
  );
};

function TodoItem({
  todo,
}: {
  todo: { id: number; text: string; done: boolean; tag: string; date: string };
}) {
  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          "&:last-child": { pb: 2 },
        }}
      >
        <Checkbox checked={todo.done} size="small" />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body1"
            sx={{
              textDecoration: todo.done ? "line-through" : "none",
              color: todo.done ? "text.secondary" : "text.primary",
            }}
          >
            {todo.text}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {todo.date}
          </Typography>
        </Box>
        <Chip label={todo.tag} size="small" />
        <IconButton size="small" sx={{ color: "text.secondary" }}>
          &#x2715;
        </IconButton>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/")({
  component: App,
});
