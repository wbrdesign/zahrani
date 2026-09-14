# Zahrani Property Indonesia & Manajemen Villa

Website personal branding modern, elegan, dan profesional untuk **Zahrani** — Property Advisor & Spesialis Layanan Utama Manajemen Villa di Indonesia.

Website ini dirancang **100% Client-Side Static (SPA)** menggunakan React 19, TypeScript, Vite, dan Tailwind CSS, sehingga **sangat ideal dan siap di-hosting langsung di GitHub Pages** tanpa memerlukan server backend atau database eksternal.

---

## 🚀 Panduan Hosting di GitHub Pages

### Cara 1: Menggunakan GitHub Actions (Sangat Direkomendasikan & Otomatis)
Workflow otomatis telah disiapkan di `.github/workflows/deploy.yml`:

1. Buat repositori baru di akun GitHub Anda (misal: `zahrani-property` atau `<username>.github.io`).
2. Push seluruh file proyek ini ke repositori GitHub Anda:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Zahrani Property & Villa Management"
   git branch -M main
   git remote add origin https://github.com/<username>/<nama-repo>.git
   git push -u origin main
   ```
3. Buka tab **Settings** di repositori GitHub Anda.
4. Pilih menu **Pages** di bilah sisi kiri.
5. Pada bagian **Build and deployment > Source**, pilih **GitHub Actions**.
6. GitHub akan otomatis melakukan build dan menerbitkan website Anda secara live!

---

## 🛠️ Pengembangan Lokal (Local Development)

Untuk menjalankan website ini di komputer lokal:

```bash
# 1. Install dependensi
npm install

# 2. Jalankan server lokal
npm run dev

# 3. Build untuk produksi
npm run build
```

Hasil build akan otomatis tersimpan dalam folder `dist/` dan siap dipublikasikan di platform static hosting manapun (GitHub Pages, Vercel, Netlify, Cloudflare Pages).

---

## ✨ Fitur Utama
- **Portofolio Aset Properti**: Penanda status transparan (Dijual / Sold Out) dengan filter harga, tipe properti, dan kamar tidur.
- **Aset Kelola Villa & Layanan Utama MANAJEMEN VILLA**: Galeri villa di Bali, Bandung, dan Batu dengan rincian tarif sewa, kapasitas tamu, dan skema kemitraan kelola villa.
- **Simulasi KPR Interaktif**: Perhitungan angsuran bulanan, DP, dan suku bunga bank secara langsung di browser klien.
- **Daftar Favorit Tersimpan**: Disimpan di browser pengguna menggunakan `localStorage` tanpa perlu login server.
- **Integrasi WhatsApp Langsung**: Tombol konsultasi, jadwal survey, booking villa, dan titip kelola villa terformat otomatis ke nomor WhatsApp resmi.
