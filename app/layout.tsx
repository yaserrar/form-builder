import Footer from "@/components/footer";
import Header from "@/components/header";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ui-form-builder.vercel.app/"),
  keywords: [
    "Form builder",
    "Shadcn",
    "Shadcn ui",
    "React Hook Form",
    "Zod",
    "Tailwind CSS",
    "Next.js",
    "ReactJs",
  ],
  title: "Form builder - Shadcn, React Hook Form, Zod, Tailwind CSS, Next.js",
  description: "Form Builder Zod, ShadCN, and React Hook Form",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Header />
        <div className="container max-w-7xl mx-auto mt-4 p-2">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
