import React from 'react';
import { 
  X, 
  RotateCcw, 
  Check, 
  SlidersHorizontal, 
  Home, 
  DollarSign, 
  Bed, 
  Bath, 
  FileCheck, 
  Sparkles 
} from 'lucide-react';
import { FilterState, PropertyType, TransactionType } from '../types';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

const PROPERTY_TYPES: PropertyType[] = ['Rumah', 'Villa', 'Apartemen', 'Ruko & Komersial'];
const AMENITY_OPTIONS = [
  'Private Swimming Pool',
  'Private Heated Infinity Pool',
  'Akses Golf & Lake View',
  'Izin Komersial / Villa Wisata',
  'One Gate System & 24/7 Security',
  'Lift Pribadi (Private Elevator)',
  'Lantai Marmer Impor',
  'Smart Home & Digital Security',
  'Dekat Akses Pintu Tol',
];

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onResetFilters,
  totalResultsCount,
}) => {
  if (!isOpen) return null;

  const toggleAmenity = (amenity: string) => {
    const current = filters.amenities;
    if (current.includes(amenity)) {
      onFilterChange({ amenities: current.filter((a) => a !== amenity) });
    } else {
      onFilterChange({ amenities: [...current, amenity] });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs transition-opacity flex justify-end">
      <div 
        className="w-full max-w-md bg-white text-stone-900 h-full flex flex-col shadow-2xl border-l border-stone-200 animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-700" />
            <h2 className="font-bold text-lg text-stone-900 font-serif-title">Filter Detail Properti</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup filter"
            className="p-2 rounded-xl bg-white hover:bg-stone-200 text-stone-600 hover:text-stone-900 border border-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filter Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* 1. Keterangan Status Ketersediaan (Dijual vs Sold Out) */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2.5">
              Status Aset Properti
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['Semua', 'Dijual', 'Disewa', 'Sold Out'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => onFilterChange({ statusFilter: st })}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all text-center cursor-pointer ${
                    filters.statusFilter === st
                      ? st === 'Sold Out'
                        ? 'bg-rose-50 border-rose-600 text-rose-800 font-bold'
                        : 'bg-emerald-50 border-emerald-600 text-emerald-800 font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {st === 'Semua' ? 'Semua Status' : st === 'Sold Out' ? 'Terjual (Sold Out)' : `${st} (Tersedia)`}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Property Type */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2.5">
              Tipe Properti
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onFilterChange({ propertyType: 'Semua' })}
                className={`py-2.5 px-3 text-xs rounded-xl border text-left flex items-center justify-between cursor-pointer ${
                  filters.propertyType === 'Semua'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-800 font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>Semua Tipe</span>
                {filters.propertyType === 'Semua' && <Check className="w-3.5 h-3.5 text-emerald-700" />}
              </button>

              {PROPERTY_TYPES.map((pt) => (
                <button
                  key={pt}
                  type="button"
                  onClick={() => onFilterChange({ propertyType: pt })}
                  className={`py-2.5 px-3 text-xs rounded-xl border text-left flex items-center justify-between cursor-pointer ${
                    filters.propertyType === pt
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-800 font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>{pt}</span>
                  {filters.propertyType === pt && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Price Range (Min & Max) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Rentang Harga (Rp)
              </label>
              {(filters.minPrice || filters.maxPrice) && (
                <button
                  onClick={() => onFilterChange({ minPrice: null, maxPrice: null })}
                  className="text-[11px] text-emerald-700 hover:underline font-semibold cursor-pointer"
                >
                  Reset Harga
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-stone-500 mb-1 block font-medium">Harga Minimum</span>
                <select
                  value={filters.minPrice || ''}
                  onChange={(e) =>
                    onFilterChange({ minPrice: e.target.value ? Number(e.target.value) : null })
                  }
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:border-emerald-600 focus:outline-none"
                >
                  <option value="">Tanpa Min</option>
                  <option value="1000000000">Rp 1 Miliar</option>
                  <option value="2000000000">Rp 2 Miliar</option>
                  <option value="3000000000">Rp 3 Miliar</option>
                  <option value="5000000000">Rp 5 Miliar</option>
                  <option value="10000000000">Rp 10 Miliar</option>
                </select>
              </div>

              <div>
                <span className="text-[11px] text-stone-500 mb-1 block font-medium">Harga Maksimum</span>
                <select
                  value={filters.maxPrice || ''}
                  onChange={(e) =>
                    onFilterChange({ maxPrice: e.target.value ? Number(e.target.value) : null })
                  }
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:border-emerald-600 focus:outline-none"
                >
                  <option value="">Tanpa Batas</option>
                  <option value="2000000000">Rp 2 Miliar</option>
                  <option value="3500000000">Rp 3.5 Miliar</option>
                  <option value="5000000000">Rp 5 Miliar</option>
                  <option value="10000000000">Rp 10 Miliar</option>
                  <option value="20000000000">Rp 20 Miliar</option>
                </select>
              </div>
            </div>
          </div>

          {/* 4. Bedrooms & Bathrooms */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
                Jumlah Kamar Tidur (Min)
              </label>
              <div className="flex gap-2">
                {[null, 1, 2, 3, 4, 5].map((count) => (
                  <button
                    key={count ?? 'any'}
                    type="button"
                    onClick={() => onFilterChange({ minBedrooms: count })}
                    className={`flex-1 py-2 text-xs rounded-xl border transition-all cursor-pointer ${
                      filters.minBedrooms === count
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-800 font-bold'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {count === null ? 'Semua' : `${count}+`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
                Jumlah Kamar Mandi (Min)
              </label>
              <div className="flex gap-2">
                {[null, 1, 2, 3, 4].map((count) => (
                  <button
                    key={count ?? 'any-bath'}
                    type="button"
                    onClick={() => onFilterChange({ minBathrooms: count })}
                    className={`flex-1 py-2 text-xs rounded-xl border transition-all cursor-pointer ${
                      filters.minBathrooms === count
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-800 font-bold'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {count === null ? 'Semua' : `${count}+`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Legalitas & Sertifikat */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
              Jenis Sertifikat
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['Semua', 'SHM', 'HGB', 'Strata Title'].map((cert) => (
                <button
                  key={cert}
                  type="button"
                  onClick={() => onFilterChange({ certificate: cert })}
                  className={`py-2 text-xs rounded-xl border transition-all text-center cursor-pointer ${
                    filters.certificate === cert
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-800 font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {cert}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Ready Stock Switch */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <div>
              <span className="text-xs font-bold text-stone-900 block">Unit Siap Huni (Ready Stock)</span>
              <span className="text-[11px] text-stone-500">Hanya tampilkan properti yang sudah selesai dibangun</span>
            </div>
            <button
              type="button"
              onClick={() => onFilterChange({ readyStockOnly: !filters.readyStockOnly })}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                filters.readyStockOnly ? 'bg-emerald-600' : 'bg-stone-300'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  filters.readyStockOnly ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* 7. Fitur & Keunggulan Khusus */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2.5">
              Fitur & Keunggulan Kawasan
            </label>
            <div className="flex flex-wrap gap-2">
              {AMENITY_OPTIONS.map((amenity) => {
                const isSelected = filters.amenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-3 py-1.5 rounded-xl text-xs border transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-800 font-bold'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-emerald-700" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center gap-3">
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs text-center cursor-pointer"
          >
            Tampilkan {totalResultsCount} Unit Properti
          </button>
        </div>
      </div>
    </div>
  );
};
