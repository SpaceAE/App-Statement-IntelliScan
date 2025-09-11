import { createEnv } from '@t3-oss/env-nextjs';
import z from 'zod';

export const env = createEnv({
  server: {
    SECRET_KEY: z.string().nonempty().describe('The secret key for the app'),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.url().describe('The base URL for the API'),
  },
  runtimeEnv: {
    SECRET_KEY: process.env.SECRET_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
