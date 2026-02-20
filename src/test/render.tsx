import { render as rtlRender, type RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "src/lib/theme";

function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

/**
 * Drop-in replacement for RTL's `render` that wraps the component in the app's
 * `ThemeProvider`. Use this instead of importing `render` from
 * `@testing-library/react` so that MUI components resolve the correct palette,
 * typography, and component defaults.
 *
 * Use {@link renderWithRouter} instead when the component under test uses any
 * TanStack Router APIs (`Link`, `useNavigate`, `useParams`, etc.).
 *
 * @example
 * ```tsx
 * import { render } from "src/test/render";
 *
 * it("shows the label", () => {
 *   const { getByText } = render(<MyButton>Click me</MyButton>);
 *   expect(getByText("Click me")).toBeInTheDocument();
 * });
 * ```
 */
export function render(ui: React.ReactElement, options?: RenderOptions) {
  return rtlRender(ui, { wrapper: Providers, ...options });
}
