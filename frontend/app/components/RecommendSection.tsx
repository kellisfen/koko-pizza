'use client';

import Image from 'next/image';
import { MenuItem } from '@/app/types';

interface RecommendSectionProps {
  sauces: MenuItem[];
  onAddSauce: (sauce: MenuItem) => void;
}

export default function RecommendSection({ sauces, onAddSauce }: RecommendSectionProps) {
  if (sauces.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🧂</span>
          <h2 className="text-lg font-bold text-gray-800">Рекомендуем к пицце</h2>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {sauces.map((sauce) => (
            <button
              key={sauce.id}
              onClick={() => onAddSauce(sauce)}
              className="flex-shrink-0 flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2 hover:border-[#FF6B35] hover:shadow-sm transition-all text-left min-w-[140px]"
            >
              <div className="w-8 h-8 relative bg-orange-50 rounded-md flex items-center justify-center text-lg flex-shrink-0">
                🧂
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{sauce.name}</p>
                <p className="text-sm font-bold text-[#FF6B35]">{sauce.price} ₽</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
