import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond, DM_Sans, Noto_Sans_Tamil, Fira_Code } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
  preload: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const notoTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-tamil",
  display: "swap",
  preload: false,
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fira-code",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "ShaadiPage — Beautiful Digital Wedding Invitations",
  description:
    "Create stunning digital wedding invitations in minutes. 6 premium templates crafted for Indian weddings. Share instantly via WhatsApp.",
  keywords: [
    "wedding invitation",
    "digital invitation",
    "Indian wedding",
    "shaadi",
    "wedding card online",
    "WhatsApp wedding invite",
  ],
  openGraph: {
    title: "ShaadiPage — Beautiful Digital Wedding Invitations",
    description:
      "Create stunning digital wedding invitations in minutes. Share instantly via WhatsApp.",
    type: "website",
    locale: "en_IN",
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
        className={`${greatVibes.variable} ${cormorant.variable} ${dmSans.variable} ${notoTamil.variable} ${firaCode.variable} font-sans antialiased`}
      >
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#2C1810",
              color: "#fff",
              fontFamily: "var(--font-dm-sans)",
              fontSize: "14px",
              borderRadius: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}
