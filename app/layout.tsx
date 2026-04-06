import type {Metadata} from 'next';
import { Fraunces, DM_Sans } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'Cafe Potoba - Authentic Maharashtrian Cuisine',
  description: 'Authentic Maharashtrian street food and home-style Indian cuisine in Ilupeju, Lagos.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
