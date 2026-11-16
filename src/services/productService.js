import { initialProducts } from '../data/initialProducts';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/products';

export const productService = {
  async getAll() {
    try {
      const response = await fetch(API_BASE_URL, { signal: AbortSignal.timeout(3000) });
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      return { data, isBackend: true };
    } catch {
      // Fallback ke localStorage atau initialProducts jika backend belum running
      const saved = localStorage.getItem('pweb_products');
      const fallbackData = saved ? JSON.parse(saved) : initialProducts;
      return { data: fallbackData, isBackend: false };
    }
  },

  async getById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, { signal: AbortSignal.timeout(3000) });
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      return await response.json();
    } catch {
      const saved = localStorage.getItem('pweb_products');
      const items = saved ? JSON.parse(saved) : initialProducts;
      return items.find((p) => String(p.id) === String(id)) || null;
    }
  },

  async create(product) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: product.name, price: Number(product.price) }),
        signal: AbortSignal.timeout(3000),
      });
      if (!response.ok) throw new Error('Gagal menyimpan produk ke API');
      return await response.json();
    } catch {
      // Offline fallback: generate ID
      const saved = localStorage.getItem('pweb_products');
      const items = saved ? JSON.parse(saved) : initialProducts;
      const nextId = items.length > 0 ? Math.max(...items.map((p) => p.id)) + 1 : 1;
      const newProduct = { id: nextId, name: product.name, price: Number(product.price) };
      localStorage.setItem('pweb_products', JSON.stringify([...items, newProduct]));
      return newProduct;
    }
  },

  async update(id, product) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: Number(id), name: product.name, price: Number(product.price) }),
        signal: AbortSignal.timeout(3000),
      });
      if (!response.ok) throw new Error('Gagal memperbarui produk di API');
      return await response.json();
    } catch {
      const saved = localStorage.getItem('pweb_products');
      const items = saved ? JSON.parse(saved) : initialProducts;
      const updated = items.map((p) =>
        String(p.id) === String(id)
          ? { ...p, name: product.name, price: Number(product.price) }
          : p
      );
      localStorage.setItem('pweb_products', JSON.stringify(updated));
      return { id: Number(id), name: product.name, price: Number(product.price) };
    }
  },

  async delete(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        signal: AbortSignal.timeout(3000),
      });
      if (!response.ok) throw new Error('Gagal menghapus produk dari API');
      return await response.json();
    } catch {
      const saved = localStorage.getItem('pweb_products');
      const items = saved ? JSON.parse(saved) : initialProducts;
      const filtered = items.filter((p) => String(p.id) !== String(id));
      localStorage.setItem('pweb_products', JSON.stringify(filtered));
      return { message: 'Produk dihapus (offline)' };
    }
  },
};
