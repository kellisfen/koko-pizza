'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/CartContext';
import { Order } from '@/app/types';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, total } = useCart();
  const { token, login, user, addOrder } = useAuth();
  const router = useRouter();
  const [address, setAddress] = useState('');
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

  const handleCheckout = () => {
    if (!token) {
      setShowLogin(true);
      return;
    }

    if (!address.trim()) {
      alert('Пожалуйста, укажите адрес доставки');
      return;
    }

    const order: Order = {
      id: 'order-' + Date.now(),
      items: [...items],
      total,
      address,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedTime: 45,
    };

    addOrder(order);
    clearCart();
    router.push(`/order/${order.id}`);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <span className="text-6xl mb-4 block">🛒</span>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Корзина пуста</h1>
        <p className="text-gray-500 mb-6">Добавьте что-нибудь вкусное!</p>
        <Link
          href="/"
          className="inline-block bg-[#FF6B35] text-white px-6 py-3 rounded-lg hover:bg-[#e55a2b] transition"
        >
          Перейти в меню
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Корзина</h1>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/80x80/e5e5e5/999999?text=${encodeURIComponent(item.name)}`;
              }}
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-[#FF6B35] font-medium">{item.price} ₽</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium text-gray-600">Итого:</span>
          <span className="text-2xl font-bold text-[#FF6B35]">{total} ₽</span>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Адрес доставки
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="ул. Пушкина, д. 10, кв. 5"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
          />
        </div>

        {!token && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-yellow-800 text-sm mb-2">
              Для оформления заказа необходимо авторизоваться
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="text-[#FF6B35] font-medium hover:underline"
            >
              Войти
            </button>
          </div>
        )}

        <button
          onClick={handleCheckout}
          disabled={!token}
          className="w-full bg-[#FF6B35] text-white py-3 rounded-lg font-semibold hover:bg-[#e55a2b] transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Оформить заказ
        </button>
      </div>

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
    </div>
  );
}
