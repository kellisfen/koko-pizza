'use client';

import { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { halfPizzas } from '@/app/data/halves';
import { MenuItem } from '@/app/types';

interface HalfPizzaSelectorProps {
  onClose: () => void;
}

// Фейковый item для "Пицца из половинок" — нужен для addToCart
const HALF_ITEM: MenuItem = {
  id: 'half-pizza-custom',
  name: 'Пицца из половинок',
  price: 0,
  category: 'pizza',
  description: 'Выберите 2 любые пиццы на одну большую лепёшку',
};

export function HalfPizzaSelector({ onClose }: HalfPizzaSelectorProps) {
  const { addToCart } = useCart();
  const [leftHalf, setLeftHalf] = useState<typeof halfPizzas[0] | null>(null);
  const [rightHalf, setRightHalf] = useState<typeof halfPizzas[0] | null>(null);

  const totalPrice = (leftHalf?.price ?? 0) + (rightHalf?.price ?? 0);

  const handleAdd = () => {
    if (!leftHalf || !rightHalf) return;
    const combinedItem: MenuItem = {
      ...HALF_ITEM,
      price: totalPrice,
    };
    // Сохраняем комбинацию в toppings как {left, right}
    addToCart(combinedItem, [
      { id: 'half-left', name: leftHalf.name, image: '', price: leftHalf.price, group: 'Левая половина' },
      { id: 'half-right', name: rightHalf.name, image: '', price: rightHalf.price, group: 'Правая половина' },
    ] as any);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-lg overflow-hidden flex flex-col"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-32 bg-gradient-to-br from-[#FF6B35] to-[#ff8c5a] flex items-center justify-center flex-shrink-0">
          <div className="text-center">
            <div className="text-4xl mb-1">🍕</div>
            <h2 className="text-white text-xl font-bold">Пицца из половинок</h2>
            <p className="text-white/80 text-sm">Выберите 2 любые пиццы на одну большую</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/30 transition"
          >
            ✕
          </button>
        </div>

        {/* Half selectors */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          {/* Left half */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-[#FF6B35] text-white rounded-full flex items-center justify-center text-sm">1</span>
              Левая половина
              {leftHalf && <span className="text-[#FF6B35] text-sm ml-auto">{leftHalf.price} ₽</span>}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {halfPizzas.map((hp) => (
                <button
                  key={hp.id}
                  onClick={() => setLeftHalf(hp)}
                  className={`text-left p-2 rounded-lg border-2 transition text-sm ${
                    leftHalf?.id === hp.id
                      ? 'border-[#FF6B35] bg-[#FF6B35]/5'
                      : 'border-gray-200 hover:border-[#FF6B35]/40'
                  }`}
                >
                  <div className="font-medium text-gray-800 leading-tight">{hp.name}</div>
                  <div className="text-[#FF6B35] text-xs mt-0.5">{hp.price} ₽</div>
                </button>
              ))}
            </div>
          </div>

          {/* Right half */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-[#FF6B35] text-white rounded-full flex items-center justify-center text-sm">2</span>
              Правая половина
              {rightHalf && <span className="text-[#FF6B35] text-sm ml-auto">{rightHalf.price} ₽</span>}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {halfPizzas.map((hp) => (
                <button
                  key={hp.id}
                  onClick={() => setRightHalf(hp)}
                  className={`text-left p-2 rounded-lg border-2 transition text-sm ${
                    rightHalf?.id === hp.id
                      ? 'border-[#FF6B35] bg-[#FF6B35]/5'
                      : 'border-gray-200 hover:border-[#FF6B35]/40'
                  }`}
                >
                  <div className="font-medium text-gray-800 leading-tight">{hp.name}</div>
                  <div className="text-[#FF6B35] text-xs mt-0.5">{hp.price} ₽</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 flex-shrink-0 bg-white">
          {leftHalf && rightHalf && (
            <div className="mb-3 flex items-center justify-between text-sm">
              <div className="flex gap-3">
                <span className="text-gray-500">
                  <span className="font-medium text-gray-700">{leftHalf.name}</span>
                  {' + '}
                  <span className="font-medium text-gray-700">{rightHalf.name}</span>
                </span>
              </div>
              <span className="text-[#FF6B35] font-semibold">= {totalPrice} ₽</span>
            </div>
          )}
          <button
            onClick={handleAdd}
            disabled={!leftHalf || !rightHalf}
            className="w-full bg-[#FF6B35] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#e55a2b] transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {!leftHalf || !rightHalf
              ? 'Выберите 2 половины'
              : `В корзину — ${totalPrice} ₽`}
          </button>
        </div>
      </div>
    </div>
  );
}
