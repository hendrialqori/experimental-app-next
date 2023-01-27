import { Layout } from '@/components/layout';
import './globals.css';

interface TLayout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: TLayout) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
