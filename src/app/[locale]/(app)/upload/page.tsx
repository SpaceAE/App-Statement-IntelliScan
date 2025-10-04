'use client';

import { Button, Input, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ComponentProps, useEffect, useState } from 'react';

import InputFileUpload from '@/components/InputFileUpload';
import Modal from '@/components/Modal';
import { PredictResult } from '@/constants/predictResult';
import { useMutation } from '@/plugins/tanstack';
import {
  predict,
  PredictRequest,
  PredictResponse,
  PredictResponseType,
} from '@/services/predict';
import { hideLoading, showLoading } from '@/stores/common/common.slice';
import { useDispatch } from '@/stores/store';

export default function UploadPage() {
  const t = useTranslations('upload');
  const tCommon = useTranslations('common');
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [modalPasswordOpen, setModalPasswordOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState({
    noRisk: false,
    risk: false,
    passwordNotCorrect: false,
    internalError: false,
  });

  const { mutate, isPending } = useMutation<
    PredictRequest,
    PredictResponse<PredictResponseType.SUCCESS>,
    PredictResponse<PredictResponseType.ERROR>
  >({
    mutationFn: predict,
    onSuccess: ({ data }) => {
      switch (data.prediction) {
        case PredictResult.NORMAL:
          setModalOpen(prev => ({ ...prev, noRisk: true }));
          break;
        case PredictResult.FRAUD:
          setModalOpen(prev => ({ ...prev, risk: true }));
          break;
        default:
          setModalOpen(prev => ({ ...prev, internalError: true }));
          break;
      }
    },
    onError: error => {
      switch (error.status) {
        case 403:
          setModalOpen(prev => ({ ...prev, passwordNotCorrect: true }));
          break;
        case 422:
          setModalPasswordOpen(true);
          break;
        default:
          setModalOpen(prev => ({ ...prev, internalError: true }));
          break;
      }
    },
  });

  const handleSubmit = async () => {
    mutate({ file: file as File, password });
    setPassword('');
  };

  const modal: Record<string, Omit<ComponentProps<typeof Modal>, 'onClose'>> = {
    noRisk: {
      type: 'success',
      open: modalOpen.noRisk,
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
      title: t('modal.passwordNotCorrect.title'),
      primaryButton: {
        text: tCommon('tryAgain'),
        onClick: () => {
          setModalOpen(prev => ({ ...prev, passwordNotCorrect: false }));
          setModalPasswordOpen(true);
        },
      },
      secondaryButton: {
        text: tCommon('cancel'),
        onClick: () => {
          setPassword('');
          setModalOpen(prev => ({ ...prev, passwordNotCorrect: false }));
        },
      },
    },
    internalError: {
      type: 'error',
      open: modalOpen.internalError,
      title: t('modal.internalError.title'),
      description: t('modal.internalError.description'),
      primaryButton: {
        text: tCommon('tryAgain'),
        onClick: () => {
          setPassword('');
          setModalOpen(prev => ({ ...prev, internalError: false }));
          handleSubmit();
        },
      },
      secondaryButton: {
        text: tCommon('cancel'),
        onClick: () => {
          setPassword('');
          setModalOpen(prev => ({ ...prev, internalError: false }));
        },
      },
    },
  };

  useEffect(() => {
    dispatch(isPending ? showLoading() : hideLoading());
  }, [dispatch, isPending]);

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
          maxSize={30}
          onFileSelect={(selectedFile: File) => setFile(selectedFile)}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={!file}
          onClick={handleSubmit}
        >
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
        onClose={() => {
          setPassword('');
          setModalPasswordOpen(false);
        }}
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
          onClick: () => {
            if (!password.trim()) {
              setPassword('');
            }
            setModalPasswordOpen(false);
            handleSubmit();
          },
        }}
        secondaryButton={{
          text: tCommon('cancel'),
          onClick: () => {
            setPassword('');
            setModalPasswordOpen(false);
          },
        }}
      />

      {Object.entries(modal).map(([key, props]) => (
        <Modal
          key={key}
          onClose={() => {
            setPassword('');
            setModalOpen(prev => ({ ...prev, [key]: false }));
          }}
          {...props}
        />
      ))}
    </>
  );
}
