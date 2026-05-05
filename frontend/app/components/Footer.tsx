export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🍕</span>
              <span className="text-xl font-bold text-white">Коко Пицца</span>
            </div>
            <p className="text-sm text-gray-400">
              Доставка вкусной пиццы и других блюд в г. Владивосток. Быстро, качественно, с заботой о вас.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3">Контакты</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500">Телефон: </span>
                <a href="tel:88003020060" className="text-[#FF6B35] hover:underline">8 800 302-00-60</a>
                <span className="text-gray-500 ml-1">(бесплатно)</span>
              </div>
              <div>
                <span className="text-gray-500">Email: </span>
                <a href="mailto:feedback@koko.pizza" className="text-[#FF6B35] hover:underline">feedback@koko.pizza</a>
              </div>
              <div>
                <span className="text-gray-500">Адрес: </span>
                <span>г. Владивосток, ул. Космонавтов, 1/2</span>
              </div>
            </div>
          </div>

          {/* Work hours */}
          <div>
            <h3 className="text-white font-semibold mb-3">Режим работы</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Пн-Пт:</span>
                <span>07:00 – 01:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Сб-Вс:</span>
                <span>08:00 – 01:00</span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[#FF6B35]">⏱</span>
                  <span>Доставка от 30 минут</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <span className="text-green-400">✓</span>
                  <span>Бесплатно</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© 2026 Коко Пицца. Все права защищены.</p>
          <p>Аналог Dodo Pizza для образовательных целей</p>
        </div>
      </div>
    </footer>
  );
}
