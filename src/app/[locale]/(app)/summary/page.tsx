'use client';

import { ReportProblemOutlined as ReportProblemOutlinedIcon } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { StyledCard } from '@/components/CardItem';
import { PredictResult } from '@/constants/predictResult';
import { PredictFraudSuccessResponse } from '@/services/predict';

export default function SummaryPage() {
  const t = useTranslations('summary');
  const query = useSearchParams();
  const data = query.get('data');
  const parsedData = data
    ? JSON.parse(Buffer.from(data, 'base64').toString())
    : null;

  const isFraudData = (data: unknown): data is PredictFraudSuccessResponse => {
    return (
      (data as PredictFraudSuccessResponse).prediction === PredictResult.FRAUD
    );
  };

  return (
    <Stack
      justifyContent={'flex-start'}
      sx={{
        padding: '10vh 12px 0',
        height: '100%',
        gap: '32px',
        overflowY: 'hidden',
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

      {data && isFraudData(parsedData) ? (
        <>
          <StyledCard
            flexDirection={'row'}
            alignItems={'center'}
            sx={{
              backgroundColor: 'secondary.main',
              color: 'secondary.contrastText',
              padding: '20px',
              gap: '16px',
            }}
          >
            <ReportProblemOutlinedIcon color="warning" sx={{ fontSize: 42 }} />
            <Typography
              variant="body2"
              sx={{ flex: 1 }}
              whiteSpace={'pre-line'}
            >
              {t('confidence', { value: parsedData.confidence * 100 })}
            </Typography>
          </StyledCard>

          <Stack
            sx={{
              flex: 1,
              gap: '16px',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {parsedData.transactions.map((item, index) => {
              const { fraud_score, is_fraud, code_channel_raw, ...rest } = item;
              return (
                <StyledCard key={index} flexDirection={'column'}>
                  {Object.entries(rest).map(([key, value]) => (
                    <Typography
                      key={key}
                      variant="caption"
                      sx={{ flex: 1 }}
                      whiteSpace={'pre-line'}
                    >
                      {t(`transaction.${key}`, { value: String(value) })}
                    </Typography>
                  ))}
                </StyledCard>
              );
            })}
          </Stack>
        </>
      ) : (
        <div style={{ textAlign: 'center' }}>{t('noData')}</div>
      )}
    </Stack>
  );
}
