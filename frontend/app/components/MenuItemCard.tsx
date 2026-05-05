'use client';

import { MenuItem } from '@/app/types';
import { useCart } from '@/app/context/CartContext';
import { nutritionMap } from '@/app/data/nutrition';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCart();
  const nutrition = nutritionMap[item.id];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="aspect-[4/3] relative bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://via.placeholder.com/400x300/e5e5e5/999999?text=${encodeURIComponent(item.name)}`;
          }}
        />
        {item.is_new && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded font-medium">
            Новинка
          </span>
        )}
        {item.is_popular && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded font-medium">
            Хит
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{item.description}</p>

        {nutrition && (
          <div className="text-xs text-gray-400 mb-3 flex gap-3">
            <span>🔥 {nutrition.calories} ккал</span>
            <span>Б {nutrition.proteins}г</span>
            <span>Ж {nutrition.fats}г</span>
            <span>У {nutrition.carbohydrates}г</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-[#FF6B35]">{item.price} ₽</span>
          <button
            onClick={() => addToCart(item)}
            className="bg-[#FF6B35] text-white px-4 py-2 rounded-lg hover:bg-[#e55a2b] transition text-sm font-medium"
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}
