import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { useProducts } from '../context/ProductContext';
import { formatPrice } from '../utils/format';
import EditProductModal from '../components/EditProductModal';
import DeleteProductModal from '../components/DeleteProductModal';
import { ArrowLeft, Edit2, Trash2, PackageCheck, AlertCircle, Calendar, Hash } from 'lucide-react';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, updateProduct, deleteProduct } = useProducts();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const product = products.find((p) => String(p.id) === String(id));

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400">
        <div className="inline-block w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-2" />
        <p className="text-sm">Memuat informasi produk...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-xl mx-auto my-12 bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-xs">
        <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={30} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Produk Tidak Ditemukan</h2>
        <p className="text-sm text-slate-500 mt-2">
          Maaf, produk dengan ID <span className="font-semibold text-slate-700">#{id}</span> tidak ditemukan di sistem atau mungkin telah dihapus.
        </p>
        <div className="mt-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
          >
            <ArrowLeft size={16} /> Kembali ke Daftar Produk
          </Link>
        </div>
      </div>
    );
  }

  const handleDeleteSuccess = async (productId) => {
    await deleteProduct(productId);
    navigate('/products');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Navigation Back Link */}
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft size={16} /> Kembali ke Daftar Produk
      </Link>

      {/* Detail Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
              <Hash size={12} /> ID: {product.id}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {product.name}
            </h1>
          </div>
          <div className="sm:text-right">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">Harga Satuan</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
            <PackageCheck size={20} className="text-blue-600 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs text-slate-400 font-medium">Status Ketersediaan</span>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">Tersedia dalam Inventaris</p>
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
            <Calendar size={20} className="text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs text-slate-400 font-medium">Pembaruan Terakhir</span>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">Tersinkronisasi Real-Time</p>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-blue-500 text-blue-600 hover:bg-blue-50 font-medium text-sm rounded-xl transition-colors cursor-pointer"
          >
            <Edit2 size={16} /> Edit Produk
          </button>
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-red-300 text-red-500 hover:bg-red-50 font-medium text-sm rounded-xl transition-colors cursor-pointer"
          >
            <Trash2 size={16} /> Hapus Produk
          </button>
        </div>
      </div>

      {/* Modals */}
      <EditProductModal
        isOpen={isEditModalOpen}
        product={product}
        onClose={() => setIsEditModalOpen(false)}
        onUpdateProduct={(data) => updateProduct(data.id, data)}
      />

      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        product={product}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirmDelete={handleDeleteSuccess}
      />
    </div>
  );
}

export default ProductDetailPage;
