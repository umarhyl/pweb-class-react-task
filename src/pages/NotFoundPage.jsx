import React from 'react';
import { Link } from 'react-router';
import { Home, Package, AlertTriangle } from 'lucide-react';

function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm animate-scale-up">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <AlertTriangle size={32} />
        </div>
        <span className="text-sm font-extrabold text-blue-600 tracking-wider uppercase block">
          Error 404
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-sm text-slate-500 mt-2.5 leading-relaxed">
          Alamat URL yang Anda tuju tidak terdaftar atau telah dipindahkan.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-colors shadow-sm"
          >
            <Home size={16} /> Ke Dashboard
          </Link>
          <Link
            to="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-sm rounded-xl transition-colors"
          >
            <Package size={16} /> Daftar Produk
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
