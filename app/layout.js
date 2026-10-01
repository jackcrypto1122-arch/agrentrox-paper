import { Manrope } from 'next/font/google';
import './globals.css';
import { getAllChapters } from '@/lib/content';
import WhitepaperShell from '@/components/WhitepaperShell';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  title: 'Blackwood Protocol · Technical Whitepaper',
  description: 'The Agentic Execution Layer for Tokenized Equities on Robinhood Chain.',
  keywords: ['Blackwood Protocol', 'Whitepaper', 'Tokenized Equities', 'Robinhood Chain', 'Autonomous Agents', 'DEX Arbitrage', 'DeFi'],
  authors: [{ name: 'Blackwood Protocol Team' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  const chapters = getAllChapters();

  return (
    <html lang="en" className={manrope.variable}>
      <body className={manrope.className}>
        <WhitepaperShell chapters={chapters}>
          {children}
        </WhitepaperShell>
      </body>
    </html>
  );
}
