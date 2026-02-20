import { describe, it, expect } from "vitest";
import { render } from "src/test/render";
import { Route } from "src/routes/index";

const App = Route.options.component!;

describe("index route", () => {
  it("renders the heading", () => {
    const { getByRole } = render(<App />);
    expect(getByRole("heading", { level: 1 })).toHaveTextContent("To Do");
  });

  it("shows correct task counts", () => {
    const { getByText } = render(<App />);
    expect(getByText(/3 tasks remaining/)).toBeInTheDocument();
    expect(getByText(/2 completed/)).toBeInTheDocument();
  });

  it("lists pending todos", () => {
    const { getByText } = render(<App />);
    expect(getByText("Set up CI/CD pipeline for staging")).toBeInTheDocument();
    expect(getByText("Write integration tests for auth flow")).toBeInTheDocument();
    expect(getByText("Review pull request #42")).toBeInTheDocument();
  });

  it("lists completed todos", () => {
    const { getByText } = render(<App />);
    expect(getByText("Design the new landing page")).toBeInTheDocument();
    expect(getByText("Update dependencies to latest versions")).toBeInTheDocument();
  });

  it("has an input to add new tasks", () => {
    const { getByPlaceholderText } = render(<App />);
    expect(getByPlaceholderText("Add a new task...")).toBeInTheDocument();
  });
});
