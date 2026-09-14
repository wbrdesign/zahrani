import React from 'react';
import { 
  X, 
  Trash2, 
  Heart, 
  MessageCircle, 
  Eye, 
  MapPin, 
  Building 
} from 'lucide-react';
import { Property } from '../types';
import { formatRupiahShort, ZAHRANI_CONTACT } from '../utils/formatters';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteIds: string[];
  allProperties: Property[];
  onRemoveFavorite: (id: string) => void;
  onClearFavorites: () => void;
  onSelectProperty: (property: Property) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favoriteIds,
  allProperties,
  onRemoveFavorite,
  onClearFavorites,
  onSelectProperty,
}) => {
  if (!isOpen) return null;

  const favoriteProperties = allProperties.filter((p) => favoriteIds.includes(p.id));

  const handleConsultFavorites = () => {
    if (favoriteProperties.length === 0) return;
    const list = favoriteProperties.map((p) => `- ${p.title} (${p.code}) [${formatRupiahShort(p.price)}]`).join('\n');
    const text = `Halo Bu Zahrani, saya telah menyimpan beberapa unit properti di website Anda dan ingin menanyakan ketersediaannya:\n\n${list}\n\nApakah unit-unit tersebut masih tersedia untuk dijadwalkan survey? Terima kasih!`;
    window.open(`https://wa.me/${ZAHRANI_CONTACT.phoneRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div 
        className="w-full max-w-md bg-white text-stone-800 h-full flex flex-col shadow-2xl border-l border-stone-200 animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50 text-stone-900">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="font-bold text-base font-serif-title text-stone-900">
              Properti Tersimpan ({favoriteProperties.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup daftar favorit"
            className="p-1.5 rounded-xl hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {favoriteProperties.length === 0 ? (
            <div className="py-16 text-center text-stone-400 space-y-3">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-300">
                <Heart className="w-7 h-7" />
              </div>
              <p className="text-sm font-medium text-stone-600">Belum ada properti yang disimpan</p>
              <p className="text-xs text-stone-400 max-w-xs mx-auto">
                Klik ikon hati pada unit properti untuk menyimpan hunian yang menarik bagi Anda.
              </p>
            </div>
          ) : (
            favoriteProperties.map((prop) => (
              <div
                key={prop.id}
                className="flex gap-3 p-3 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-white transition-all shadow-sm group"
              >
                <img
                  src={prop.featuredImage}
                  alt={prop.title}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono text-stone-500 bg-stone-200 px-1.5 py-0.2 rounded">
                        {prop.code}
                      </span>
                      <button
                        onClick={() => onRemoveFavorite(prop.id)}
                        title="Hapus dari tersimpan"
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                      className="font-semibold text-xs text-stone-900 truncate hover:text-emerald-700 cursor-pointer mt-0.5"
                    >
                      {prop.title}
                    </h4>
                    <div className="text-[11px] text-stone-500 truncate flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span>{prop.location.district}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold text-emerald-800 font-serif-title">
                      {formatRupiahShort(prop.price)}
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                      className="text-[11px] text-stone-700 hover:text-emerald-700 font-medium flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Detail</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {favoriteProperties.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50 space-y-2">
            <button
              onClick={handleConsultFavorites}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Tanyakan {favoriteProperties.length} Unit ke Zahrani (WhatsApp)</span>
            </button>

            <button
              onClick={onClearFavorites}
              className="w-full py-2 text-stone-500 hover:text-stone-800 text-xs transition-colors text-center"
            >
              Hapus Semua Properti Tersimpan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
