'use client';

import { Order } from '@/app/types';
import { ClipboardList, ChefHat, Bike, CheckCircle } from 'lucide-react';

interface DeliveryStatusProps {
  order: Order;
}

const steps = [
  { key: 'pending', label: 'Заказ\nпринят', Icon: ClipboardList },
  { key: 'preparing', label: 'Готовится', Icon: ChefHat },
  { key: 'in_delivery', label: 'В пути', Icon: Bike },
  { key: 'delivered', label: 'Доставлен', Icon: CheckCircle },
];

const statusOrder: Order['status'][] = ['pending', 'preparing', 'in_delivery', 'delivered'];

export function DeliveryStatus({ order }: DeliveryStatusProps) {
  const currentIndex = statusOrder.indexOf(order.status);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Статус заказа</h3>

      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-0" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-[#FF6B35] -z-0 transition-all duration-500"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, i) => {
          const isCompleted = i <= currentIndex;
          const isCurrent = i === currentIndex;

          return (
            <div key={step.key} className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                  isCompleted
                    ? 'bg-[#FF6B35] text-white'
                    : 'bg-gray-200 text-gray-400'
                } ${isCurrent ? 'ring-4 ring-[#FF6B35]/20 scale-110' : ''}`}
              >
                <step.Icon size={18} />
              </div>
              <span
                className={`text-xs mt-2 text-center whitespace-pre-line ${
                  isCompleted ? 'text-[#FF6B35] font-semibold' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
