'use client';

import { List, ListItem, Paper, styled, Typography } from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '8px',
  ...theme.applyStyles('light', {
    backgroundColor: theme.palette.grey[200],
  }),
}));

interface DetailCardProps {
  title: string;
  content: string[];
}

export default function DetailCard({ title, content }: DetailCardProps) {
  return (
    <StyledPaper sx={{ padding: '16px' }}>
      <Typography variant="body2" fontWeight={'bold'}>
        {title}
      </Typography>
      <List sx={{ listStyleType: 'decimal', pl: 2 }}>
        {content.map((item, index) => (
          <ListItem key={index} sx={{ display: 'list-item', padding: '0 0' }}>
            <Typography variant="body2">{item}</Typography>
          </ListItem>
        ))}
      </List>
    </StyledPaper>
  );
}
