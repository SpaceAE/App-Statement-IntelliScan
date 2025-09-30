'use client';

import { Box, Button, Stack, styled, Typography } from '@mui/material';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

const ItemButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'isSelected',
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  width: '60px',
  height: '60px',
  minWidth: 0,
  borderRadius: '50%',
  transition: 'all 0.5s ease',
  backgroundColor: isSelected
    ? theme.palette.primary.main
    : theme.palette.primary.light,
}));

const SelectionRing = styled(Box)({
  position: 'absolute',
  inset: 0,
  borderRadius: '50%',
  border: '4px solid #10b981',
  opacity: 0.75,
  animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
  '@keyframes ping': {
    '75%, 100%': {
      transform: 'scale(1.25)',
      opacity: 0,
    },
  },
});

type FeatureItem = {
  icon?: ReactNode;
  title: string;
  description: string;
};

interface FeatureSlideProps {
  features: FeatureItem[];
}

export default function FeatureSlide({ features }: FeatureSlideProps) {
  const [selected, setSelected] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setSelected(prev => (prev + 1) % features.length);
    }, 5000);
  }, [features.length]);

  const handleSelect = (index: number) => {
    setSelected(index);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setTimeout(() => {
      startInterval();
    }, 5000);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startInterval]);

  return (
    <Stack justifyContent={'center'} alignItems={'center'} gap={'24px'}>
      <Box position={'relative'}>
        <Stack direction={'row'} gap={'32px'} zIndex={10}>
          {features.map((item, index) => {
            const isSelected = index === selected;
            return (
              <ItemButton
                key={index}
                isSelected={isSelected}
                onClick={() => handleSelect(index)}
              >
                {item.icon}
                {isSelected && <SelectionRing />}
              </ItemButton>
            );
          })}
        </Stack>
      </Box>
      <Stack height={'80px'}>
        <Typography variant="body2" fontWeight={'bold'}>
          {features[selected].title}
        </Typography>
        <Typography variant="caption" maxWidth={'240px'}>
          {features[selected].description}
        </Typography>
      </Stack>
    </Stack>
  );
}
