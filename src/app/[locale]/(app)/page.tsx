import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ComponentProps } from 'react';

import DetailCard from '@/components/DetailCard';
import FeatureSlide from '@/components/FeatureSlide';

const featuresKey = [
  'ai-analysis',
  'risk-assessment',
  'fraud-detection',
] as const;

export default async function HomePage() {
  const t = await getTranslations('home');

  const features: ComponentProps<typeof FeatureSlide>['features'] =
    featuresKey.map(key => ({
      title: t(`features.${key}.title`),
      description: t(`features.${key}.description`),
      icon: (
        <Image
          src={`/icons/${key}.svg`}
          width={32}
          height={32}
          alt={key}
          priority
        />
      ),
    }));

  const howToUseContent = Array.from({ length: 3 }, (_, i) =>
    t(`howToUse.step${i + 1}`)
  );

  return (
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
      <Stack justifyContent={'left'} gap={1}>
        <Typography component={'h1'} variant="h4" fontWeight={'bold'}>
          {t('title')}
        </Typography>
        <Typography component={'h2'} variant="body1">
          {t('description')}
        </Typography>
      </Stack>
      <FeatureSlide features={features} />
      <DetailCard title={t('howToUse.title')} content={howToUseContent} />
    </Stack>
  );
}
