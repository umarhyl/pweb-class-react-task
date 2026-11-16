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
