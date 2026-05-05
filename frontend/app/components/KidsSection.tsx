'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HalfPizzaSelector } from './HalfPizzaSelector';

interface KidsItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

const kidsItems: KidsItem[] = [
  {
    id: '000d3a240c71be9a11e719be2a90ee5d',
    name: 'Сырная',
    price: 279,
    image: 'https://cdn.dodostatic.net/image/Ingredients/0198bf40e2987242886716627224c196',
    description: 'Классическая пицца с моцареллой',
  },
  {
    id: '11eb85cab6450fe05435ca8f0b336e20',
    name: 'Двойной цыпленок',
    price: 339,
    image: 'https://cdn.dodostatic.net/image/Ingredients/0198bf3e424371b49f0b8d7dbe320a70',
    description: 'Больше нежного цыпленка',
  },
  {
    id: '000d3a2155a180e811e7ae576df861c4',
    name: 'Куриные кусочки',
    price: 265,
    image: 'https://cdn.dodostatic.net/image/Ingredients/01980e87a1187122bb94b6d6a3a876c5',
    description: 'Сочные кусочки куриного филе',
  },
  {
    id: '000d3a38c306a94511e908d7080ef034',
    name: 'Картофель из печи',
    price: 149,
    image: 'https://cdn.dodostatic.net/image/Ingredients/019bd3d8e05c7916b49a779e4d430294',
    description: 'Запечённая картошечка с пряными специями',
  },
  {
    id: '11efac82a8127dff263ca67251a8fd11',
    name: 'Хашбрауны 2 шт',
    price: 119,
    image: 'https://cdn.dodostatic.net/image/Ingredients/01981875ae8e75239a409d63775530d8',
    description: 'Картофельные оладушки из печи',
  },
];

export function KidsSection() {
  const [showHalfPizza, setShowHalfPizza] = useState(false);

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
              <p className="text-[#FF6B35] font-bold">{item.price} ₽</p>
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
    </section>
  );
}
