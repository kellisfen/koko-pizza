'use client';

import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/CartContext';
import { useState } from 'react';

export default function Header() {
  const { itemCount } = useCart();
  const { token, user, logout, login } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginEmail, loginPassword);
    if (success) {
      setShowLogin(false);
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl">🍕</span>
              <span className="text-2xl font-bold text-[#FF6B35]">Коко Пицца</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-700 hover:text-[#FF6B35] transition">
                Меню
              </Link>
              <Link href="/cart" className="text-gray-700 hover:text-[#FF6B35] transition">
                Корзина
              </Link>
              {token && (
                <Link href="/profile" className="text-gray-700 hover:text-[#FF6B35] transition">
                  Профиль
                </Link>
              )}
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/cart"
                className="relative flex items-center gap-2 bg-[#FF6B35] text-white px-4 py-2 rounded-lg hover:bg-[#e55a2b] transition"
              >
                <span>Корзина</span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-[#FF6B35] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>

              {token ? (
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm">{user?.name}</span>
                  <button
                    onClick={logout}
                    className="text-gray-500 hover:text-red-500 text-sm"
                  >
                    Выход
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="text-gray-600 hover:text-[#FF6B35] text-sm"
                >
                  Войти
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-2xl font-bold text-[#FF6B35] mb-4">Вход</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Пароль
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#FF6B35] text-white py-2 rounded-lg hover:bg-[#e55a2b] transition"
                >
                  Войти
                </button>
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
