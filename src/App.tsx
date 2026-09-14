import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  SlidersHorizontal, 
  X, 
  Sparkles, 
  RotateCcw, 
  ArrowUpDown, 
  MessageCircle,
  CheckCircle,
  HelpCircle,
  Check,
  LayoutGrid,
  StretchHorizontal
} from 'lucide-react';
import { Property, FilterState, PropertyType } from './types';
import { PROPERTIES_DATA } from './data/properties';
import { Navbar } from './components/Navbar';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { FilterDrawer } from './components/FilterDrawer';
import { GallerySection } from './components/GallerySection';
import { AboutZahrani } from './components/AboutZahrani';
import { TestimonialsSection } from './components/TestimonialsSection';
import { KprCalculatorModal } from './components/KprCalculatorModal';
import { ConsultationModal } from './components/ConsultationModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { generateWhatsAppUrl } from './utils/formatters';

const INITIAL_FILTERS: FilterState = {
  keyword: '',
  location: '',
  transactionType: 'Semua',
  propertyType: 'Semua',
  statusFilter: 'Semua',
  minPrice: null,
  maxPrice: null,
  minBedrooms: null,
  minBathrooms: null,
  certificate: 'Semua',
  furnishing: 'Semua',
  readyStockOnly: false,
  amenities: [],
  sortBy: 'terbaru',
};

