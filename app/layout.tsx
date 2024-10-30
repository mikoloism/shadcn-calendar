import type { Metadata } from "next";
import { iranSans, iranSansFaNum } from "./fonts";
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
        className={`${iranSansFaNum.className}, ${iranSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
