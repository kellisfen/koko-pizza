'use client';

import { useState } from 'react';
import { MenuItemCard, BannerCarousel, InfoBar, HalfPizzaSelector, KidsSection, VeganSection, RecommendSection, AddressSelector, SizeSelector } from '@/app/components';
import { menuItems, categories } from '@/app/data/menu';
import { banners } from '@/app/data/banners';
import { Category, MenuItem } from '@/app/types';
import { useCart } from '@/app/context/CartContext';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [showHalfPizza, setShowHalfPizza] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { addToCart, setAddress } = useCart();

  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory);

  // Вегетарианские пиццы — 4 штуки с картинками
  const veganIds = [
    '000d3a26b5b080e611e79f5db5fdf562', // Четыре сыра
    '000d3a240c71be9a11e719be2ab1f41e', // Сырная
    '000d3a240c71be9a11e719be2ab1ed0b', // Маргарита
    '11ebcf68a3a311738aebb7ec0df069a0', // Овощи и грибы
  ];
  const veganItems = menuItems.filter((item) => veganIds.includes(item.id));

  // Соусы — 4 штуки
  const sauceIds = [
    '000d3a240c71be9a11e719be2ab264a6', // Сырный
    '11ecc9d29bacc18d6dc677d4f09e15d0', // Чесночный
    '000d3a240c71be9a11e71f3e39356469', // Барбекю
    '11ea89eb9010cd555372bcbdde9889c0', // Малиновое варенье
  ];
  const sauces = menuItems.filter((item) => sauceIds.includes(item.id));

  const handleSauceAdd = (sauce: MenuItem) => {
    addToCart(sauce);
  };

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

        {/* Kids Section */}
        <div className="max-w-6xl mx-auto px-4">
          <KidsSection />
        </div>

        {/* Vegan Section */}
        <div className="max-w-6xl mx-auto px-4">
          <VeganSection items={veganItems} onItemClick={(item) => setSelectedItem(item)} />
        </div>

        {/* Recommend Section — Sauces */}
        <div className="max-w-6xl mx-auto px-4">
          <RecommendSection sauces={sauces} onAddSauce={handleSauceAdd} />
        </div>

        {/* Delivery Address */}
        <div className="max-w-6xl mx-auto px-4 mb-6">
          <button
            onClick={() => setShowAddress(true)}
            className="w-full flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4 hover:border-[#FF6B35] hover:shadow-sm transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📍</span>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-500">Адрес доставки</p>
                <p className="text-gray-800 font-medium">Владивосток</p>
              </div>
            </div>
            <span className="text-[#FF6B35] text-sm font-medium">Изменить →</span>
          </button>
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
        {showAddress && <AddressSelector onClose={() => setShowAddress(false)} onSelect={(addr) => { setAddress(addr); setShowAddress(false); }} />}
        {selectedItem && <SizeSelector item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </section>
    </div>
  );
}
