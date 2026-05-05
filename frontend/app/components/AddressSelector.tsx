'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';

interface AddressSelectorProps {
  onSelect: (address: string, coords?: { lat: number; lng: number }) => void;
  onClose: () => void;
}

const PRESET_ADDRESSES = [
  { name: 'Центр города', address: 'г. Владивосток, ул. Фонтанная, 57', lat: 43.1167, lng: 131.9000 },
  { name: 'Городской пляж', address: 'г. Владивосток, ул. Набережная, 3', lat: 43.1125, lng: 131.8789 },
  { name: 'Вторая речка', address: 'г. Владивосток, ул. Русская, 59', lat: 43.1331, lng: 131.9186 },
  { name: 'Снеговая Падь', address: 'г. Владивосток, ул. Маковского, 130', lat: 43.0953, lng: 131.9322 },
  { name: 'Луговая', address: 'г. Владивосток, ул. Луговая, 21', lat: 43.1257, lng: 131.9256 },
];

export default function AddressSelector({ onSelect, onClose }: AddressSelectorProps) {
  const [custom, setCustom] = useState('');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md shadow-2xl max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Адрес доставки</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {PRESET_ADDRESSES.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onSelect(preset.address, { lat: preset.lat, lng: preset.lng })}
              className="w-full flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-orange-50 border border-gray-100 hover:border-[#FF6B35] transition-all text-left"
            >
              <MapPin size={16} className="text-[#FF6B35] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-800 text-sm">{preset.name}</p>
                <p className="text-xs text-gray-500">{preset.address}</p>
              </div>
            </button>
          ))}

          <div className="pt-2 border-t border-gray-200">
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Или введите свой адрес
            </label>
            <textarea
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="г. Владивосток, ул. Пушкинская, 46, кв. 12"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
              rows={2}
            />
            <button
              onClick={() => {
                if (custom.trim()) onSelect(custom.trim());
              }}
              disabled={!custom.trim()}
              className="mt-2 w-full bg-[#FF6B35] text-white py-3 rounded-xl font-semibold hover:bg-[#e55a2b] disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Подтвердить адрес
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
