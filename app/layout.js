import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { getAllChapters } from '@/lib/content';
import WhitepaperShell from '@/components/WhitepaperShell';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: '400',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'Agentrox - Private by design, autonomous by nature. | Technical Whitepaper',
  description: 'Private by design, autonomous by nature. Swap tokenized stocks and crypto tokens with full privacy.',
  keywords: [
    'Agentrox',
    'AgentRox Protocol',
    'Whitepaper',
    'Private Swaps',
    'Tokenized Stocks',
    'Robinhood Chain',
    'Autonomous Trading Agents',
    'MEV Shield',
    'DeFi'
  ],
  authors: [{ name: 'Agentrox Team' }],
  metadataBase: new URL('https://www.agentrox.site'),
  openGraph: {
    title: 'Agentrox - Private by design, autonomous by nature. | Technical Whitepaper',
    description: 'Private by design, autonomous by nature. Swap tokenized stocks and crypto tokens with full privacy.',
    url: 'https://www.agentrox.site',
    siteName: 'Agentrox Protocol',
    images: [
      {
        url: '/agentrox-logo.jpeg',
        width: 800,
        height: 800,
        alt: 'Agentrox Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentrox - Private by design, autonomous by nature.',
    description: 'Private by design, autonomous by nature. Swap tokenized stocks and crypto tokens with full privacy.',
    creator: '@agentrox_',
    images: ['/agentrox-logo.jpeg'],
  },
  icons: {
    icon: '/agentrox-logo.jpeg',
    shortcut: '/agentrox-logo.jpeg',
    apple: '/agentrox-logo.jpeg',
  },
};

export default function RootLayout({ children }) {
  const chapters = getAllChapters();

  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className={instrumentSans.className}>
        <WhitepaperShell chapters={chapters}>
          {children}
        </WhitepaperShell>
      </body>
    </html>
  );
}
