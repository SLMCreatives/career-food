import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist, Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import Image from "next/image";
import uqshort from "@/public/uq-logo-short.png";
import { RefreshButton } from "@/components/refresh";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "UNITAR Career/Ramadan Food Finder",
  description:
    "The best way to determine your career path and ramadan food that suits you the best."
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
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 py-2">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}>
                      <Image
                        src={uqshort}
                        alt="UNITAR Logo"
                        width={50}
                        height={50}
                        className="w-14 h-14"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-row gap-2">
                    <RefreshButton />
                    <ThemeSwitcher />
                  </div>
                </div>
              </nav>
              <div className="flex flex-col gap-20 w-full p-0">{children}</div>

              {/* <footer className="w-full flex flex-col items-center justify-center border-t mx-auto text-center text-xs gap-0 py-2">
                <p>
                  Powered by{" "}
                  <a
                    href="https://unitar.my"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    UNITAR Digital Team
                  </a>
                  © 2025
                </p>
              </footer> */}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
