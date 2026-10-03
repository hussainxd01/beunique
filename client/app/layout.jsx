import { Inter_Tight } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const font = Inter_Tight({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "beunique. | better skin starts with better care",
  description: "Daily skincare designed to nourish, hydrate, and support your skin barrier.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font.variable}>
      <body className="font-[family-name:var(--font-sans)] antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
