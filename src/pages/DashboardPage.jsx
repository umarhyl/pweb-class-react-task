import React from 'react';
import { Link } from 'react-router';
import { useProducts } from '../context/ProductContext';
import { formatPrice } from '../utils/format';
import { Package, TrendingUp, DollarSign, ArrowRight, Eye, PlusCircle } from 'lucide-react';

function DashboardPage() {
  const { products, loading, isBackendConnected } = useProducts();

  const totalProducts = products.length;
  const totalValuation = products.reduce((acc, p) => acc + Number(p.price || 0), 0);
  const avgPrice = totalProducts > 0 ? Math.round(totalValuation / totalProducts) : 0;
  const highestPriceProduct = totalProducts > 0
    ? [...products].sort((a, b) => b.price - a.price)[0]
    : null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold tracking-wide uppercase mb-3">
            Dashboard Utama
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Selamat Datang di Manajemen Produk
          </h1>
          <p className="mt-2 text-sm sm:text-base text-blue-100 leading-relaxed">
            Pantau ringkasan statistik produk, kelola katalog dengan cepat, dan integrasikan inventaris Anda secara real-time.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-4 py-2.5 rounded-xl text-sm shadow-sm hover:bg-blue-50 transition-colors"
            >
              Buka Katalog Produk
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Produk</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-3">{totalProducts}</div>
          <p className="text-xs text-slate-500 mt-1">Item aktif dalam database</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Nilai</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-3">{formatPrice(totalValuation)}</div>
          <p className="text-xs text-slate-500 mt-1">Akumulasi harga produk</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Rata-rata Harga</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold text-indigo-600 mt-3">{formatPrice(avgPrice)}</div>
          <p className="text-xs text-slate-500 mt-1">Rata-rata per produk</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Harga Tertinggi</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Package size={20} />
            </div>
          </div>
          <div className="text-lg font-bold text-slate-900 mt-3 truncate">
            {highestPriceProduct ? highestPriceProduct.name : '-'}
          </div>
          <p className="text-xs font-semibold text-amber-600 mt-1">
            {highestPriceProduct ? formatPrice(highestPriceProduct.price) : '-'}
          </p>
        </div>
      </div>

      {/* Recent Products Overview */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Ringkasan Produk Terbaru</h2>
            <p className="text-xs text-slate-500 mt-0.5">Daftar produk yang tersimpan dalam sistem</p>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
          >
            Lihat semua <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-slate-400 text-sm">Memuat data produk...</div>
        ) : products.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                    #{product.id}
                  </span>
                  <span className="text-sm font-semibold text-slate-800">{product.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-blue-600">{formatPrice(product.price)}</span>
                  <Link
                    to={`/products/${product.id}`}
                    className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    title="Lihat Detail"
                  >
                    <Eye size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-slate-400 text-sm">Belum ada produk terdaftar.</div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
