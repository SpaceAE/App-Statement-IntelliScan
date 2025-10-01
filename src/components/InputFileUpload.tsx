'use client';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DescriptionIcon from '@mui/icons-material/Description';
import {
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { useTranslations } from 'next-intl';
import React, { useRef, useState } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const DropZone = styled(Box, {
  shouldForwardProp: prop => prop !== 'isDragOver',
})(({ theme, isDragOver }: { theme?: Theme; isDragOver: boolean }) => ({
  height: '240px',
  border: `1px solid ${isDragOver ? theme?.palette.primary.main : theme?.palette.grey[300]}`,
  borderRadius: theme?.shape.borderRadius,
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  backgroundColor: isDragOver
    ? theme?.palette.action.hover
    : 'rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
  '&:hover': {
    borderColor: theme?.palette.primary.main,
    backgroundColor: theme?.palette.action.hover,
  },
}));

interface InputFileUploadProps {
  onFileSelect?: (file: File) => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
  loading?: boolean;
}

export default function InputFileUpload({
  onFileSelect,
  acceptedTypes = '.pdf,.jpg,.jpeg,.png',
  maxSize = 10,
  loading = false,
}: InputFileUploadProps) {
  const t = useTranslations('upload.component');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const validateFile = (file: File): boolean => {
    if (file.size > maxSize * 1024 * 1024) {
      setError(t('fileTooLarge', { maxSize }));
      return false;
    }

    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const acceptedExtensions = acceptedTypes.split(',');
    if (!acceptedExtensions.includes(fileExtension)) {
      setError(t('invalidFileType', { types: acceptedTypes }));
      return false;
    }

    setError('');
    return true;
  };

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      onFileSelect?.(file);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box>
      <DropZone
        isDragOver={dragOver}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <VisuallyHiddenInput
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileChange}
          disabled={loading}
        />

        {loading ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <CircularProgress />
            <Typography variant="body2" color="text.secondary">
              {t('loading')}
            </Typography>
          </Box>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent={'center'}
            height={'100%'}
            alignItems="center"
            gap={'12px'}
          >
            {selectedFile ? (
              <>
                <DescriptionIcon sx={{ fontSize: 48, color: 'success.main' }} />
                <Typography variant="body1" color="success.main">
                  {selectedFile.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
                <Button variant="outlined" size="small">
                  {t('chooseDifferentFile')}
                </Button>
              </>
            ) : (
              <>
                <CloudUploadIcon
                  sx={{ fontSize: 48, color: 'text.secondary' }}
                />
                <Typography variant="body1">{t('chooseFile')}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {t('chooseFileDescription')}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  disabled={loading}
                >
                  <Typography variant="caption">{t('uploadButton')}</Typography>
                </Button>
                <Typography variant="caption" color="text.secondary">
                  {t('fileTypes', { types: acceptedTypes })} (Max {maxSize}MB)
                </Typography>
              </>
            )}
          </Box>
        )}
      </DropZone>

      {error && (
        <Alert
          severity="error"
          sx={{ mt: 2, backgroundColor: 'error.dark', color: 'white' }}
        >
          {error}
        </Alert>
      )}
    </Box>
  );
}
