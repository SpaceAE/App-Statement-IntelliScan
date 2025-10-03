'use client';

import { Button, Input, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ComponentProps, useState } from 'react';

import InputFileUpload from '@/components/InputFileUpload';
import Modal from '@/components/Modal';

export default function UploadPage() {
  const t = useTranslations('upload');
  const tCommon = useTranslations('common');
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [modalPasswordOpen, setModalPasswordOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState({
    noRisk: false,
    risk: false,
    passwordNotCorrect: false,
    internalError: false,
  });

  const modal: Record<string, ComponentProps<typeof Modal>> = {
    noRisk: {
      type: 'success',
      open: modalOpen.noRisk,
      onClose: () => setModalOpen(prev => ({ ...prev, noRisk: false })),
      title: t('modal.noRisk.title'),
      description: t('modal.noRisk.description'),
      primaryButton: {
        text: tCommon('confirm'),
        onClick: () => setModalOpen(prev => ({ ...prev, noRisk: false })),
      },
    },
    risk: {
      type: 'warning',
      open: modalOpen.risk,
      onClose: () => setModalOpen(prev => ({ ...prev, risk: false })),
      title: t('modal.risk.title'),
      description: t('modal.risk.description'),
      primaryButton: {
        text: tCommon('confirm'),
        onClick: () => setModalOpen(prev => ({ ...prev, risk: false })),
      },
    },
    passwordNotCorrect: {
      type: 'error',
      open: modalOpen.passwordNotCorrect,
      onClose: () =>
        setModalOpen(prev => ({ ...prev, passwordNotCorrect: false })),
      title: t('modal.passwordNotCorrect.title'),
      primaryButton: {
        text: tCommon('tryAgain'),
        onClick: () =>
          setModalOpen(prev => ({ ...prev, passwordNotCorrect: false })),
      },
      secondaryButton: {
        text: tCommon('cancel'),
        onClick: () =>
          setModalOpen(prev => ({ ...prev, passwordNotCorrect: false })),
      },
    },
    internalError: {
      type: 'error',
      open: modalOpen.internalError,
      onClose: () => setModalOpen(prev => ({ ...prev, internalError: false })),
      title: t('modal.internalError.title'),
      description: t('modal.internalError.description'),
      primaryButton: {
        text: tCommon('tryAgain'),
        onClick: () =>
          setModalOpen(prev => ({ ...prev, internalError: false })),
      },
      secondaryButton: {
        text: tCommon('cancel'),
        onClick: () =>
          setModalOpen(prev => ({ ...prev, internalError: false })),
      },
    },
  };

  return (
    <>
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

      <Modal
        open={modalPasswordOpen}
        icon={
          <Image
            src={'/images/file-protected.png'}
            width={70}
            height={70}
            alt="File Protected"
            priority
          />
        }
        onClose={() => setModalPasswordOpen(false)}
        title={t('modal.passwordProtected.title')}
        description={
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        }
        primaryButton={{
          text: tCommon('submit'),
          onClick: () => setModalPasswordOpen(false),
        }}
        secondaryButton={{
          text: tCommon('cancel'),
          onClick: () => setModalPasswordOpen(false),
        }}
      />

      {Object.values(modal).map((props, index) => (
        <Modal key={index} {...props} />
      ))}
    </>
  );
}
