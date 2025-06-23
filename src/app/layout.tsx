import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./css/globals.css";

export const metadata: Metadata = {
  title: "Rich text editor",
  description: "A rich text editor built with Next.js and React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
