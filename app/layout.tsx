import { Inter } from "next/font/google";
import "./globals.css";
import Warnings from "./components/warnings";
import { workflowId } from "./assistant-config";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Agent Builder Quickstart",
  description: "Template voor de OpenAI Agent Builder workflow integratie",
  icons: {
    icon: "/openai.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {workflowId ? children : <Warnings />}
        <img className="logo" src="/openai.svg" alt="OpenAI Logo" />
      </body>
    </html>
  );
}
