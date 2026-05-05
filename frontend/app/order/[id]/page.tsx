'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/CartContext';
import { Order } from '@/app/types';
import { DeliveryStatus } from '@/app/components';

const statusLabels: Record<Order['status'], string> = {
  pending: 'Ожидает',
  preparing: 'Готовится',
  in_delivery: 'В пути',
  delivered: 'Доставлен',
};

const statusColors: Record<Order['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  preparing: 'bg-orange-100 text-orange-800',
  in_delivery: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
};

export default function OrderPage() {
  const params = useParams();
  const { orders } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const found = orders.find((o) => o.id === params.id);
    if (found) {
      setOrder(found);
      setTimeLeft(found.estimatedTime * 60);
    }
  }, [params.id, orders]);

  useEffect(() => {
    if (!order || order.status === 'delivered') return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [order]);

  if (!order) {
    return (
      <div className="text-center py-16">
        <span className="text-6xl mb-4 block">📦</span>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Заказ не найден</h1>
        <Link
          href="/"
          className="inline-block bg-[#FF6B35] text-white px-6 py-3 rounded-lg hover:bg-[#e55a2b] transition"
        >
          На главную
        </Link>
      </div>
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/profile" className="text-[#FF6B35] hover:underline mb-4 inline-block">
        ← Назад к профилю
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Заказ #{order.id.slice(-6)}</h1>

      <DeliveryStatus order={order} />

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-4 py-2 rounded-full font-medium ${statusColors[order.status]}`}
          >
            {statusLabels[order.status]}
          </span>
          <span className="text-gray-500 text-sm">
            {new Date(order.createdAt).toLocaleString('ru-RU')}
          </span>
        </div>

        {order.status !== 'delivered' && timeLeft > 0 && (
          <div className="bg-[#FF6B35]/10 rounded-lg p-4 text-center mb-4">
            <p className="text-sm text-gray-600 mb-1">Осталось времени:</p>
            <p className="text-3xl font-bold text-[#FF6B35]">
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </p>
          </div>
        )}

        {order.status === 'delivered' && (
          <div className="bg-green-100 rounded-lg p-4 text-center mb-4">
            <p className="text-green-800 font-medium">Заказ доставлен! 🎉</p>
          </div>
        )}

        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Адрес доставки:</h3>
          <p className="text-gray-600">{order.address}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-700 mb-4">Состав заказа:</h3>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = `https://via.placeholder.com/48x48/e5e5e5/999999?text=${encodeURIComponent(item.name)}`;
                }}
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">x{item.quantity}</p>
              </div>
              <p className="font-medium text-[#FF6B35]">
                {item.price * item.quantity} ₽
              </p>
            </div>
          ))}
        </div>
        <div className="border-t mt-4 pt-4 flex justify-between items-center">
          <span className="text-lg font-medium text-gray-600">Итого:</span>
          <span className="text-xl font-bold text-[#FF6B35]">{order.total} ₽</span>
        </div>
      </div>
    </div>
  );
}
