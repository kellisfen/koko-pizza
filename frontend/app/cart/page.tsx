'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/CartContext';
import { Order, Topping } from '@/app/types';
import { pizzaSizes } from '@/app/data/sizes';
import { ShoppingCart, Check, X } from 'lucide-react';

const PROMO_CODES: Record<string, number> = {
  'FIRST15': 15,   // 15% скидка
  'DODO100': 100,  // 100 ₽ скидка
  'KOKO2026': 10,  // 10% скидка
};

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, total } = useCart();
  const { token, login, user, addOrder } = useAuth();
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginEmail, loginPassword);
    if (success) {
      setShowLogin(false);
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError('Неверный промокод');
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  // Calculate discount
  const discount = appliedPromo ? (appliedPromo === 'FIRST15' || appliedPromo === 'KOKO2026')
    ? Math.round(total * PROMO_CODES[appliedPromo] / 100)
    : PROMO_CODES[appliedPromo]
    : 0;
  const finalTotal = Math.max(0, total - discount);

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
      total: finalTotal,
      address,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedTime: 45,
    };

    addOrder(order);
    clearCart();
    router.push(`/order/${order.id}`);
  };

  const getItemSize = (itemId: string): string | null => {
    // Check if this item id matches a size variant id
    for (const [, sizes] of Object.entries(pizzaSizes)) {
      const found = sizes.find(s => s.id === itemId);
      if (found) return found.sizeName;
    }
    return null;
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingCart size={48} className="text-gray-300 mx-auto mb-4" />
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
        {items.map((item) => {
          const sizeName = getItemSize(item.id);
          return (
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
                {sizeName && (
                  <span className="text-xs text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-0.5 rounded mr-1">
                    {sizeName}
                  </span>
                )}
                {item.toppings && item.toppings.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {item.toppings.map((tp: Topping) => (
                      <span
                        key={tp.id}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                      >
                        {tp.name}
                        {tp.price > 0 && <span className="text-[#FF6B35]"> +{tp.price}₽</span>}
                      </span>
                    ))}
                  </div>
                )}
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
          );
        })}
      </div>

      {/* Promo code */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        {appliedPromo ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check size={18} className="text-green-500" />
              <span className="font-medium text-green-700">Промокод: {appliedPromo}</span>
              <span className="text-green-600">−{discount} ₽</span>
            </div>
            <button onClick={removePromo} className="text-gray-400 hover:text-red-500">
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => { setPromoInput(e.target.value); setPromoError(''); }}
              placeholder="Введите промокод"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
            />
            <button
              onClick={applyPromo}
              className="bg-[#FF6B35] text-white px-5 py-2 rounded-lg hover:bg-[#e55a2b] transition font-medium"
            >
              Применить
            </button>
          </div>
        )}
        {promoError && <p className="text-red-500 text-sm mt-1">{promoError}</p>}
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium text-gray-600">Итого:</span>
          <div className="text-right">
            {discount > 0 && (
              <span className="text-gray-400 line-through text-sm mr-2">{total} ₽</span>
            )}
            <span className="text-2xl font-bold text-[#FF6B35]">{finalTotal} ₽</span>
          </div>
        </div>

        {discount > 0 && (
          <div className="text-right text-green-600 text-sm mb-2">
            Скидка: −{discount} ₽
          </div>
        )}

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
