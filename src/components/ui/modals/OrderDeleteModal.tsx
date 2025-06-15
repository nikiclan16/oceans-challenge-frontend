import { toast } from "react-toastify";
import { deleteOrder } from "../../../services/orderService";

interface Props {
  orderId: number;
  onClose: () => void;
  onDeleted: () => void;
}

export default function OrderDeleteModal({
  orderId,
  onClose,
  onDeleted,
}: Props) {
  const handleDelete = async () => {
    try {
      await deleteOrder(orderId);
      toast.success("orden eliminada correctamente");
      onDeleted();
      onClose();
    } catch (error) {
      console.error("error al eliminar producto:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4  text-red-600">
          ¿Eliminar esta orden?
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
