import { useState } from "react";
import { updateProduct } from "../services/productService";
import { toast } from "react-toastify";

interface Props {
  product: { id: number; name: string; price: number };
  onClose: () => void;
  onUpdated: () => void;
}

export default function ProductEditModal({
  product,
  onClose,
  onUpdated,
}: Props) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);

  const handleSubmit = async () => {
    try {
      const res = await updateProduct(product.id, { name, price });
      toast.success(`${res.name} editado correctamente`);
      onUpdated();
      onClose();
    } catch (error) {
      console.error("error al editar producto:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-blue-600">
          Editar producto
        </h2>

        <label className="text-black">Nombre</label>
        <input
          className="border w-full mb-2 p-2 bg-white text-black"
          placeholder="Arroz"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="text-black">Precio</label>
        <input
          type="number"
          className="border w-full mb-4 p-2 bg-white  text-black"
          step="1000"
          placeholder="1000"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
