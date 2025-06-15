import { useEffect, useState } from "react";

import { getProducts } from "../services/productService";

import { ButtonEdit } from "../buttons/ButtonEdit";
import { ButtonDelete } from "../buttons/ButtonDelete";

import ProductEditModal from "./ProductEditModal";
import ProductDeleteModal from "./ProductDeleteModal";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  const getAllProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2 text-center">
        {products.length === 0 && "No Hay"} Productos Disponibles
      </h2>

      {products.length > 0 && (
        <div className="w-full overflow-x-auto rounded shadow-md">
          <table className="min-w-full bg-white border border-gray-200 text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 border-b">No°</th>
                <th className="px-4 py-3 border-b">Nombre</th>
                <th className="px-4 py-3 border-b">Precio</th>
                <th className="px-4 py-3 border-b text-center">Editar</th>
                <th className="px-4 py-3 border-b text-center">Borrar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 text-black">{index + 1}</td>
                  <td className="px-4 py-2 text-black">{product.name}</td>
                  <td className="px-4 py-2 text-black">${product.price}</td>
                  <td className="px-4 py-2 text-center">
                    <ButtonEdit action={() => setEditProduct(product)} />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <ButtonDelete action={() => setDeleteProduct(product)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editProduct && (
        <ProductEditModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onUpdated={getAllProducts}
        />
      )}

      {deleteProduct !== null && (
        <ProductDeleteModal
          product={deleteProduct}
          onClose={() => setDeleteProduct(null)}
          onDeleted={getAllProducts}
        />
      )}
    </div>
  );
}
