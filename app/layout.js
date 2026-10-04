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
  title: 'AgentRox Protocol · Technical Whitepaper',
  description: 'A privacy-first execution layer for tokenized stocks and crypto on Robinhood Chain.',
  keywords: ['AgentRox', 'AgentRox Protocol', 'Whitepaper', 'Tokenized Equities', 'Private Swaps', 'Robinhood Chain', 'Autonomous Agents', 'DeFi'],
  authors: [{ name: 'AgentRox Protocol Team' }],
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
