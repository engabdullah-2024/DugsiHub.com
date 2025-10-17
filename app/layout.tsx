import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Components/header";
import Footer from "./Components/footer";
import { ThemeProvider } from "./Components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dugsi Hub — Somalia’s Leading Grade 12 Exam Platform",
  description:
    "Dugsi Hub centralizes Past Papers, Auto-graded Quizzes, and Study Resources—in Af-Soomaali when possible— so learners can revise smarter, together.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialName: string | null = null; // or fetch/set actual value

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header initialName={initialName} />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
