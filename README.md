# Manajemen Produk - Pemrograman Web

Repository ini berisi implementasi tugas praktikum Pemrograman Web (Departemen Teknologi Informasi - ITS):
- **[Tugas 4: React Router, Tailwind CSS, dan Integrasi Backend](#-tugas-4-react-router-tailwind-css-dan-integrasi-backend-week-13)** (Materi Week 13)
- **[Tugas 3: Fundamental React & Manajemen State](#-tugas-3-fundamental-react--manajemen-state-week-12)** (Materi Week 12)

---

## 🚀 Tugas 4: React Router, Tailwind CSS, dan Integrasi Backend (Week 13)

Pengembangan aplikasi dari Tugas 3 dengan menambahkan navigasi multi-halaman (**React Router v7**), antarmuka dashboard responsif (**Tailwind CSS**), dan integrasi penuh dengan **Service Backend API ExpressJS & Prisma ORM**.

### ✨ Fitur Utama Tugas 4
1. **Navigasi Multi-Halaman & Shared Layout**:
   - `AppLayout` dengan `<Outlet />` dan `Navbar` konsisten di seluruh halaman.
   - `NavLink` aktif dengan highlight status menu (`Dashboard`, `Produk`, `Pengaturan`).
   - Dynamic route `/products/:id` menggunakan `useParams` untuk melihat detail produk, serta pesan ramah jika ID tidak ditemukan.
   - Halaman fallback 404 (`*`) untuk rute yang tidak terdaftar.
2. **Integrasi Backend API (ExpressJS + Prisma)**:
   - Terhubung langsung ke API endpoint backend di `http://localhost:3000/products` untuk seluruh proses CRUD (GET, POST, PUT, DELETE).
   - Dilengkapi *offline fallback* otomatis ke data lokal/localStorage jika backend sedang tidak dijalankan.
3. **Dashboard Ringkasan (`/`)**:
   - Menghitung metrik ringkasan inventaris: Total Produk, Total Nilai Inventaris, Rata-rata Harga, dan Produk Termahal.
4. **Pengaturan Tata Letak (`/settings`)**:
   - Opsi mode tampilan katalog: **Mode Grid (Kartu)** vs **Mode List (Baris)** yang langsung diaplikasikan pada `/products` dan tersimpan di `localStorage`.
5. **Atomic Design Architecture**:
   - Struktur komponen teratur: `atoms/` (`Button`, `Badge`), `molecules/` (`SearchBar`, `ProductCard`), `organisms/` (`Navbar`, Modals), `layouts/`, `pages/`, `context/`, dan `services/`.

### 🗺️ Struktur Route Aplikasi
| Route Path | Komponen | Keterangan |
|---|---|---|
| `/` | `DashboardPage` | Halaman ringkasan metrik statistik produk |
| `/products` | `ProductsPage` | Halaman utama daftar produk (CRUD & Search) |
| `/products/:id` | `ProductDetailPage` | Halaman detail produk dinamis berdasarkan parameter ID |
| `/settings` | `SettingsPage` | Pengaturan mode tampilan (Grid / List) & status API |
| `*` | `NotFoundPage` | Halaman fallback 404 untuk URL yang tidak terdaftar |

### 🛠️ Panduan Menjalankan Frontend & Backend

#### 1. Menjalankan Backend (ExpressJS API)
```bash
# Buka terminal dan masuk ke folder repo backend
cd ../express

# Instal dependensi (jika belum)
npm install

# Inisialisasi database SQLite
npm run seed

# Jalankan server backend (port 3000)
npm start
```

#### 2. Menjalankan Frontend (React Vite)
```bash
# Buka terminal dan masuk ke folder repo frontend
cd ../react

# Instal dependensi
npm install

# Jalankan server development (port 5173)
npm run dev
```
Buka browser di `http://localhost:5173`.

#### 3. Menjalankan Pengujian Unit Otomatis
```bash
npm test
```

### 📋 Tabel Bukti Pengujian Tugas 4
| Skenario | Hasil yang Diharapkan | Hasil Aktual |
|---|---|---|
| Membuka halaman Dashboard (`/`) | Menampilkan ringkasan metrik statistik produk dan daftar ringkas produk | Sesuai |
| Navigasi antar halaman via Navbar | Berpindah halaman (`/`, `/products`, `/settings`) secara mulus tanpa reload halaman (SPA) | Sesuai |
| Membuka halaman detail produk (`/products/:id`) | Menampilkan data spesifik produk sesuai ID dari parameter URL dan tombol kembali | Sesuai |
| Mengakses detail produk ID tidak ada (`/products/999`) | Menampilkan pesan "Produk Tidak Ditemukan" dan link kembali ke daftar produk | Sesuai |
| Mengakses URL sembarang / tidak terdaftar (`/halaman-ngawur`) | Menampilkan halaman 404 dengan pesan informatif dan tombol navigasi kembali | Sesuai |
| Menambahkan produk baru di `/products` | Data tersimpan ke API backend dan langsung muncul pada katalog | Sesuai |
| Mengubah data produk via modal Edit | Perubahan data tersimpan ke API backend dan terupdate di antarmuka | Sesuai |
| Menghapus produk via modal konfirmasi | Data produk terhapus dari API backend dan terhapus dari daftar | Sesuai |
| Mengubah mode tampilan di `/settings` (Grid ke List) | Tampilan katalog di `/products` berubah format dan preferensi tersimpan di `localStorage` | Sesuai |

---

## 📦 Tugas 3: Fundamental React & Manajemen State (Week 12)

Implementasi awal aplikasi Manajemen Produk satu halaman menggunakan komponen fungsional React, manajemen state lokal (`useState`), dan styling Tailwind CSS.

### ✨ Fitur Utama Tugas 3
- **Daftar Produk Awal**: Menampilkan 5 produk awal (`Pulpen`, `Buku Tulis`, `Spidol`, `Penggaris`, `Penghapus`) dalam grid kartu.
- **Pencarian Real-Time**: Filter instan nama produk disertai penghitung jumlah produk yang cocok.
- **Modal Tambah Produk**: Form pop-up dengan validasi nama wajib dan harga > 0.
- **Modal Edit Produk**: Form pop-up pembaruan data yang memuat informasi terpilih secara otomatis.
- **Modal Hapus Produk**: Pop-up dialog konfirmasi hapus dilengkapi ikon dan ringkasan data produk.
- **Format Rupiah**: Pemformatan nilai mata uang otomatis ke format `Rp`.

### 📋 Tabel Bukti Pengujian Tugas 3
| Skenario | Hasil yang Diharapkan | Hasil Aktual |
|---|---|---|
| Membuka halaman utama aplikasi | Menampilkan header, pencarian, jumlah produk (5 produk), dan daftar kartu produk awal | Sesuai |
| Mencari produk berdasarkan nama ("Buku") | Daftar produk terfilter secara realtime hanya menampilkan produk yang sesuai ("Buku Tulis") | Sesuai |
| Mencari nama produk yang tidak terdaftar | Menampilkan pesan "Tidak ada produk yang sesuai dengan pencarian" | Sesuai |
| Membuka pop-up Tambah Produk | Modal form tambah produk terbuka dengan field nama produk dan harga | Sesuai |
| Menambahkan produk baru dengan validasi | Produk baru berhasil ditambahkan ke daftar dan total produk bertambah | Sesuai |
| Membuka pop-up Edit Produk | Modal form edit terbuka dengan data produk terpilih terisi otomatis | Sesuai |
| Menyimpan perubahan data produk | Data nama dan harga produk berhasil diperbarui pada kartu | Sesuai |
| Membuka pop-up konfirmasi Hapus Produk | Dialog konfirmasi hapus terbuka dengan pratinjau ID, nama, dan harga produk | Sesuai |
| Mengonfirmasi penghapusan produk | Produk terhapus dari daftar dan jumlah produk berkurang | Sesuai |
