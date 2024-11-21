import localFont from 'next/font/local';
import './globals.css';

const futuraPT = localFont({
  src: [
    {
      path: '../public/fonts/FuturaCyrillicLight.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/FuturaCyrillicBook.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/FuturaCyrillicMedium.ttf',
      weight: '450',
      style: 'normal',
    },
    {
      path: '../public/fonts/FuturaCyrillicDemi.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/FuturaCyrillicHeavy.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-futura-pt',
  weight: '300 400 450 500 700',
});

export const metadata = {
  title: 'Qwick Websites',
  description: 'Qwick Websites',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${futuraPT.variable} antialiased`}>{children}</body>
    </html>
  );
}
