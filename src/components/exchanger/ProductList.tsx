import { useState } from 'react';
import ProductCard from './ProductCard';
//la pagina de las publicaciones de los intercambios
const productsData = [
  { id: 1, category: 'Limpieza', name: 'Detergente', rating: 4, absences: 0, image: 'https://source.unsplash.com/300x200/?placeholder' },
  { id: 2, category: 'Deporte', name: 'Balón de Fútbol', rating: 5, absences: 1, image: 'https://source.unsplash.com/300x200/?demo' },
  { id: 3, category: 'Electrónica', name: 'Auriculares', rating: 3, absences: 2, image: 'https://source.unsplash.com/300x200/?generic' },
  // Puedes agregar más productos aquí
];

function ProductList() {
  const [category, setCategory] = useState('');

  const filteredProducts = category
    ? productsData.filter(product => product.category === category)
    : productsData;

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white p-4 text-center shadow-md">
        <h1 className="text-3xl font-bold">Descubre nuevos productos para intercambiar</h1>
        <p className="text-sm">Explora nuestra selección de productos disponibles para intercambios.</p>
      </header>
      <main className="bg-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <select
              className="p-2 border border-gray-300 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Todas las Categorías</option>
              <option value="Limpieza">Limpieza</option>
              <option value="Deporte">Deporte</option>
              <option value="Electrónica">Electrónica</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductList;
