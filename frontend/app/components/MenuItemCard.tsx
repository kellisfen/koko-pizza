'use client';

import { MenuItem } from '@/app/types';
import { useCart } from '@/app/context/CartContext';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCart();

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
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>
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
