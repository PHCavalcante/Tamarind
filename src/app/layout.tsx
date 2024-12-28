import { Metadata } from "next";
import "./globals.css";
import { TaskProvider } from "@/hooks/taskContext";

export const metadata: Metadata = {
  title: "Todo-app",
  description: "description placeholder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen">
          <TaskProvider>
            {children}
          </TaskProvider>
      </body>
    </html>
  );
}
