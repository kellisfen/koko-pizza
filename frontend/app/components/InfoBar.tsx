'use client';

interface StoreInfo {
  phone: string;
  email: string;
  deliveryTime: string;
  deliveryCost: string;
  address: string;
  workHours: {
    weekdays: string;
    weekend: string;
  };
  rating: string;
  reviewsCount: string;
}

const storeInfo: StoreInfo = {
  phone: '8 800 302-00-60',
  email: 'feedback@dodopizza.ru',
  deliveryTime: 'от 30 минут',
  deliveryCost: 'бесплатно',
  address: 'г. Владивосток, ул. Космонавтов, 1/2',
  workHours: {
    weekdays: '07:00 – 01:00',
    weekend: '08:00 – 01:00',
  },
  rating: '4.87',
  reviewsCount: '8 081',
};

export function InfoBar() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Phone */}
        <div className="flex items-start gap-2">
          <span className="text-xl">📞</span>
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Телефон</div>
            <a href="tel:88003020060" className="text-[#FF6B35] font-semibold hover:underline text-sm">
              {storeInfo.phone}
            </a>
            <div className="text-xs text-gray-500 mt-0.5">Звонок бесплатный</div>
          </div>
        </div>

        {/* Delivery time */}
        <div className="flex items-start gap-2">
          <span className="text-xl">⏱️</span>
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Доставка</div>
            <div className="font-semibold text-gray-800 text-sm">{storeInfo.deliveryTime}</div>
            <div className="text-xs text-green-600 font-medium">{storeInfo.deliveryCost}</div>
          </div>
        </div>

        {/* Work hours */}
        <div className="flex items-start gap-2">
          <span className="text-xl">🕐</span>
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Режим работы</div>
            <div className="text-xs text-gray-700 font-medium">Пн-Пт: {storeInfo.workHours.weekdays}</div>
            <div className="text-xs text-gray-500">Сб-Вс: {storeInfo.workHours.weekend}</div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-start gap-2">
          <span className="text-xl">⭐</span>
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Рейтинг</div>
            <div className="font-semibold text-gray-800 text-sm">{storeInfo.rating}</div>
            <div className="text-xs text-gray-500">{storeInfo.reviewsCount} отзывов</div>
          </div>
        </div>
      </div>

      {/* Address bar */}
      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
        <span className="text-base">📍</span>
        <span className="text-sm text-gray-600">{storeInfo.address}</span>
      </div>
    </div>
  );
}
