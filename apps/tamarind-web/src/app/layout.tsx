import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
} from "@clerk/nextjs";
import { TaskProvider } from "@/hooks/taskContext";
import { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import logo from "../assets/logo.svg";
export const metadata: Metadata = {
  title: "Tamarind",
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
              <div className="flex flex-col items-center justify-center w-full bg-gradient-to-tr from-[#F3EDED] via-rose-100 to-[#FFF9F9]">
                <Image width={200} src={logo} alt="Tamarind Logo"/>
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
