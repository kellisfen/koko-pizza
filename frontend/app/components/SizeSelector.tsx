'use client';

import { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { pizzaSizes } from '@/app/data/sizes';
import { toppings, Topping } from '@/app/data/toppings';
import { MenuItem } from '@/app/types';

interface SizeSelectorProps {
  item: MenuItem;
  onClose: () => void;
}

type Step = 'size' | 'toppings';

export function SizeSelector({ item, onClose }: SizeSelectorProps) {
  const { addToCart } = useCart();
  const sizes = pizzaSizes[item.id] || [];

  const [step, setStep] = useState<Step>('size');
  const [selectedSize, setSelectedSize] = useState<typeof sizes[0] | null>(
    sizes.length > 0 ? sizes[Math.floor(sizes.length / 2)] : null
  );
  const [selectedToppings, setSelectedToppings] = useState<Set<string>>(new Set());

  const toggleTopping = (id: string) => {
    setSelectedToppings((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toppingsTotal = Array.from(selectedToppings).reduce((sum, id) => {
    const t = toppings.find((tp) => tp.id === id);
    return sum + (t?.price ?? 0);
  }, 0);

  const totalPrice = (selectedSize?.price ?? 0) + toppingsTotal;

  const handleAdd = () => {
    if (!selectedSize) return;
    const selectedToppingsList = Array.from(selectedToppings)
      .map((id) => toppings.find((tp) => tp.id === id))
      .filter((tp): tp is Topping => tp !== undefined);

    const sizeItem: MenuItem = {
      ...item,
      id: selectedSize.id,
      price: totalPrice,
    };
    addToCart(sizeItem, selectedToppingsList);
    onClose();
  };

  const handleBack = () => {
    if (step === 'toppings') {
      setStep('size');
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-md overflow-hidden flex flex-col"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-40 bg-gray-100 flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://via.placeholder.com/600x300/e5e5e5/999999?text=${encodeURIComponent(item.name)}`;
            }}
          />
          <button
            onClick={handleBack}
            className="absolute top-3 left-3 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition"
          >
            ←
          </button>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition"
          >
            ✕
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h2 className="text-white text-xl font-bold">{item.name}</h2>
            {step === 'toppings' && selectedSize && (
              <p className="text-white/80 text-sm">
                {selectedSize.sizeName} · {selectedSize.price} ₽
              </p>
            )}
          </div>
        </div>

        {/* Step: Size */}
        {step === 'size' && (
          <div className="p-5 overflow-y-auto flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Выберите размер:</h3>
            <div className="space-y-3">
              {sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition ${
                    selectedSize?.id === size.id
                      ? 'border-[#FF6B35] bg-[#FF6B35]/5'
                      : 'border-gray-200 hover:border-[#FF6B35]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedSize?.id === size.id ? 'border-[#FF6B35] bg-[#FF6B35]' : 'border-gray-300'
                      }`}
                    >
                      {selectedSize?.id === size.id && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">{size.sizeName}</div>
                      <div className="text-sm text-gray-500">{size.size}</div>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-[#FF6B35]">{size.price} ₽</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep('toppings')}
              disabled={!selectedSize}
              className="w-full mt-6 bg-[#FF6B35] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#e55a2b] transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Добавить топпинги →
            </button>
          </div>
        )}

        {/* Step: Toppings */}
        {step === 'toppings' && (
          <div className="p-5 overflow-y-auto flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Добавьте топпинги:</h3>
            <p className="text-sm text-gray-500 mb-4">Выберите один или несколько</p>

            <div className="space-y-2">
              {toppings.map((tp) => {
                const isSelected = selectedToppings.has(tp.id);
                return (
                  <button
                    key={tp.id}
                    onClick={() => toggleTopping(tp.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition ${
                      isSelected ? 'border-[#FF6B35] bg-[#FF6B35]/5' : 'border-gray-200 hover:border-[#FF6B35]/50'
                    }`}
                  >
                    <img
                      src={tp.image}
                      alt={tp.name}
                      className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-800 text-sm">{tp.name}</div>
                      {tp.group !== 'Топпинги' && (
                        <div className="text-xs text-gray-400">{tp.group}</div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'border-[#FF6B35] bg-[#FF6B35]' : 'border-gray-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className={`text-sm font-semibold ${tp.price > 0 ? 'text-[#FF6B35]' : 'text-gray-400'}`}>
                        {tp.price > 0 ? `+${tp.price} ₽` : 'беспл.'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer always visible */}
        <div className="p-5 border-t border-gray-100 flex-shrink-0 bg-white">
          {step === 'toppings' && (
            <div className="flex items-center justify-between mb-3 text-sm">
              <span className="text-gray-500">
                {selectedToppings.size > 0
                  ? `${selectedToppings.size} топпинг${selectedToppings.size > 1 ? 'а' : ''}`
                  : 'Без топпингов'}
              </span>
              {toppingsTotal > 0 && (
                <span className="text-[#FF6B35] font-medium">+{toppingsTotal} ₽</span>
              )}
            </div>
          )}
          <button
            onClick={step === 'size' ? () => setStep('toppings') : handleAdd}
            disabled={step === 'size' && !selectedSize}
            className="w-full bg-[#FF6B35] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#e55a2b] transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {step === 'size'
              ? 'Добавить топпинги →'
              : `В корзину — ${totalPrice} ₽`}
          </button>
        </div>
      </div>
    </div>
  );
}
