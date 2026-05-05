'use client';

import { useState } from 'react';
import { MenuItemCard, BannerCarousel, InfoBar, HalfPizzaSelector } from '@/app/components';
import { menuItems, categories } from '@/app/data/menu';
import { banners } from '@/app/data/banners';
import { Category } from '@/app/types';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [showHalfPizza, setShowHalfPizza] = useState(false);

  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Добро пожаловать в Коко Пицца!
        </h1>

        {/* Store Info Bar */}
        <InfoBar />

        {/* Banner Carousel */}
        <BannerCarousel banners={banners} />

        {/* Pizza of Halves Promo */}
        <div
          onClick={() => setShowHalfPizza(true)}
          className="mx-auto max-w-3xl mt-6 bg-gradient-to-r from-[#FF6B35] to-[#ff8c5a] rounded-2xl p-6 text-white cursor-pointer hover:from-[#e55a2b] hover:to-[#e57540] transition shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="text-5xl">🍕</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">Пицца из половинок</h2>
              <p className="text-white/80 text-sm">
                Выберите 2 любые пиццы на одну большую лепёшку — от 730 ₽
              </p>
            </div>
            <div className="text-3xl">→</div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2 rounded-full font-medium transition ${
              selectedCategory === 'all'
                ? 'bg-[#FF6B35] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Все
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as Category)}
              className={`px-5 py-2 rounded-full font-medium transition ${
                selectedCategory === cat.id
                  ? 'bg-[#FF6B35] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            В этой категории пока нет товаров
          </p>
        )}

        {showHalfPizza && <HalfPizzaSelector onClose={() => setShowHalfPizza(false)} />}
      </section>
    </div>
  );
}
