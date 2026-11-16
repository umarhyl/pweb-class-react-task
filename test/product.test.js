import test from 'node:test';
import assert from 'node:assert/strict';
import { formatPrice } from '../src/utils/format.js';
import { initialProducts } from '../src/data/initialProducts.js';

test('formatPrice correctly formats Indonesian Rupiah currency', () => {
  assert.equal(formatPrice(5000), 'Rp5.000');
  assert.equal(formatPrice(12000), 'Rp12.000');
  assert.equal(formatPrice(8000), 'Rp8.000');
});

test('initial products contain 5 default items from slide 27', () => {
  assert.equal(initialProducts.length, 5);
  assert.equal(initialProducts[0].name, 'Pulpen');
  assert.equal(initialProducts[0].price, 5000);
  assert.equal(initialProducts[1].name, 'Buku Tulis');
  assert.equal(initialProducts[1].price, 12000);
});

test('search filter matches product name case-insensitively', () => {
  const searchTerm = 'buku';
  const filtered = initialProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].name, 'Buku Tulis');
});

test('add, update, and delete product operations', () => {
  let products = [...initialProducts];

  // Add product
  const nextId = Math.max(...products.map((p) => p.id)) + 1;
  const newProduct = { id: nextId, name: 'Tipe-X', price: 4000 };
  products = [...products, newProduct];
  assert.equal(products.length, 6);
  assert.equal(products[5].id, 6);
  assert.equal(products[5].name, 'Tipe-X');

  // Update product
  products = products.map((p) => (p.id === 6 ? { ...p, price: 4500 } : p));
  assert.equal(products.find((p) => p.id === 6)?.price, 4500);

  // Delete product
  products = products.filter((p) => p.id !== 6);
  assert.equal(products.length, 5);
  assert.equal(products.find((p) => p.id === 6), undefined);
});

test('dashboard metrics calculation (total products, valuation, avg price)', () => {
  const totalProducts = initialProducts.length;
  const totalValuation = initialProducts.reduce((acc, p) => acc + p.price, 0);
  const avgPrice = Math.round(totalValuation / totalProducts);

  assert.equal(totalProducts, 5);
  assert.equal(totalValuation, 34000); // 5000 + 12000 + 8000 + 6000 + 3000
  assert.equal(avgPrice, 6800);
});

test('dynamic route product lookup by string ID and not found handling', () => {
  // Existing ID
  const found = initialProducts.find((p) => String(p.id) === '2');
  assert.ok(found);
  assert.equal(found.name, 'Buku Tulis');

  // Non-existing ID (404 condition)
  const notFound = initialProducts.find((p) => String(p.id) === '999');
  assert.equal(notFound, undefined);
});
