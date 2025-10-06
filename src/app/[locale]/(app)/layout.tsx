'use client';
import { Paper, Box, styled } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import { RootState } from '@/stores/store';

const Frame = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 430,
  height: '100dvh',
  display: 'flex',
  padding: '16px',
  margin: '0 auto',
  gap: '16px',
  flexDirection: 'column',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
  boxSizing: 'border-box',
}));

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const common = useSelector((state: RootState) => state.common);
  return (
    <>
      <Frame elevation={0} square={false}>
        <Box component="main" sx={{ flex: 1, overflow: 'hidden' }}>
          {children}
        </Box>
        <Navbar />
      </Frame>
      <Loading open={common.loading} />
    </>
  );
}
