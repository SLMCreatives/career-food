import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist, Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import Image from "next/image";
import uqshort from "@/public/uq-logo-short.png";
import { RefreshButton } from "@/components/refresh";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/chatbot/header-auth";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Persona Checker: Ramadan Edition",
  description:
    "Find out which Ramadan Food you are and which career you should pursue.",
  openGraph: {
    title: "Persona Checker: Ramadan Edition",
    description:
      "Find out which Ramadan Food you are and which career you should pursue.",
    url: defaultUrl,
    siteName: "Persona Checker: Ramadan Edition",
    locale: "en-US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Persona Checker: Ramadan Edition",
    description:
      "Find out which Ramadan Food you are and which career you should pursue."
  }
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"]
});

const poppins = Poppins({
  display: "swap",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className} suppressHydrationWarning>
      <body className="bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 text-foreground ">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex flex-col items-center min-h-screen">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-full flex justify-center h-16 py-2 bg-white">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}>
                      <Image
                        src="/unitar-logo.png"
                        alt="UNITAR Logo"
                        width={50}
                        height={50}
                        className="w-14 h-14"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-row gap-2">
                    {/*                     {!hasEnvVars ? <HeaderAuth /> : <HeaderAuth />}
                     */}{" "}
                    {/*                     <RefreshButton />
                     */}
                    {/*                     <ThemeSwitcher />
                     */}{" "}
                  </div>
                </div>
              </nav>
              <div className="flex flex-col gap-20 w-full p-0">{children}</div>

              <footer className="w-full flex flex-col items-center justify-center  mx-auto text-center text-white text-xs gap-0 py-2">
                <p>
                  Powered by{" "}
                  <a
                    href="https://unitar.my"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    UNITAR Digital Marketing Team
                  </a>{" "}
                  © 2025
                </p>
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
