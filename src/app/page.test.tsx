import { test, expect } from "bun:test";
import { render } from "@testing-library/react";
import Page from "./page";

test("renders the page with the welcome message", () => {
  const { getByText } = render(<Page />);

  expect(getByText("App Template")).toBeInTheDocument();
});
