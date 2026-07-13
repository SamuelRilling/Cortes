import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cortes",
  description: "Cortes Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
