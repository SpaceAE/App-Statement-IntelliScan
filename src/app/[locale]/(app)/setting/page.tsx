'use client';

import {
  DarkMode as DarkmodeIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import {
  MenuItem,
  Select,
  Stack,
  styled,
  Switch,
  SwitchProps,
  Typography,
  useColorScheme,
} from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';

import CardItem from '@/components/CardItem';
import { usePathname, useRouter } from '@/plugins/i18n/navigation';
import { routing } from '@/plugins/i18n/routing';

const StyledSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  width: '110px',
  borderRadius: '8px',
  height: '25px',
  padding: '4px',
  backgroundColor: theme.palette.grey[200],
  border: 'none',
  ...theme.applyStyles('dark', {
    backgroundColor: '#757575',
  }),
}));

export default function SettingPage() {
  const t = useTranslations('setting');
  const { mode, setMode } = useColorScheme();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  return (
    <Stack
      justifyContent={'flex-start'}
      sx={{
        padding: '10vh 12px 0',
        height: '100%',
        gap: '32px',
        '@media (max-height: 800px)': {
          paddingTop: '12px',
          gap: '16px',
        },
      }}
    >
      <Typography
        component={'h1'}
        variant="h4"
        fontWeight={'bold'}
        textAlign={'center'}
      >
        {t('title')}
      </Typography>
      <CardItem
        icon={<LanguageIcon />}
        label={t('language')}
        action={
          <StyledSelect
            value={locale}
            onChange={e =>
              router.push(pathname, { locale: e.target.value as string })
            }
            size="small"
          >
            {routing.locales.map(locale => (
              <MenuItem key={locale} value={locale}>
                {t(`menuLanguage.${locale}`)}
              </MenuItem>
            ))}
          </StyledSelect>
        }
      />
      <CardItem
        icon={<DarkmodeIcon />}
        label={t('theme')}
        action={
          <StyledSwitch
            checked={mode === 'dark'}
            onChange={e => setMode(e.target.checked ? 'dark' : 'light')}
          />
        }
      />
    </Stack>
  );
}
