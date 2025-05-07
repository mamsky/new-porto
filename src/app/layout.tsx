import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import Provider from "@/lib/utils/provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata: Metadata = {
  title: "Portofolio",
  description: "create by paste prosmana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans antialiased transition duration-700 ease-in-out"
        )}
      >
        <Provider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
          <Toaster
            toastOptions={{
              unstyled: true,
              classNames: {
                error: "bg-red-500 flex gap-5 p-4 rounded-md",
                success:
                  "bg-green-500 text-white flex gap-5 px-4 py-2 rounded-md",
                warning:
                  "bg-yellow-500 text-white flex gap-5 px-4 py-2 rounded-md",
              },
            }}
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </Provider>
      </body>
    </html>
  );
}
