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
    <html lang="en" style={{ margin: 0, padding: 0, height: "100%" }}>
      <body style={{ margin: 0, padding: 0, height: "100%", overflow: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
