# Manajemen Produk - Tugas 3 Pemrograman Web

Aplikasi web manajemen produk sederhana yang dibangun menggunakan **React (Vite)** dan **Tailwind CSS** untuk memenuhi Tugas 3 Pemrograman Web (Materi Week 12: Fundamental React).

## ✨ Fitur Utama

- **Daftar Produk Dinamis**: Menampilkan daftar produk menggunakan kartu interaktif (ID, Nama, Harga terformat Rupiah, tombol Edit & Hapus).
- **Pencarian Real-Time**: Fitur filter pencarian nama produk secara instan beserta penghitung total produk yang cocok.
- **Tambah Produk (Modal Pop-up)**: Form modal untuk menambahkan produk baru dengan validasi (nama wajib diisi, harga harus lebih dari 0).
- **Edit Produk (Modal Pop-up)**: Form modal untuk memperbarui data nama dan harga produk yang dipilih.
- **Hapus Produk (Modal Konfirmasi Pop-up)**: Dialog konfirmasi penghapusan produk dilengkapi pratinjau data produk sebelum dihapus.
- **Responsif & Bersih**: Tampilan UI modern dan responsif yang presisi mengikuti panduan slide materi kuliah.

## 🛠️ Teknologi yang Digunakan

- **React 18** (Functional Components, `useState`, Props & Event Handling)
- **Vite** (Build tool & development server)
- **Tailwind CSS** (Utility-first CSS framework)
- **Lucide React** (Icon UI)
- **Node.js Test Runner** (`node:test` untuk unit testing otomatis)

## 🚀 Cara Menjalankan Project

1. **Clone repository:**
   ```bash
   git clone https://github.com/umarhyl/pweb-class-react-task.git
   cd pweb-class-react-task
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Buka browser di `http://localhost:5173`.

4. **Jalankan pengujian unit:**
   ```bash
   npm test
   ```

## 📋 Tabel Bukti Pengujian

| Skenario | Hasil yang Diharapkan | Hasil Aktual |
|---|---|---|
| Membuka halaman utama aplikasi | Menampilkan header, form pencarian, jumlah produk (5 produk), dan daftar kartu produk awal | Sesuai |
| Mencari produk berdasarkan nama (contoh: "Buku") | Daftar produk terfilter secara realtime hanya menampilkan produk yang sesuai ("Buku Tulis") | Sesuai |
| Mencari nama produk yang tidak terdaftar | Menampilkan pesan "Tidak ada produk yang sesuai dengan pencarian" | Sesuai |
| Membuka pop-up Tambah Produk | Modal form tambah produk terbuka dengan field nama produk dan harga | Sesuai |
| Menambahkan produk baru dengan validasi | Produk baru berhasil ditambahkan ke daftar dan total produk bertambah | Sesuai |
| Membuka pop-up Edit Produk | Modal form edit terbuka dengan data produk terpilih terisi otomatis | Sesuai |
| Menyimpan perubahan data produk | Data nama dan harga produk berhasil diperbarui pada kartu | Sesuai |
| Membuka pop-up konfirmasi Hapus Produk | Dialog konfirmasi hapus terbuka dengan pratinjau ID, nama, dan harga produk | Sesuai |
| Mengonfirmasi penghapusan produk | Produk terhapus dari daftar dan jumlah produk berkurang | Sesuai |
