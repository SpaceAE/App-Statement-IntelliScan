import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-family-primary)',
  },
  palette: {
    mode: 'light',
    primary: {
      main: 'var(--primary-700)',
      light: 'var(--primary-500)',
      dark: 'var(--primary-800)',
      contrastText: '#fff',
    },
    secondary: {
      main: 'var(--secondary-700)',
      light: 'var(--secondary-500)',
      dark: 'var(--secondary-800)',
      contrastText: '#fff',
    },
    error: {
      main: 'var(--error-700)',
      light: 'var(--error-500)',
      dark: 'var(--error-800)',
      contrastText: '#fff',
    },
    warning: {
      main: 'var(--warning-700)',
      light: 'var(--warning-500)',
      dark: 'var(--warning-800)',
      contrastText: '#fff',
    },
    grey: {
      50: 'var(--gray-50)',
      100: 'var(--gray-100)',
      200: 'var(--gray-200)',
      300: 'var(--gray-300)',
      400: 'var(--gray-400)',
      500: 'var(--gray-500)',
      600: 'var(--gray-600)',
      700: 'var(--gray-700)',
      800: 'var(--gray-800)',
      900: 'var(--gray-900)',
    },
    background: {
      default: 'inherit',
      paper: '#fff',
    },
    text: {
      primary: 'var(--gray-900)',
      secondary: 'var(--gray-700)',
    },
  },
});

export default theme;
