import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import AuthProvider from "@/context/auth/authProvider";
import FileProvider from "@/context/file/fileProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "React nodeSend app",
  description: "App for send and share files, enjoy it!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <FileProvider>
            <div className="bg-gray-100 min-h-screen">
              <div className="container mx-auto">
                <Header />
                <main className="mt-10">{children}</main>
              </div>
            </div>
          </FileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
