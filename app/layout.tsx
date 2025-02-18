import type { Metadata } from "next";
import { iranSans, iranSansFaNum } from "./fonts";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shadcnui Jalali Date Picker",
  description: "Shadcnui Jalali Date Picker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${iranSansFaNum.className} ${iranSans.className} antialiased`}
      >
        <div className="px-3 sm:px-8 md:px-16 lg:px-22 py-4 grid gap-y-8">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
