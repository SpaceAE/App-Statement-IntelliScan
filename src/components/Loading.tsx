'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Box, Modal, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import { ModalContainer } from './Modal';

interface LoadingProps {
  open: boolean;
}

export default function Loading({ open }: LoadingProps) {
  const t = useTranslations('common');
  return (
    <Modal
      open={open}
      disableAutoFocus
      disableEnforceFocus
      aria-labelledby="loading"
      aria-describedby="loading"
    >
      <ModalContainer>
        <Box height={'120px'}>
          <DotLottieReact
            src="/icons/loading.lottie"
            loop
            autoplay
            style={{ scale: 1.8 }}
          />
        </Box>
        <Typography
          variant="body2"
          component="h2"
          whiteSpace={'pre-line'}
          textAlign={'center'}
        >
          {t('loading')}
        </Typography>
      </ModalContainer>
    </Modal>
  );
}
