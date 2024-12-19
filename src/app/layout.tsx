import { Metadata } from "next";
import "./globals.css";
import Menu from "./components/Menu";
import Header from "./components/Header";
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
      <body className="flex gap-5 h-screen">
        <TaskProvider>
          <Menu />
          <div className="flex flex-col w-full gap-4">
            <Header />
            {children}
          </div>
        </TaskProvider>
      </body>
    </html>
  );
}
