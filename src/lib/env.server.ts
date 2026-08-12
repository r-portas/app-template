import { z } from "zod";

/**
 * Server-only environment variables.
 */
const serverEnvSchema = z.object({});

export default serverEnvSchema.parse(process.env);
