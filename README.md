# Manajemen Produk - Tugas 4 Pemrograman Web

Aplikasi web manajemen produk berbasis **React 18**, **React Router v7**, dan **Tailwind CSS** yang terintegrasi dengan **Backend ExpressJS & Prisma ORM**, dikembangkan untuk memenuhi **Tugas 4 Pemrograman Web (Materi Week 13: React Router, Tailwind CSS, dan Integrasi Backend)**.

---

## 📌 Fitur Utama Tugas 4

1. **Navigasi Multi-Halaman (React Router v7)**
   - **`AppLayout` dengan `<Outlet />`**: Menggunakan layout bersama dengan `Navbar` konsisten di seluruh halaman anak.
   - **`NavLink` Aktif**: Indikator menu aktif pada sidebar/navbar (`Dashboard`, `Produk`, `Pengaturan`).
   - **Dynamic Route (`/products/:id`)**: Membaca parameter ID produk via hook `useParams` untuk menampilkan data detail produk secara dinamis.
   - **Halaman 404 (`*`)**: Penanganan route tidak dikenal dengan tampilan ramah dan tautan kembali ke Dashboard atau Daftar Produk.

2. **Integrasi Layanan Backend (API ExpressJS + Prisma)**
   - Mengambil data katalog awal dari endpoint `GET http://localhost:3000/products`.
   - Perubahan data (Tambah, Edit, Hapus) tersimpan langsung ke database SQLite backend melalui API `POST`, `PUT`, dan `DELETE`.
   - Dilengkapi *offline fallback* otomatis jika backend sedang tidak aktif.

3. **Dashboard Statistik (`/`)**
   - Menghitung ringkasan inventaris: Total Produk, Total Nilai Inventaris, Rata-rata Harga, dan Produk Termahal.
   - Menyediakan tautan cepat ke detail produk dan katalog.

4. **Pengaturan Tata Letak (`/settings`)**
   - Pilihan mode tampilan daftar produk: **Mode Grid (Kartu)** vs **Mode List (Baris)** yang langsung diterapkan di `/products` dan tersimpan di `localStorage`.
   - Pemantau status konektivitas layanan backend API.

5. **Penerapan Atomic Design & Tailwind CSS**
   - **Atoms**: `Button`, `Badge`
   - **Molecules**: `SearchBar`, `ProductCard` (mendukung mode Grid dan List)
   - **Organisms**: `Navbar`, `AddProductModal`, `EditProductModal`, `DeleteProductModal`
   - **Layouts**: `AppLayout` (Navbar + `<Outlet />`)

---

## 🗺️ Struktur Route Aplikasi

| Route Path | Komponen | Keterangan |
|---|---|---|
| `/` | `DashboardPage` | Halaman ringkasan metrik statistik produk |
| `/products` | `ProductsPage` | Halaman utama daftar produk (CRUD & Search) |
| `/products/:id` | `ProductDetailPage` | Halaman detail produk dinamis berdasarkan parameter ID |
| `/settings` | `SettingsPage` | Pengaturan mode tampilan (Grid / List) & status API |
| `*` | `NotFoundPage` | Halaman fallback 404 untuk URL yang tidak terdaftar |

---

## 🚀 Panduan Menjalankan Aplikasi

### 1. Menjalankan Backend (ExpressJS API)
Buka terminal pada direktori repository backend:
```bash
# Masuk ke folder backend
cd ../express

# Instal dependensi (jika belum)
npm install

# Inisialisasi data awal database
npm run seed

# Jalankan server API (port 3000)
npm start
```
Server backend akan aktif di `http://localhost:3000`.

### 2. Menjalankan Frontend (React + Vite)
Buka terminal pada direktori repository frontend:
```bash
# Masuk ke folder react
cd ../react

# Instal dependensi
npm install

# Jalankan dev server
npm run dev
```
Buka browser pada alamat `http://localhost:5173`.

### 3. Menjalankan Pengujian Unit Otomatis
```bash
npm test
```

---

## 📋 Tabel Bukti Pengujian Tugas 4

| Skenario | Hasil yang Diharapkan | Hasil Aktual |
|---|---|---|
| Membuka halaman Dashboard (`/`) | Menampilkan ringkasan statistik (total produk, nilai inventaris, rata-rata) dan daftar ringkas produk | Sesuai |
| Navigasi antar halaman via Navbar | Berpindah ke `/products` atau `/settings` tanpa reload seluruh halaman (SPA) | Sesuai |
| Membuka halaman detail produk (`/products/:id`) | Menampilkan informasi lengkap produk sesuai ID pada URL dan tombol kembali | Sesuai |
| Membuka detail ID produk tidak ada (`/products/999`) | Menampilkan pesan error "Produk Tidak Ditemukan" dengan tautan kembali ke daftar produk | Sesuai |
| Mengakses URL yang tidak terdaftar (contoh: `/halaman-ngawur`) | Menampilkan halaman 404 dengan pesan informatif dan tombol kembali | Sesuai |
| Menambahkan produk baru via modal di `/products` | Data tersimpan ke API backend dan langsung muncul pada daftar produk | Sesuai |
| Mengubah produk via modal Edit | Perubahan nama/harga tersimpan ke API backend dan terupdate di tampilan | Sesuai |
| Menghapus produk via modal konfirmasi | Data produk terhapus dari backend dan daftar produk terperbarui | Sesuai |
| Mengubah mode tampilan di `/settings` (Grid / List) | Tata letak produk di `/products` berganti sesuai pilihan dan tersimpan di `localStorage` | Sesuai |
