'use client';

import Link from 'next/link';
import { useState } from 'react';
import { menuItems } from '@/app/data/menu';
import { HalfPizzaSelector } from './HalfPizzaSelector';
import { SizeSelector } from './SizeSelector';

export function KidsSection() {
  const [showHalfPizza, setShowHalfPizza] = useState(false);
  const [selectedItem, setSelectedItem] = useState<typeof menuItems[0] | null>(null);

  // Kids items from menu — filter by known IDs
  const kidsIds = [
    '000d3a240c71be9a11e719be2a90ee5d', // Сырная
    '11eb85cab6450fe05435ca8f0b336e20', // Двойной цыпленок
    '000d3a2155a180e811e7ae576df861c4', // Куриные кусочки
    '000d3a38c306a94511e908d7080ef034', // Картофель из печи
    '11efac82a8127dff263ca67251a8fd11', // Хашбрауны 2 шт
  ];

  const kidsItems = menuItems.filter(item => kidsIds.includes(item.id));

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">👶 Любят дети</h2>
        <Link href="/?category=for_kids" className="text-[#FF6B35] text-sm font-medium hover:underline">
          Все →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {kidsItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <div className="aspect-square bg-gray-100 relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://via.placeholder.com/300x300/e5e5e5/999999?text=${encodeURIComponent(item.name)}`;
                }}
              />
              <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                👶
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1">{item.name}</h3>
              <p className="text-[#FF6B35] font-bold">от {item.price} ₽</p>
            </div>
          </div>
        ))}

        {/* Pizza of Halves card */}
        <div
          onClick={() => setShowHalfPizza(true)}
          className="bg-gradient-to-br from-[#FF6B35] to-[#ff8c5a] rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition flex flex-col items-center justify-center p-4 text-white min-h-[200px]"
        >
          <div className="text-4xl mb-2">🍕</div>
          <h3 className="font-bold text-center text-sm mb-1">Пицца из половинок</h3>
          <p className="text-white/80 text-xs text-center">2 пиццы на одной</p>
          <p className="text-white/90 text-xs mt-2 font-medium">от 730 ₽</p>
        </div>
      </div>

      {showHalfPizza && <HalfPizzaSelector onClose={() => setShowHalfPizza(false)} />}
      {selectedItem && (
        <SizeSelector item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  );
}
