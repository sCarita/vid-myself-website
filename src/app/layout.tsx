import type { Metadata } from "next";
import { StepProvider } from "./context/StepContext";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VidMySelf.ai",
  description: "VidMySelf.ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased font-inter min-h-screen flex flex-col`}
      >
        <StepProvider>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </StepProvider>
      </body>
    </html>
  );
}
