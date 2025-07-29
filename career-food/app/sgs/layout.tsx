import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "SGS Leaderboard | UNITAR",
  description: "SGS Leaderboard for UNITAR Sept Intake"
};

export default function SgsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </>
  );
}
