import { createTheme } from '@mui/material/styles';
import { Prompt } from 'next/font/google';

const font = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['400', '700'],
  variable: '--font-family-primary',
});

const theme = createTheme({
  typography: {
    fontFamily: font.style.fontFamily,
  },
  palette: {
    primary: {
      50: '#fdfefd',
      100: '#f6fbf8',
      200: '#eaf6f0',
      300: '#d9efe3',
      400: '#c4e6d4',
      500: '#aadbc1',
      600: '#8bcfab',
      700: '#68c091',
      800: '#2f714e',
      900: '#173726',
      main: '#68c091',
      light: '#aadbc1',
      dark: '#2f714e',
      contrastText: '#fff',
    },
    secondary: {
      50: '#fbfdfe',
      100: '#eef7fa',
      200: '#d9ecf4',
      300: '#bcdeeb',
      400: '#97cbe0',
      500: '#69b4d2',
      600: '#3897bc',
      700: '#26657e',
      800: '#173e4e',
      900: '#0f2731',
      main: '#26657e',
      light: '#69b4d2',
      dark: '#173e4e',
      contrastText: '#fff',
    },
    error: {
      50: '#fffcfc',
      100: '#fef3f3',
      200: '#fde5e5',
      300: '#fbd0d0',
      400: '#f9b6b6',
      500: '#f69595',
      600: '#f36f6f',
      700: '#ef4343',
      800: '#970d0d',
      900: '#490606',
    },
    warning: {
      50: '#fffefc',
      100: '#fefaf1',
      200: '#fdf4e0',
      300: '#fcecc8',
      400: '#fbe1aa',
      500: '#f9d484',
      600: '#f6c458',
      700: '#f4b225',
      800: '#916608',
      900: '#493304',
    },
    grey: {
      50: '#fcfcfd',
      100: '#f1f3f6',
      200: '#e0e4ea',
      300: '#c8ced9',
      400: '#a8b3c4',
      500: '#8292aa',
      600: '#5b6b86',
      700: '#384252',
      800: '#242b35',
      900: '#191d24',
    },
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#fff',
          paper: '#fff',
        },
        text: {
          primary: '#191d24',
          secondary: '#384252',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#68c091',
          light: '#aadbc1',
          dark: '#2f714e',
          contrastText: '#fff',
        },
        secondary: {
          main: '#26657e',
          light: '#69b4d2',
          dark: '#173e4e',
          contrastText: '#fff',
        },
        background: {
          default: '#252525',
          paper: '#252525',
        },
        text: {
          primary: '#fcfcfd',
          secondary: '#e0e4ea',
        },
      },
    },
  },
});

export default theme;
