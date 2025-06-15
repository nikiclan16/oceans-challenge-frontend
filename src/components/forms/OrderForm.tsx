import { useEffect, useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import { getProducts } from "../../services/productService";
import { createOrder } from "../../services/orderService";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function OrderForm() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [message, setMessage] = useState("");

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

  const toggleProduct = (productId: number) => {
    setSelected((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const total = products
    .filter((p) => selected.includes(p.id))
    .reduce((sum, p) => sum + Number(p.price), 0);

  const handleSubmit = async () => {
    if (selected.length === 0) {
      setMessage("Debe seleccionar al menos un producto.");
      return;
    }

    try {
      await createOrder(selected);
      toast.success("Orden creada con éxito.");
      setSelected([]);
    } catch (error) {
      toast.error("Error al crear la orden.");
      console.error("Error al crear la orden:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 border-2 border-dashed border-gray-500 p-4 rounded shadow-sm">
      <ToastContainer />
      <h2 className="text-xl font-semibold mb-4 text-center">Crear Orden</h2>
      <ul className="mb-4">
        {products.map((p) => (
          <li key={p.id} className="flex justify-between items-center mb-2">
            <label>
              <input
                type="checkbox"
                checked={selected.includes(p.id)}
                onChange={() => toggleProduct(p.id)}
                className="mr-2"
              />
              {p.name} - ${(+p.price).toFixed(2)}
            </label>
          </li>
        ))}
      </ul>

      <p className="mb-4 font-bold text-right">Total: ${total.toFixed(2)}</p>

      <div className="w-full flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Crear Orden
        </button>
      </div>

      {message && <p className="mt-4 text-sm text-right">{message}</p>}
    </div>
  );
}
