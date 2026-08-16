import { z } from "zod";

/**
 * Environment variables that are also readable on the client.
 * Must be prefixed with `VITE_` to be exposed to the browser by Vite.
 */
const clientEnvSchema = z.object({});

export default clientEnvSchema.parse(import.meta.env);
