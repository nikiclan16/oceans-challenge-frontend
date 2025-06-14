import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { createOrder } from "../services/orderService";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function OrderForm() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getProducts().then(setProducts);
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
      setMessage("✅ Orden creada con éxito.");
      setSelected([]);
    } catch (error) {
      setMessage("❌ Error al crear la orden.");
      console.error("Error al crear la orden:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Crear Orden</h2>
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
              {p.name} - ${p.price.toFixed(2)}
            </label>
          </li>
        ))}
      </ul>

      <p className="mb-4 font-bold">Total: ${total.toFixed(2)}</p>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Crear Orden
      </button>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
