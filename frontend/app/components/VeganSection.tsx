'use client';

import Image from 'next/image';
import { MenuItem } from '@/app/types';
import { Leaf, Pizza } from 'lucide-react';

interface VeganSectionProps {
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
}

export default function VeganSection({ items, onItemClick }: VeganSectionProps) {
  if (items.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Leaf size={24} className="text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">Вегетарианское</h2>
        <span className="text-sm text-gray-500 ml-auto">без мяса</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item)}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 text-left hover:shadow-md hover:border-[#FF6B35] transition-all group"
          >
            <div className="relative w-full aspect-square mb-2 bg-gray-100 rounded-lg overflow-hidden">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <Pizza size={32} />
                </div>
              )}
              {item.is_new && (
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Новинка
                </span>
              )}
            </div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">
              {item.name}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2 mb-2 min-h-[2.5rem]">
              {item.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#FF6B35]">от {item.price} ₽</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
