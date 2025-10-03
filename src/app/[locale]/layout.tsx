import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { routing } from '@/plugins/i18n/routing';
import MuiProvider from '@/plugins/mui/Provider';
import { StoreProvider } from '@/stores/provider';

export const metadata: Metadata = {
  title: 'Statement IntelliScan',
  description:
    'AI-powered financial statement analysis and risk assessment tool',
  icons: {
    icon: '/icons/ai-analysis.svg',
  },
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <AppRouterCacheProvider>
          <NextIntlClientProvider>
            <StoreProvider>
              <MuiProvider>{children}</MuiProvider>
            </StoreProvider>
          </NextIntlClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
