import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Oktavianus Jeffry — Software Testing & Quality Engineering',
  description: 'Personal portfolio of Oktavianus Jeffry, a software quality assurance professional focused on testing, automation, finance, and insurance systems.',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  themeColor: '#050505',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
