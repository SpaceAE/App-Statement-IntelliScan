import { createEnv } from '@t3-oss/env-nextjs';
import z from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z
      .url()
      .optional()
      .describe('The base URL for the API'),
    NEXT_PUBLIC_DEFAULT_THEME_MODE: z
      .enum(['light', 'dark', 'system'])
      .default('dark')
      .describe('The default theme mode for the application'),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_DEFAULT_THEME_MODE: process.env.NEXT_PUBLIC_DEFAULT_THEME_MODE,
  },
  onValidationError: issue => {
    console.error(' \x1b[31m✗\x1b[0m Invalid environment variables:', issue);
    process.exit(1);
  },
});
