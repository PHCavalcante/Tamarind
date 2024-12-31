import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
} from "@clerk/nextjs";
import { TaskProvider } from "@/hooks/taskContext";
import { Metadata } from "next";
import "./globals.css";

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
    <ClerkProvider>
      <TaskProvider>
        <html lang="en">
          <body className="flex h-screen">
            <SignedOut>
              <div className="flex flex-col items-center justify-center w-full">
                <SignIn routing="hash" />
              </div>
            </SignedOut>
            <SignedIn>{children}</SignedIn>
          </body>
        </html>
      </TaskProvider>
    </ClerkProvider>
  );
}
