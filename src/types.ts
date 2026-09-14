export type PropertyType = 'Rumah' | 'Villa' | 'Apartemen' | 'Ruko & Komersial' | 'Tanah';
export type TransactionType = 'Jual' | 'Sewa';
export type CertificateType = 'SHM' | 'HGB' | 'Strata Title' | 'PPJB';

export interface Property {
  id: string;
  code: string;
  title: string;
  slug: string;
  propertyType: PropertyType;
  transactionType: TransactionType;
  price: number; // in Rupiah (e.g., 2500000000 for 2.5 M)
  pricePeriod?: 'bulan' | 'tahun'; // for rental
  location: {
    city: string;
    district: string;
    address: string;
    province: string;
    nearbyHighlights: string[];
  };
  specs: {
    bedrooms: number;
    bathrooms: number;
    landArea: number; // m² (LT)
    buildingArea: number; // m² (LB)
    floors: number;
    carport: number;
    electricity: number; // VA
    certificate: CertificateType;
    furnishing: 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
    facing?: string; // e.g., 'Utara', 'Selatan'
    yearBuilt: number;
    waterSource?: string;
  };
  features: string[];
  images: string[];
  featuredImage: string;
  isFeatured?: boolean;
  isHotDeal?: boolean;
  isReadyStock?: boolean;
  status: 'Tersedia' | 'Terjual' | 'Booked';
  description: string;
  virtualTourAvailable?: boolean;
  whatsappMessageCustom?: string;
}

export interface FilterState {
  keyword: string;
  location: string;
  statusFilter: 'Semua' | 'Dijual' | 'Disewa' | 'Sold Out';
  transactionType: 'Semua' | TransactionType;
  propertyType: 'Semua' | PropertyType;
  minPrice: number | null;
  maxPrice: number | null;
  minBedrooms: number | null;
  minBathrooms: number | null;
  certificate: string;
  furnishing: string;
  readyStockOnly: boolean;
  amenities: string[];
  sortBy: 'terbaru' | 'harga-rendah' | 'harga-tinggi' | 'luas-bangunan';
}

export interface Testimonial {
  id: string;
  clientName: string;
  roleOrCompany: string;
  avatarUrl: string;
  rating: number;
  propertyPurchased: string;
  location: string;
  reviewText: string;
  year: string;
  verifiedBuyer: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  propertyTitle: string;
  location: string;
  description: string;
  status?: 'Disewakan' | 'Kelola Penuh' | 'Dijual' | 'Sold Out';
  rentalRate?: string;
  capacity?: string;
}

export interface KprSimulationInput {
  propertyPrice: number;
  downPaymentPercent: number; // e.g. 20%
  tenorYears: number; // e.g. 15 years
  interestRateAnnual: number; // e.g. 5.5%
}
