import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "API Architecture Concepts",
  description: "Guide complet des concepts d'architecture API, des fondations jusqu'aux patterns avancés.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <main className="container animate-fade-in" style={{ minHeight: '100vh', padding: '4rem 2rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
