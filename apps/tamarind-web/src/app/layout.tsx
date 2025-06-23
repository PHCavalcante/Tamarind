import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
} from "@clerk/nextjs";
import { TaskProvider } from "@/hooks/taskContext";
import { ThemeProvider } from "next-themes";
import { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import logo from "../app/icon.png";
import { SnackProvider } from "@/hooks/snackbarContext";
export const metadata: Metadata = {
  title: "Tamarind",
  description: "description placeholder",
  icons: {
    icon: "./icon.png",
    apple: "./apple-icon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <TaskProvider>
        <SnackProvider>
          <html lang="en" suppressHydrationWarning>
            <body className="flex h-screen">
              <ThemeProvider attribute={"class"}>
                <SignedOut>
                  <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-tr from-[#F3EDED] via-rose-100 to-[#FFF9F9]">
                    <Image
                      width={200}
                      id="logo"
                      src={logo}
                      alt="Tamarind Logo"
                      className="-rotate-90 w-[15vw] h-[15vw] md:w-[10vw] md:h-[10vw] lg:w-[5vw] lg:h-[5vw]"
                    />
                    <SignIn routing="hash" />
                  </div>
                </SignedOut>
                <SignedIn>{children}</SignedIn>
              </ThemeProvider>
            </body>
          </html>
        </SnackProvider>
      </TaskProvider>
    </ClerkProvider>
  );
}
