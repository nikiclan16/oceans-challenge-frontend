import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2">Productos Disponibles</h2>
      <ul className="divide-y">
        {products.length > 0 &&
          products.map((p) => (
            <li key={p.id} className="py-2 flex justify-between">
              <span>{p.name}</span>
              <span>${(+p.price).toFixed(2)}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
