import { createEnv } from '@t3-oss/env-nextjs';
import z from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z
      .url()
      .optional()
      .describe('The base URL for the API'),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  onValidationError: issue => {
    console.error(' \x1b[31m✗\x1b[0m Invalid environment variables:', issue);
    process.exit(1);
  },
});
