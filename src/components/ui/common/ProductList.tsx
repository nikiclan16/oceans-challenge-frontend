import { useCallback, useEffect, useState } from "react";
import { getPaginatedProducts } from "../../../services/productService";
import ProductEditModal from "../modals/ProductEditModal";
import ProductDeleteModal from "../modals/ProductDeleteModal";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { IconEdit } from "../../../icons/IconEdit";
import { IconDelete } from "../../../icons/IconDelete";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  const getAllProducts = useCallback(async () => {
    try {
      const res = await getPaginatedProducts(page, 5);
      setProducts(res.products);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setProducts([]);
    }
  }, [page]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

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
                <th className="px-4 py-3 border-b">ID</th>
                <th className="px-4 py-3 border-b">Nombre</th>
                <th className="px-4 py-3 border-b">Precio</th>
                <th className="px-4 py-3 border-b text-center">Editar</th>
                <th className="px-4 py-3 border-b text-center">Borrar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 text-black">{product.id}</td>
                  <td className="px-4 py-2 text-black">{product.name}</td>
                  <td className="px-4 py-2 text-black">${product.price}</td>
                  <td className="px-4 py-2 text-center">
                    <ButtonIcon
                      onClick={() => setEditProduct(product)}
                      Icon={IconEdit}
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <ButtonIcon
                      onClick={() => setDeleteProduct(product)}
                      Icon={IconDelete}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="px-4 py-1 text-sm">
                Página {page} de {totalPages}
              </span>
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          )}
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
