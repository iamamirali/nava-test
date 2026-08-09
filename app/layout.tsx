import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const customFont = localFont({
  src: '../fonts/IRANSansXV.woff2',
});

export const metadata: Metadata = {
  title: 'تست ناوا',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${customFont.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
