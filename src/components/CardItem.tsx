'use client';

import { Stack, styled, Typography } from '@mui/material';

export const StyledCard = styled(Stack)({
  padding: '16px 24px',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
});

interface CardItemProps {
  icon: React.ReactNode;
  label: string;
  action: React.ReactNode;
}

export default function CardItem({ icon, label, action }: CardItemProps) {
  return (
    <StyledCard direction={'row'} alignItems={'center'} gap={4}>
      {icon && icon}
      <Typography variant="body1" sx={{ flex: 1 }}>
        {label}
      </Typography>
      {action && action}
    </StyledCard>
  );
}
