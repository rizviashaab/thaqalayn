import "./globals.css";

export const metadata = {
  title: "Thaqalayn — The Two Weighty Things",
  description:
    "Daily reflections from the Quran and the teachings of the Ahl al-Bayt, with sources.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
