import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { Analytics } from "@vercel/analytics/next";

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
              <div className="layout-container bg-gradient-to-br from-background to-background/80 dark:from-background dark:to-background/80">
                <Navbar className="z-20" />
                <main className="main-content">
                  {children}
                </main>
                <Footer className="footer-container" />
              </div>
            </CommandPalette>
          </Providers>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
