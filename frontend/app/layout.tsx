import type { Metadata } from "next";
import "./globals.css";
import { CartProvider, AuthProvider } from "./context/CartContext";
import { Header, Footer } from "./components";

export const metadata: Metadata = {
  title: "Коко Пицца - Доставка пиццы",
  description: "Вкусная пицца с доставкой на дом",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-6">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
