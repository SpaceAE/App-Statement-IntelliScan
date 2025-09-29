'use client';
import { Paper, Box, styled } from '@mui/material';
import React from 'react';

import Navbar from '@/components/Navbar';

const Frame = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 430,
  height: '100dvh',
  display: 'flex',
  padding: '16px',
  margin: '0 auto',
  flexDirection: 'column',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
  boxSizing: 'border-box',
}));

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <Frame elevation={0} square={false}>
      <Box
        component="main"
        sx={{
          flex: 1,
          overflowY: 'hidden',
        }}
      >
        {children}
      </Box>
      <Navbar />
    </Frame>
  );
}
