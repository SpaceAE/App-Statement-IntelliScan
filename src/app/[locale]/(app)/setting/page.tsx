'use client';
import { Button, Stack, useColorScheme } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/plugins/i18n/navigation';

export default function SettingPage() {
  const t = useTranslations('setting');
  const { mode, setMode } = useColorScheme();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  return (
    <Stack gap={4}>
      <h1>{t('title')}</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      >
        {t('theme')}
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          router.replace(pathname, { locale: locale === 'en' ? 'th' : 'en' });
        }}
      >
        {t('language')}
      </Button>
    </Stack>
  );
}