export default function App() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zahrani_favorites');
      return saved ? JSON.parse(saved) : ['prop-1', 'prop-3'];
    } catch {
      return ['prop-1', 'prop-3'];
    }
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isKprModalOpen, setIsKprModalOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [surveyTargetProperty, setSurveyTargetProperty] = useState<Property | null>(null);
  const [activeSection, setActiveSection] = useState('beranda');
  const [mobileViewMode, setMobileViewMode] = useState<'grid2' | 'single'>('grid2');

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('zahrani_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // Track active section for navbar highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['tentang', 'properti', 'galeri', 'testimoni'];
      const scrollY = window.scrollY + 120;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const handleScheduleSurvey = (property: Property) => {
    setSurveyTargetProperty(property);
    setIsConsultationOpen(true);
  };

  // Filtered and sorted properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((prop) => {
      // Status Filter: Semua | Dijual | Disewa | Sold Out
      if (filters.statusFilter && filters.statusFilter !== 'Semua') {
        if (filters.statusFilter === 'Dijual' && (prop.status !== 'Tersedia' || prop.transactionType !== 'Jual')) {
          return false;
        }
        if (filters.statusFilter === 'Disewa' && (prop.status !== 'Tersedia' || prop.transactionType !== 'Sewa')) {
          return false;
        }
        if (filters.statusFilter === 'Sold Out' && prop.status !== 'Terjual') {
          return false;
        }
      }

      // Location filter (city, district, province)
      if (filters.location && filters.location.trim()) {
        const loc = filters.location.toLowerCase();
        const matchesLoc = 
          prop.location.city.toLowerCase().includes(loc) ||
          prop.location.district.toLowerCase().includes(loc) ||
          prop.location.province.toLowerCase().includes(loc);
        if (!matchesLoc) return false;
      }

      // Keyword search (title, district, city, description)
      if (filters.keyword.trim()) {
        const q = filters.keyword.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesDistrict = prop.location.district.toLowerCase().includes(q);
        const matchesCity = prop.location.city.toLowerCase().includes(q);
        const matchesCode = prop.code.toLowerCase().includes(q);
        const matchesDesc = prop.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDistrict && !matchesCity && !matchesCode && !matchesDesc) {
          return false;
        }
      }

      // Transaction Type
      if (filters.transactionType !== 'Semua' && prop.transactionType !== filters.transactionType) {
        return false;
      }

      // Property Type
      if (filters.propertyType !== 'Semua' && prop.propertyType !== filters.propertyType) {
        return false;
      }

      // Min Price
      if (filters.minPrice !== null && prop.price < filters.minPrice) {
        return false;
      }

      // Max Price
      if (filters.maxPrice !== null && prop.price > filters.maxPrice) {
        return false;
      }

      // Min Bedrooms
      if (filters.minBedrooms !== null && prop.specs.bedrooms < filters.minBedrooms) {
        return false;
      }

      // Min Bathrooms
      if (filters.minBathrooms !== null && prop.specs.bathrooms < filters.minBathrooms) {
        return false;
      }

      // Certificate
      if (filters.certificate !== 'Semua' && prop.specs.certificate !== filters.certificate) {
        return false;
      }

      // Ready stock only
      if (filters.readyStockOnly && !prop.isReadyStock) {
        return false;
      }

      // Amenities (features match)
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((amenity) =>
          prop.features.some((f) => f.toLowerCase().includes(amenity.toLowerCase()) || amenity.toLowerCase().includes(f.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'harga-rendah') return a.price - b.price;
      if (filters.sortBy === 'harga-tinggi') return b.price - a.price;
      if (filters.sortBy === 'luas-bangunan') return b.specs.buildingArea - a.specs.buildingArea;
      return 0; // Default order (terbaru)
    });
  }, [filters]);

  // Counts for status
  const totalCount = PROPERTIES_DATA.length;
  const forSaleCount = PROPERTIES_DATA.filter((p) => p.status === 'Tersedia' && p.transactionType === 'Jual').length;
  const soldOutCount = PROPERTIES_DATA.filter((p) => p.status === 'Terjual').length;

  // Check if any non-default filter is active
  const hasActiveFilters =
    Boolean(filters.keyword) ||
    Boolean(filters.location) ||
    (Boolean(filters.statusFilter) && filters.statusFilter !== 'Semua') ||
    filters.transactionType !== 'Semua' ||
    filters.propertyType !== 'Semua' ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.minBedrooms !== null ||
    filters.minBathrooms !== null ||
    filters.certificate !== 'Semua' ||
    filters.readyStockOnly ||
    filters.amenities.length > 0;

  const scrollToProperties = () => {
    const el = document.getElementById('properti');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-emerald-700 selection:text-white">
      {/* 1. TOP NAVIGATION */}
      <Navbar
        favoriteCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenKprCalculator={() => setIsKprModalOpen(true)}
        onOpenConsultation={() => {
          setSurveyTargetProperty(null);
          setIsConsultationOpen(true);
        }}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* 2. TENTANG ZAHRANI (PERSONAL BRANDING, BIO & CREDENTIALS) */}
        <AboutZahrani
          onOpenConsultation={() => {
            setSurveyTargetProperty(null);
            setIsConsultationOpen(true);
          }}
          onScrollToProperties={scrollToProperties}
        />

        {/* 3. PROPERTY PORTFOLIO & FILTER SECTION (Aset Properti) */}
        <section id="properti" className="py-4 sm:py-16 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          
          {/* Section Heading & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-3 pb-2.5 sm:gap-6 sm:mb-8 sm:pb-6 border-b border-stone-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] sm:text-xs font-semibold mb-1 sm:mb-2">
                <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Portofolio Listing Terverifikasi</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-bold font-serif-title text-stone-950 tracking-tight">
                Aset Properti
              </h2>
              <p className="text-[11px] sm:text-sm text-stone-600 mt-0.5 sm:mt-1 max-w-2xl leading-relaxed">
                Portofolio aset residensial, villa, dan komersial pilihan di Indonesia dengan status transparan 
                (<strong>Dijual</strong> atau <strong>Sold Out</strong>) yang dikurasi langsung oleh Zahrani.
              </p>

              {/* Status Quick Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 sm:mt-4">
                <button
                  onClick={() => handleFilterChange({ statusFilter: 'Semua' })}
                  className={`px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                    !filters.statusFilter || filters.statusFilter === 'Semua'
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  Semua Aset ({totalCount})
                </button>

                <button
                  onClick={() => handleFilterChange({ statusFilter: 'Dijual' })}
                  className={`px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl text-xs font-semibold transition-all border cursor-pointer flex items-center gap-1.5 ${
                    filters.statusFilter === 'Dijual'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs font-bold'
                      : 'bg-white text-emerald-800 border-stone-200 hover:bg-emerald-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Dijual ({forSaleCount})
                </button>

                <button
                  onClick={() => handleFilterChange({ statusFilter: 'Sold Out' })}
                  className={`px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl text-xs font-semibold transition-all border cursor-pointer flex items-center gap-1.5 ${
                    filters.statusFilter === 'Sold Out'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs font-bold'
                      : 'bg-white text-rose-700 border-stone-200 hover:bg-rose-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Sold Out ({soldOutCount})
                </button>
              </div>
            </div>

            {/* Quick Filters Bar & Sort */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 self-start md:self-end">
              {/* Filter Drawer Toggle Button */}
              <button
                id="main-filter-btn"
                onClick={() => setIsFilterDrawerOpen(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  hasActiveFilters
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50 shadow-xs'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Filter Detail {hasActiveFilters && '(Aktif)'}</span>
              </button>

              {/* Sorting Dropdown */}
              <div className="flex items-center gap-1 bg-white border border-stone-300 rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs shadow-xs">
                <ArrowUpDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-400" />
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    handleFilterChange({
                      sortBy: e.target.value as FilterState['sortBy'],
                    })
                  }
                  aria-label="Urutkan properti"
                  className="bg-transparent border-none text-stone-700 font-medium focus:outline-none cursor-pointer pr-1"
                >
                  <option value="terbaru">Urutan: Terbaru</option>
                  <option value="harga-rendah">Harga: Terendah</option>
                  <option value="harga-tinggi">Harga: Tertinggi</option>
                  <option value="luas-bangunan">Luas Bangunan</option>
                </select>
              </div>

              {/* Reset if active */}
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="p-1.5 sm:p-2.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-stone-600 transition-colors shadow-xs cursor-pointer"
                  title="Reset Semua Filter"
                >
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-white rounded-2xl border border-stone-200 text-xs shadow-xs">
              <span className="text-stone-500 font-medium">Filter Aktif:</span>
              
              {filters.statusFilter && filters.statusFilter !== 'Semua' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 font-semibold">
                  <span>Status: {filters.statusFilter}</span>
                  <button onClick={() => handleFilterChange({ statusFilter: 'Semua' })} className="cursor-pointer">
                    <X className="w-3 h-3 text-emerald-700 hover:text-emerald-950" />
                  </button>
                </span>
              )}

              {filters.location && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 font-semibold">
                  <span>Wilayah: {filters.location}</span>
                  <button onClick={() => handleFilterChange({ location: '' })} className="cursor-pointer">
                    <X className="w-3 h-3 text-emerald-700 hover:text-emerald-950" />
                  </button>
                </span>
              )}

              {filters.keyword && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-300 text-stone-800">
                  <span>Kata kunci: "{filters.keyword}"</span>
                  <button onClick={() => handleFilterChange({ keyword: '' })} className="cursor-pointer">
                    <X className="w-3 h-3 text-stone-400 hover:text-stone-800" />
                  </button>
                </span>
              )}

              {filters.transactionType !== 'Semua' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-300 text-stone-800">
                  <span>Transaksi: Di{filters.transactionType.toLowerCase()}</span>
                  <button onClick={() => handleFilterChange({ transactionType: 'Semua' })} className="cursor-pointer">
                    <X className="w-3 h-3 text-stone-400 hover:text-stone-800" />
                  </button>
                </span>
              )}

              {filters.propertyType !== 'Semua' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-300 text-stone-800">
                  <span>Tipe: {filters.propertyType}</span>
                  <button onClick={() => handleFilterChange({ propertyType: 'Semua' })} className="cursor-pointer">
                    <X className="w-3 h-3 text-stone-400 hover:text-stone-800" />
                  </button>
                </span>
              )}

              {filters.minPrice && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-300 text-stone-800">
                  <span>Min: Rp {(filters.minPrice / 1000000000).toFixed(1)} M</span>
                  <button onClick={() => handleFilterChange({ minPrice: null })} className="cursor-pointer">
                    <X className="w-3 h-3 text-stone-400 hover:text-stone-800" />
                  </button>
                </span>
              )}

              {filters.maxPrice && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-300 text-stone-800">
                  <span>Maks: Rp {(filters.maxPrice / 1000000000).toFixed(1)} M</span>
                  <button onClick={() => handleFilterChange({ maxPrice: null })} className="cursor-pointer">
                    <X className="w-3 h-3 text-stone-400 hover:text-stone-800" />
                  </button>
                </span>
              )}

              {filters.minBedrooms && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-300 text-stone-800">
                  <span>{filters.minBedrooms}+ Kamar Tidur</span>
                  <button onClick={() => handleFilterChange({ minBedrooms: null })} className="cursor-pointer">
                    <X className="w-3 h-3 text-stone-400 hover:text-stone-800" />
                  </button>
                </span>
              )}

              {filters.readyStockOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-300 text-stone-800">
                  <span>Hanya Ready Stock</span>
                  <button onClick={() => handleFilterChange({ readyStockOnly: false })} className="cursor-pointer">
                    <X className="w-3 h-3 text-stone-400 hover:text-stone-800" />
                  </button>
                </span>
              )}

              <button
                onClick={handleResetFilters}
                className="text-emerald-700 hover:underline font-semibold ml-auto cursor-pointer"
              >
                Hapus Semua
              </button>
            </div>
          )}

          {/* Quick City Horizontal Pills (Swipeable on Mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 mb-2 sm:pb-2.5 sm:mb-4 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
            {[
              { label: 'Semua Wilayah', value: '' },
              { label: 'Jakarta', value: 'Jakarta' },
              { label: 'Bali', value: 'Bali' },
              { label: 'Kota Batu & Malang', value: 'Batu' },
              { label: 'Surabaya', value: 'Surabaya' },
              { label: 'Bandung', value: 'Bandung' },
              { label: 'BSD City', value: 'BSD' },
            ].map((city) => {
              const isSelected = (!filters.location && !city.value) || 
                (filters.location.toLowerCase() === city.value.toLowerCase());
              return (
                <button
                  key={city.label}
                  onClick={() => handleFilterChange({ location: city.value })}
                  className={`px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs font-semibold'
                      : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  {city.label}
                </button>
              );
            })}
          </div>

          {/* View Mode Bar: Result Count + 2 Kolom vs 1 Kolom Switcher */}
          <div className="flex items-center justify-between mb-2 pb-1.5 sm:mb-4 sm:pb-2.5 border-b border-stone-200/70">
            <div className="text-[11px] sm:text-xs text-stone-600 font-medium">
              Menampilkan <span className="font-bold text-stone-900">{filteredProperties.length}</span> Aset Properti
            </div>

            {/* View Mode Switcher (Khusus kenyamanan pengguna HP) */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-stone-200/80 p-0.5 rounded-lg sm:rounded-xl">
              <button
                type="button"
                onClick={() => setMobileViewMode('grid2')}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  mobileViewMode === 'grid2'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Tampilan 2 Kolom (Kompak, nyaman di HP)"
              >
                <LayoutGrid className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-700" />
                <span>2 Kolom</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileViewMode('single')}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  mobileViewMode === 'single'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Tampilan 1 Kolom Penuh"
              >
                <StretchHorizontal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-500" />
                <span>1 Kolom</span>
              </button>
            </div>
          </div>

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className={
              mobileViewMode === 'grid2'
                ? 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-8'
            }>
              {filteredProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  isFavorite={favorites.includes(prop.id)}
                  onToggleFavorite={toggleFavorite}
                  onSelectProperty={(p) => setSelectedProperty(p)}
                  isCompact={mobileViewMode === 'grid2'}
                />
              ))}
            </div>
          ) : (
            /* Empty State with Helpful Options */
            <div className="py-16 px-4 bg-white rounded-3xl border border-stone-200 text-center max-w-xl mx-auto space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 font-serif-title">
                Tidak Menemukan Properti Sesuai Filter
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-md mx-auto">
                Kriteria pencarian Anda mungkin terlalu spesifik. Coba reset filter atau hubungi Zahrani langsung untuk mencarikan unit off-market sesuai spesifikasi Anda.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Reset Filter Pencarian
                </button>
                <a
                  href={generateWhatsAppUrl('Halo Bu Zahrani, saya mencari unit properti khusus dengan kriteria tertentu yang belum saya temukan di website. Boleh dibantu carikan?')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>Carikan via WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </section>

        {/* 4. GALLERY ASSET OF MANAGED PROPERTIES */}
        <GallerySection />

        {/* 5. CLIENT TESTIMONIALS */}
        <TestimonialsSection />
      </main>

      {/* 7. FOOTER */}
      <Footer
        onOpenKprCalculator={() => setIsKprModalOpen(true)}
        onOpenConsultation={() => {
          setSurveyTargetProperty(null);
          setIsConsultationOpen(true);
        }}
      />

      {/* 8. MODALS & DRAWERS */}
      
      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
        onToggleFavorite={toggleFavorite}
        onScheduleSurvey={handleScheduleSurvey}
      />

      {/* Detailed Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalResultsCount={filteredProperties.length}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoriteIds={favorites}
        allProperties={PROPERTIES_DATA}
        onRemoveFavorite={toggleFavorite}
        onClearFavorites={() => setFavorites([])}
        onSelectProperty={(p) => setSelectedProperty(p)}
      />

      {/* Standalone KPR Calculator Modal */}
      <KprCalculatorModal
        isOpen={isKprModalOpen}
        onClose={() => setIsKprModalOpen(false)}
      />

      {/* Consultation & Survey Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedProperty={surveyTargetProperty}
        propertiesList={PROPERTIES_DATA}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Mobile Sticky Bottom Nav */}
      <MobileBottomNav
        favoriteCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenFilters={() => setIsFilterDrawerOpen(true)}
        onScrollToProperties={scrollToProperties}
      />
    </div>
  );
}
