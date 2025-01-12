import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Providers>
            <CommandPalette>
              <div className="min-h-screen bg-gradient-to-br from-background to-background/80 dark:from-background dark:to-background/80 flex flex-col">
                <Navbar />
                <main className="container mx-auto px-4 py-8 flex-grow">
                  {children}
                </main>
                <Footer />
                <Analytics />
              </div>
            </CommandPalette>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
