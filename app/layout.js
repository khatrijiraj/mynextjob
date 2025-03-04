import Header from "@/components/Header";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import { ClerkThemeProvider } from "@/components/clerk-theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AppLoader from "@/components/AppLoader";

export const metadata = {
  title: "MyNextJob",
  description: "AI-POWERED CAREER ASSISTANCE",
  author: "@khatrijiraj",
  icons: {
    icon: "/favicon.ico", // Standard favicon
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Apple Touch icon for iOS
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Prevent body scrolling */}
      <body className="container bg-background transition-colors overflow-hidden">
        {/* Dynamic Background: Grid Only on Visible Viewport */}
        <div className="-z-10 fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div
            className="w-full h-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]
            bg-[size:14px_32px] [mask-image:radial-gradient(ellipse_90%_80%_at_50%_0%,#000_70%,transparent_110%)]
            dark:bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)]"></div>
        </div>

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange>
          <ClerkThemeProvider>
            {/* Fixed header */}
            <AppLoader>
              <Header />
              <main>{children}</main>
              <Footer />
              <Toaster richColors />
            </AppLoader>
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
