import { useEffect, useState } from "react";
import { getOrders } from "../../../services/orderService";
import { ToastContainer } from "react-toastify";
import OrderDeleteModal from "../modals/OrderDeleteModal";

interface Order {
  order_id: number;
  created_at: string;
  total: number;
  products: {
    id: number;
    name: string;
    price: number;
  }[];
}

export default function OrdersDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [deleteOrderId, setDeleteOrderId] = useState<number | null>(null);

  const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <ToastContainer />
      <h2 className="text-xl font-semibold mb-4 text-center">
        {orders.length === 0 && "No Hay"} Órdenes Registradas
      </h2>
      {orders.map((order) => (
        <div
          key={order.order_id}
          className="border-2 border-dashed border-gray-500 p-4 rounded mb-4 shadow-sm"
        >
          <p className="text-white text-sm text-right">
            Fecha: {new Date(order.created_at).toLocaleString()}
          </p>
          <ul className="ml-4 list-disc text-sm">
            {order.products.map((prod) => (
              <li key={prod.id} className="text-white">
                {prod.name} - ${(+prod.price).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="font-semibold text-lg my-2 text-center text-white">
            Total: ${(+order.total).toFixed(2)}
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setDeleteOrderId(order.order_id)}
              className="px-3 py-1 border border-red-500 text-red-600 rounded text-sm"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      {deleteOrderId !== null && (
        <OrderDeleteModal
          orderId={deleteOrderId}
          onClose={() => setDeleteOrderId(null)}
          onDeleted={fetchOrders}
        />
      )}
    </div>
  );
}
