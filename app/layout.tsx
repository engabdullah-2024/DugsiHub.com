import { type Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Components/header";
import Footer from "./Components/footer";
import { ThemeProvider } from "./Components/theme-provider";
import { Toaster } from "sonner";

// NEW: path-aware banner wrapper (client)
import PathAwareBanner from "./Components/RegistrationBanner";
import WhatsappWidget from "./Components/WhatsappWidget";

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
    "Dugsi Hub centralizes Past Papers, Auto-graded Quizzes, and Study Resources—in Af-Soomaali when possible—so learners can revise smarter, together.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const initialName: string | null = null;

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Sonner Notifications */}
            <Toaster position="top-right" richColors />

            {/* 🔔 Registration banner (hidden on /dashboard, /u, auth routes) */}
            <PathAwareBanner
              deadline="2025-11-20T23:59:59+03:00"
              ctaHref="/register"
              storageKey="regBannerDismissed_v1"
              hideOn={["/dashboard", "/u", "/sign-in", "/sign-up"]}
            />

            {/* Header */}
            <Header initialName={initialName}>
              <div className="flex items-center gap-4">
                <SignedOut>
                  <SignInButton />
                  <SignUpButton>
                    <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </Header>

            {/* Main Content */}
            <main>{children}</main>

            <WhatsappWidget />

            {/* Footer */}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
