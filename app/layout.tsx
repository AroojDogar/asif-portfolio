import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-serif-display", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Mian Asif Langrah | Generative & Agentic AI Engineer",
  description:
    "Mian Asif Langrah: Generative & Agentic AI Engineer, Full-Stack Developer and Head of Program at PAIB. AI agents, chatbots, GPTs, Next.js and FastAPI.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${serif.variable} grain font-sans antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
