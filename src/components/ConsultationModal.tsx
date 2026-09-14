import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MessageCircle, 
  Building, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Property } from '../types';
import { ZAHRANI_CONTACT } from '../utils/formatters';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperty?: Property | null;
  propertiesList: Property[];
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  selectedProperty,
  propertiesList,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [propertyCode, setPropertyCode] = useState(selectedProperty ? selectedProperty.code : 'UMUM');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prop = propertiesList.find((p) => p.code === propertyCode);
    const propTitle = prop ? prop.title : 'Konsultasi Portofolio Aset Properti Pilihan';

    const text = `Halo Bu Zahrani, saya ingin menjadwalkan konsultasi/survey properti:\n\n*Nama:* ${name}\n*No. HP/WA:* ${phone}\n*Unit Minat:* ${propTitle} (${propertyCode})\n*Rencana Tanggal Survey:* ${preferredDate || 'Menyesuaikan jadwal Bu Zahrani'}\n*Catatan Khusus:* ${notes || 'Mohon informasi ketersediaan unit dan detail legalitasnya.'}\n\nTerima kasih!`;

    window.open(`https://wa.me/${ZAHRANI_CONTACT.phoneRaw}?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-stone-200 text-stone-800 flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-stone-50 text-stone-900 flex items-center justify-between border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                alt="Zahrani"
                className="w-10 h-10 rounded-full object-cover object-top ring-2 ring-emerald-600/30 border border-white shadow-2xs"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white"></span>
            </div>
            <div>
              <h3 className="font-bold text-base font-serif-title text-stone-900">Jadwalkan Survey Bersama Zahrani</h3>
              <p className="text-[11px] text-stone-500">Pendampingan survey personal langsung bersama Zahrani</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup formulir"
            className="p-1.5 rounded-xl hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
              Nama Lengkap Anda *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Bpk. Hendra Gunawan"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
              Nomor WhatsApp Anda *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contoh: 0812-3456-7890"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
              Unit Properti yang Diminati
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={propertyCode}
                onChange={(e) => setPropertyCode(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-stone-900"
              >
                <option value="UMUM">-- Konsultasi Umum / Rekomendasi Sesuai Budget --</option>
                {propertiesList.map((p) => (
                  <option key={p.id} value={p.code}>
                    {p.title} ({p.code}) - {p.location.district}, {p.location.city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
              Rencana Tanggal Kunjungan / Survey
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
              Pertanyaan atau Catatan Khusus
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Ingin simulasi KPR bank BCA/Mandiri / cek legalitas sertifikat SHM"
              className="w-full p-3 rounded-xl border border-stone-300 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-stone-900 resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Kirim Permintaan Jadwal ke WhatsApp Zahrani</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Privasi nomor Anda dijamin aman & konsultasi gratis</span>
          </div>
        </form>
      </div>
    </div>
  );
};
