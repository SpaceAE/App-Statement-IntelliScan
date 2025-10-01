'use client';

import { Button, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import InputFileUpload from '@/components/InputFileUpload';

export default function UploadPage() {
  const t = useTranslations('upload');
  const [file, setFile] = useState<File | null>(null);

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
      <InputFileUpload
        acceptedTypes=".pdf"
        maxSize={10}
        onFileSelect={(selectedFile: File) => setFile(selectedFile)}
      />
      <Button variant="contained" color="primary" disabled={!file}>
        {t('uploadButton')}
      </Button>
    </Stack>
  );
}
