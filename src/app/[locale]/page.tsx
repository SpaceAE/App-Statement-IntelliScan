'use client';
import { Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('common');

  return (
    <div style={{ minHeight: '100dvh', padding: '16px' }}>
      <Typography
        className="headline_small"
        fontWeight={'bold'}
        color="textPrimary"
      >
        {t('welcome')}
      </Typography>
    </div>
  );
}
