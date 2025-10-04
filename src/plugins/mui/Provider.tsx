'use client';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { env } from '@/config/env';

import theme from './theme';

export default function MuiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      theme={theme}
      defaultMode={env.NEXT_PUBLIC_DEFAULT_THEME_MODE}
    >
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
