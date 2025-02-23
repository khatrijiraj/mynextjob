import Header from "@/components/Header";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import { ClerkThemeProvider } from "@/components/clerk-theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "mynextjob",
  description: "AI-POWERED CAREER ASSISTANCE",
  author: "@khatrijiraj",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen container mx-auto flex flex-col justify-between relative bg-background transition-colors">
        {/* Dynamic Background: Grid Only on Visible Viewport */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div
            className="w-full h-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_32px] 
            [mask-image:radial-gradient(ellipse_90%_80%_at_50%_0%,#000_70%,transparent_110%)] 
            dark:bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)]"></div>
        </div>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <ClerkThemeProvider>
            {/* header */}
            <Header />
            {/* main content */}
            <main className="z-10 mt-16">{children}</main>
            <Toaster richColors />
            {/* footer */}
            <Footer />
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
