import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { cookieToInitialState } from "wagmi";
import Web3ModalProvider from "../../context";
import { config } from '../../config';
import { headers } from "next/headers";

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
  title: "UX- Heaven",
  description: "Getting to learn AppKits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Web3ModalProvider initialState={initialState}>
        {children}
        </Web3ModalProvider>
      </body>
    </html>
  );
}
