import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Finance School | Master Financial Markets',
  description: 'Learn practical trading strategies, clear NISM certifications, and build real market skills with The Finance School.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23f97316%22/><path d=%22M50 20 L30 30 V55 C30 75 50 85 50 85 C50 85 70 75 70 55 V30 L50 20Z%22 fill=%22white%22 fill-opacity=%220.2%22 stroke=%22white%22 stroke-width=%224%22/><path d=%22M40 60 L48 52 L55 58 L63 50%22 stroke=%22white%22 stroke-width=%225%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 fill=%22none%22/></svg>',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">{children}</body>
    </html>
  );
}
