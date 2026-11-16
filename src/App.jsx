import React, { useState } from 'react';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import { initialProducts } from './data/initialProducts';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Manajemen Produk
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Kelola daftar produk dan harga dalam satu tempat.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl shadow-sm transition-colors self-start sm:self-auto"
          >
            + Tambah Produk
          </button>
        </div>

        {/* Search Bar & Counter */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          count={filteredProducts.length}
        />

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 mt-6">
            <p className="text-slate-500 text-sm">
              Tidak ada produk yang sesuai dengan pencarian &quot;{searchTerm}&quot;
            </p>
          </div>
        )}

        {/* Bottom Footer Info */}
        <div className="mt-8 text-sm text-slate-500">
          Menampilkan {filteredProducts.length} dari {products.length} produk
        </div>
      </div>
    </div>
  );
}

export default App;
