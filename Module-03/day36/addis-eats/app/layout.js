import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Discover delicious food in Addis Ababa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
