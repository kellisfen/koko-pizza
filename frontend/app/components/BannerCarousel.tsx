'use client';

import { useState } from 'react';

export interface Banner {
  id: string;
  imageUrl: string;
  priority: number;
  title?: string;
  description?: string;
  promoCode?: string;
}

interface BannerCarouselProps {
  banners: Banner[];
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const [current, setCurrent] = useState(0);

  if (!banners.length) return null;

  const sorted = [...banners].sort((a, b) => a.priority - b.priority);

  const prev = () => setCurrent((c) => (c - 1 + sorted.length) % sorted.length);
  const next = () => setCurrent((c) => (c + 1) % sorted.length);

  return (
    <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden mb-8">
      <div className="w-full h-full">
        {sorted[current] && (
          <img
            src={sorted[current].imageUrl}
            alt={sorted[current].title || 'Акция'}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {sorted.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-800 font-bold shadow-md transition"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-800 font-bold shadow-md transition"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {sorted.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition ${
                  i === current ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}

      {sorted[current]?.promoCode && (
        <div className="absolute bottom-3 right-3 bg-white/90 px-3 py-1 rounded-lg text-sm font-mono">
          Промокод: {sorted[current].promoCode}
        </div>
      )}
    </div>
  );
}
