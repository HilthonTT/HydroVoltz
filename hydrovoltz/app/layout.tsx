import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HydroVoltz",
  description: "Chat with your friends or family!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
