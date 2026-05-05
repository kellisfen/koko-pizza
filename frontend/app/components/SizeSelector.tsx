'use client';

import { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { pizzaSizes } from '@/app/data/sizes';
import { MenuItem } from '@/app/types';

interface SizeSelectorProps {
  item: MenuItem;
  onClose: () => void;
}

export function SizeSelector({ item, onClose }: SizeSelectorProps) {
  const { addToCart } = useCart();
  const sizes = pizzaSizes[item.id] || [];

  // Also find the base item data (image) from menu
  const [selectedSize, setSelectedSize] = useState<typeof sizes[0] | null>(
    sizes.length > 0 ? sizes[Math.floor(sizes.length / 2)] : null // default to middle (usually "Средняя")
  );

  const handleAdd = () => {
    if (!selectedSize) return;
    // Create a modified item with the selected size's id and price
    const sizeItem: MenuItem = {
      ...item,
      id: selectedSize.id,
      price: selectedSize.price,
    };
    addToCart(sizeItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative h-48 bg-gray-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://via.placeholder.com/600x300/e5e5e5/999999?text=${encodeURIComponent(item.name)}`;
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition"
          >
            ✕
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h2 className="text-white text-xl font-bold">{item.name}</h2>
            <p className="text-white/80 text-sm">{item.description}</p>
          </div>
        </div>

        {/* Size options */}
        <div className="p-5">
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
                      selectedSize?.id === size.id
                        ? 'border-[#FF6B35] bg-[#FF6B35]'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedSize?.id === size.id && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
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

          {/* Add button */}
          <button
            onClick={handleAdd}
            disabled={!selectedSize}
            className="w-full mt-6 bg-[#FF6B35] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#e55a2b] transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Добавить в корзину
            {selectedSize && (
              <span className="ml-2">— {selectedSize.price} ₽</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
