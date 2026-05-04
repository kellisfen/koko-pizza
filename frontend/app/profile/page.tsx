'use client';

import Link from 'next/link';
import { useAuth } from '@/app/context/CartContext';
import { useRouter } from 'next/navigation';

const statusLabels: Record<string, string> = {
  pending: 'Ожидает',
  preparing: 'Готовится',
  in_delivery: 'В пути',
  delivered: 'Доставлен',
};

export default function ProfilePage() {
  const { token, user, logout, orders } = useAuth();
  const router = useRouter();

  if (!token) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <span className="text-6xl mb-4 block">👤</span>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Вход в профиль</h1>
        <p className="text-gray-500 mb-6">Авторизуйтесь, чтобы просматривать профиль и заказы</p>
        <button
          onClick={() => router.push('/')}
          className="inline-block bg-[#FF6B35] text-white px-6 py-3 rounded-lg hover:bg-[#e55a2b] transition"
        >
          На главную
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Профиль</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Личные данные</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-gray-500 w-24">Email:</span>
            <span className="text-gray-800">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 w-24">Имя:</span>
            <span className="text-gray-800">{user?.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 w-24">Телефон:</span>
            <span className="text-gray-800">{user?.phone}</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-4 text-red-500 hover:text-red-700 text-sm"
        >
          Выйти из аккаунта
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">История заказов</h2>
        
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <span className="text-4xl mb-3 block">📋</span>
            <p className="text-gray-500">У вас пока нет заказов</p>
            <Link
              href="/"
              className="inline-block mt-4 text-[#FF6B35] hover:underline"
            >
              Перейти в меню
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/order/${order.id}`}
                className="block border border-gray-200 rounded-lg p-4 hover:border-[#FF6B35] transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800">
                    Заказ #{order.id.slice(-6)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {order.items.length} {order.items.length === 1 ? 'товар' : 
                      order.items.length < 5 ? 'товара' : 'товаров'} • {order.total} ₽
                  </span>
                  <span className="text-[#FF6B35] font-medium">
                    {statusLabels[order.status]}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
