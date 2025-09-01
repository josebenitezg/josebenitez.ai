import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import LayoutContent from "@/components/LayoutContent";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const serif = Merriweather({ subsets: ['latin'], weight: ['400','700'], variable: '--font-serif' });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${serif.variable}`}>
        <LayoutContent>
          {children}
        </LayoutContent>
        <Analytics />
      </body>
    </html>
  );
}
