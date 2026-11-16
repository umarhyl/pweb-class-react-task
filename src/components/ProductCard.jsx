import React from 'react';
import { Link } from 'react-router';
import { formatPrice } from '../utils/format';
import { Eye, Edit2, Trash2 } from 'lucide-react';

function ProductCard({ product, onEdit, onDelete, layout = 'grid' }) {
  if (layout === 'list') {
    return (
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
            ID: {product.id}
          </span>
          <div>
            <Link
              to={`/products/${product.id}`}
              className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors"
            >
              {product.name}
            </Link>
            <p className="text-sm font-bold text-blue-600 mt-0.5">{formatPrice(product.price)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Link
            to={`/products/${product.id}`}
            className="py-1.5 px-3 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5"
          >
            <Eye size={14} /> Detail
          </Link>
          <button
            type="button"
            onClick={() => onEdit && onEdit(product)}
            className="py-1.5 px-3 text-xs font-medium text-blue-600 border border-blue-500 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Edit2 size={14} /> Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete && onDelete(product)}
            className="py-1.5 px-3 text-xs font-medium text-red-500 border border-red-300 rounded-lg hover:bg-red-50 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 size={14} /> Hapus
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">ID: {product.id}</span>
          <Link
            to={`/products/${product.id}`}
            className="text-xs font-medium text-slate-400 hover:text-blue-600 inline-flex items-center gap-1 transition-colors"
          >
            <Eye size={12} /> Detail
          </Link>
        </div>
        <Link
          to={`/products/${product.id}`}
          className="block text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors mt-1"
        >
          {product.name}
        </Link>
        <p className="text-base font-bold text-blue-600 mt-0.5">{formatPrice(product.price)}</p>
      </div>
      <div className="flex items-center gap-2.5 mt-5">
        <button
          type="button"
          onClick={() => onEdit && onEdit(product)}
          className="flex-1 py-1.5 px-3 text-sm font-medium text-blue-600 border border-blue-500 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete && onDelete(product)}
          className="flex-1 py-1.5 px-3 text-sm font-medium text-red-500 border border-red-300 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
