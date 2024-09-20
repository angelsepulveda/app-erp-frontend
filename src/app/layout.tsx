import type { Metadata } from 'next';
import { Noto_Sans_Display } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';

const noto = Noto_Sans_Display({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sistema ERP',
  description: 'Sistema de gestion empresarial',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto.className}>{children}</body>
    </html>
  );
}
