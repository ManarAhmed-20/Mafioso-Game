import type { Metadata } from "next";
import { Lalezar, Amiri } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const lalezar = Lalezar({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-lalezar",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

export const metadata: Metadata = {
  title: "لعبة مافيوسو",
  description: "لعبة غموض وتفكير",
  icons: {
    icon: "/logo.png", 
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${lalezar.variable} ${amiri.variable}`}>
      <body className="bg-[#F5EFE6] text-[#402E2A] font-amiri bg-cover bg-fixed" 
            style={{ backgroundImage: "url('/textures/parchment.jpg')" }}>
        
        <ClientLayout>
          {children}
        </ClientLayout>

      </body>
    </html>
  );
}