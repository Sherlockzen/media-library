import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themesProvider";
import { GeistSans } from "geist/font/sans";

// const inter = Inter({ subsets: ["latin"] });
const inter = Inter({
 subsets: ["latin"],
});

export const metadata: Metadata = {
 title: "Media Library",
 description: "Uma nuvem",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html
   suppressHydrationWarning
   lang="pt-br"
   className={`${GeistSans.variable}`}
  >
   <body>
    <ThemeProvider defaultTheme="dark" attribute="class">
     {children}
    </ThemeProvider>
   </body>
  </html>
 );
}
