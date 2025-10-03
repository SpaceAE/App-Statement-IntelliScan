'use client';

import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  ErrorOutlineOutlined as ErrorOutlineOutlinedIcon,
  ReportProblemOutlined as ReportProblemOutlinedIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Modal as MuiModal,
  Stack,
  styled,
  Typography,
} from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  type?: 'custom' | 'warning' | 'error' | 'success';
  icon?: React.ReactNode;
  title: string;
  description?: string | React.ReactNode;
  primaryButton: {
    text: string;
    onClick: () => void;
  };
  secondaryButton?: {
    text: string;
    onClick: () => void;
  };
}

const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '92%',
  maxWidth: '400px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  padding: '0 16px',
  gap: '8px',
  height: '300px',
  ...theme.applyStyles('dark', {
    backgroundColor: '#5D5D5D',
  }),
}));

export default function Modal({
  open,
  onClose,
  type = 'custom',
  icon,
  title,
  description,
  primaryButton,
  secondaryButton,
}: ModalProps) {
  const iconMap = {
    warning: (
      <ReportProblemOutlinedIcon color="warning" sx={{ fontSize: 64 }} />
    ),
    error: <ErrorOutlineOutlinedIcon color="error" sx={{ fontSize: 64 }} />,
    success: <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 64 }} />,
    custom: null,
  };

  return (
    <MuiModal
      open={open}
      onClose={onClose}
      disableAutoFocus
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <ModalContainer>
        {icon ? icon : iconMap[type]}
        <Stack
          gap={'4px'}
          marginBottom={'24px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant="h5" component="h2" fontWeight={'bold'}>
            {title}
          </Typography>
          {description && typeof description === 'string' ? (
            <Typography variant="body2" align="center" whiteSpace="pre-line">
              {description}
            </Typography>
          ) : (
            description
          )}
        </Stack>
        <Button
          onClick={primaryButton.onClick}
          variant="contained"
          sx={{ width: '100%', maxWidth: '280px', borderRadius: '8px' }}
        >
          <Typography variant="body2" fontWeight={'bold'} paddingY={'4px'}>
            {primaryButton.text}
          </Typography>
        </Button>
        {secondaryButton && (
          <Button
            onClick={secondaryButton.onClick}
            sx={{ width: '100%', maxWidth: '280px', borderRadius: '8px' }}
          >
            <Typography variant="body2" fontWeight={'bold'} color="textPrimary">
              {secondaryButton.text}
            </Typography>
          </Button>
        )}
      </ModalContainer>
    </MuiModal>
  );
}
