import Header from './components/Header';
import './globals.css';
import { Merriweather_Sans } from '@next/font/google';

const merri = Merriweather_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='h-full'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={`${merri.className} bg-slate-800 flex flex-col h-full`}>
        <Header />
        <main className='grow text-white'>{children}</main>
      </body>
    </html>
  );
}
