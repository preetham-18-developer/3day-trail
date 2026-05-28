import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StudentChatbot from "@/components/StudentChatbot";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CollegeHunt | The Premium College Discovery Platform",
  description: "Discover, compare, and apply to the best colleges in India with real-time analytics and AI predictions.",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23FF385C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-light/20 selection:bg-brand selection:text-white`}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
          <StudentChatbot />
        </AuthProvider>
      </body>
    </html>
  );
}
