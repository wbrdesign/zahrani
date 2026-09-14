import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  FileCheck, 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Calendar, 
  Briefcase, 
  MapPin, 
  Check,
  ArrowDown
} from 'lucide-react';
import { ZAHRANI_CONTACT, generateWhatsAppUrl } from '../utils/formatters';

interface AboutZahraniProps {
  onOpenConsultation: () => void;
  onScrollToProperties?: () => void;
}

export const AboutZahrani: React.FC<AboutZahraniProps> = ({ onOpenConsultation, onScrollToProperties }) => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Verifikasi Legalitas 100% Aman',
      desc: 'Pengecekan keabsahan sertifikat (SHM/HGB), validasi BPN di wilayah terkait, bebas sengketa, serta pendampingan notaris PPAT resmi.',
    },
    {
      icon: TrendingUp,
      title: 'Analisa ROI & Yield Riil',
      desc: 'Perhitungan kalkulasi proyeksi sewa villa di Bali & Batu serta apresiasi modal (capital gain) hunian prestisius di Jakarta & Surabaya.',
    },
    {
      icon: FileCheck,
      title: 'Pendampingan KPR Nasional Tuntas',
      desc: 'Kerja sama erat dengan perbankan nasional untuk fasilitas appraisal cepat, suku bunga promo terendah, dan asistensi berkas.',
    },
    {
      icon: Briefcase,
      title: 'Kurasi Aset & Transparansi Status',
      desc: 'Menampilkan kepastian status unit Dijual atau Terjual (Sold Out) secara jujur, dengan opsi unit alternatif berkualitas setara.',
    },
  ];

  const bankPartners = [
    'Bank BCA',
    'Bank Mandiri',
    'Bank BNI',
    'Bank BRI',
    'Bank CIMB Niaga',
    'Bank BTN',
  ];

  return (
    <section id="tentang" className="py-4 sm:py-16 bg-white text-stone-900 relative overflow-hidden">
      {/* Subtle architectural dot grid background */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#047857 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Clean Profile Info & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-start">
          
          {/* Left Column: Clean Profile Summary with Small Circular Photo */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-5">
            <div className="bg-stone-50 rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 border border-stone-200 shadow-xs space-y-3 sm:space-y-6">
              
              {/* Profile Header: Small Circular Photo */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
                    alt="Zahrani Property Consultant"
                    className="w-13 h-13 sm:w-20 sm:h-20 rounded-full object-cover object-top ring-3 sm:ring-4 ring-emerald-600/20 shadow-sm border-2 border-white"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>

                <div className="space-y-0.5 sm:space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-lg sm:text-2xl font-bold font-serif-title text-stone-900">Zahrani</h3>
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                  </div>
                  <p className="text-[11px] sm:text-xs font-semibold text-stone-600">
                    Senior Property Advisor & Real Estate Consultant
                  </p>
                  <div className="flex items-center gap-1 text-[11px] sm:text-xs text-emerald-700 font-medium">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>Cakupan Pasar Seluruh Indonesia</span>
                  </div>
                </div>
              </div>

              {/* Verified Credentials Pills */}
              <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-stone-200/90 space-y-1.5 sm:space-y-2.5">
                <div className="flex items-center justify-between text-[11px] sm:text-xs pb-1.5 sm:pb-2 border-b border-stone-100">
                  <span className="text-stone-500">Sertifikasi Resmi:</span>
                  <span className="font-mono font-bold text-stone-900 bg-emerald-50 text-emerald-800 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs">
                    AREBI No. 4912/ID
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] sm:text-xs pb-1.5 sm:pb-2 border-b border-stone-100">
                  <span className="text-stone-500">Rekam Jejak:</span>
                  <span className="font-semibold text-stone-900">10+ Tahun di Industri Properti</span>
                </div>
                <div className="flex items-center justify-between text-[11px] sm:text-xs">
                  <span className="text-stone-500">Total Transaksi:</span>
                  <span className="font-semibold text-emerald-700">Rp 450 Miliar+ Nilai Terkelola</span>
                </div>
              </div>

              {/* Area Coverage Highlight */}
              <div className="space-y-1.5 sm:space-y-2">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Fokus Cakupan Pasar Indonesia:
                </span>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                  <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-stone-200/80 flex items-center gap-1 sm:gap-1.5 font-medium text-stone-800">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">Jakarta (Pondok Indah)</span>
                  </div>
                  <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-stone-200/80 flex items-center gap-1 sm:gap-1.5 font-medium text-stone-800">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">Bali (Canggu & Seminyak)</span>
                  </div>
                  <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-stone-200/80 flex items-center gap-1 sm:gap-1.5 font-medium text-stone-800">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">Surabaya (CitraLand)</span>
                  </div>
                  <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-stone-200/80 flex items-center gap-1 sm:gap-1.5 font-medium text-stone-800">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">Bandung (Dago Pakar)</span>
                  </div>
                  <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-stone-200/80 flex items-center gap-1 sm:gap-1.5 font-medium text-stone-800">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">Kota Batu (Villa Wisata)</span>
                  </div>
                  <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-stone-200/80 flex items-center gap-1 sm:gap-1.5 font-medium text-stone-800">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">BSD City (Tangsel)</span>
                  </div>
                </div>
              </div>

              {/* Direct Office contact */}
              <div className="pt-1.5 sm:pt-2 text-[10px] sm:text-xs text-stone-500 border-t border-stone-200 flex flex-col gap-0.5 sm:gap-1">
                <span className="font-semibold text-stone-700">Hub Pelayanan:</span>
                <span className="truncate">{ZAHRANI_CONTACT.office}</span>
              </div>

            </div>
          </div>

          {/* Right Column: Bio, Philosophy & Credentials */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] sm:text-xs font-semibold mb-1.5 sm:mb-3">
                <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
                <span>Konsultasi Properti Terpercaya</span>
              </div>
              <h2 className="text-xl sm:text-4xl font-bold font-serif-title text-stone-950 tracking-tight leading-tight">
                Membantu Anda Memiliki Aset Properti Terbaik di Indonesia dengan Nyaman dan Aman
              </h2>
            </div>

            <p className="text-stone-700 text-xs sm:text-base leading-relaxed">
              Halo, saya <strong>Zahrani</strong>. Karakter pasar properti di berbagai wilayah Indonesia memiliki daya tarik unik tersendiri — mulai dari rumah mewah di pusat bisnis Jakarta & Surabaya, potensi return sewa harian villa di Bali & Kota Batu, hingga hunian prestisius di kawasan asri Bandung dan BSD.
            </p>

            <p className="text-stone-600 text-xs sm:text-base leading-relaxed">
              Saya memegang teguh prinsip transparansi dan profesionalisme. Setiap listing yang ditampilkan memiliki kepastian status apakah sedang <strong>Dijual</strong> atau telah <strong>Sold Out</strong>. Saya memastikan legalitas SHM dicek tuntas, negosiasi dilakukan terbuka langsung dengan pemilik, dan proses perbankan atau notaris berjalan lancar.
            </p>

            {/* Value Pillars 2x2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 pt-1 sm:pt-2">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-stone-50 border border-stone-200/90 shadow-xs space-y-1 sm:space-y-1.5">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900">{pillar.title}</h4>
                    <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1.5 sm:pt-3">
              <a
                href={generateWhatsAppUrl('Halo Bu Zahrani, saya membaca profil Anda dan ingin berkonsultasi mengenai rencana pembelian/investasi aset properti di Indonesia.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white/20" />
                <span>Konsultasi Privat via WhatsApp</span>
              </a>

              {onScrollToProperties && (
                <button
                  onClick={onScrollToProperties}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
                >
                  <span>Lihat Aset Properti</span>
                  <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                </button>
              )}

              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-semibold text-sm border border-stone-200 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>Jadwalkan Survey Lokasi</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bank Partner & Affiliation Section */}
        <div className="mt-14 pt-8 border-t border-stone-200">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Mitra Perbankan & Lembaga Finansial Terpercaya
            </span>
            <p className="text-xs text-stone-600 mt-1">
              Bekerja sama dengan perbankan nasional untuk fasilitas appraisal cepat dan suku bunga promo KPR terendah.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {bankPartners.map((bank) => (
              <div
                key={bank}
                className="px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{bank}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
