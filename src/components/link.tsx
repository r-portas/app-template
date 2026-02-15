import { createLink } from "@tanstack/react-router";
import MuiLink from "@mui/material/Link";

// See {@link https://tanstack.com/router/latest/docs/framework/react/guide/custom-link#mui-example}
const Link = createLink(MuiLink);
export default Link;
