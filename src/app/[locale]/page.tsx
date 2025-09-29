'use client';
import { Button, Typography, useColorScheme } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('common');
  const { mode, setMode } = useColorScheme();

  console.log('mode', mode);

  return (
    <div style={{ minHeight: '100dvh', padding: '16px' }}>
      <Typography variant="h5" color="textPrimary">
        {t('welcome')}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      >
        switch theme
      </Button>
    </div>
  );
}
