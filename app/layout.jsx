import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        cssLayerName: "clerk",
        theme: "simple",
      }}
    >
      <html lang="en">
        <body style={{ background: "#000", color: "#fff" }}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
