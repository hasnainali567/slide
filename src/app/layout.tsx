import { Providers } from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css"; // Ensure your Tailwind styles are imported here

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
