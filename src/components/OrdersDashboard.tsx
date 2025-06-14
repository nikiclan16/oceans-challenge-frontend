import { useEffect, useState } from "react";
import { getOrders } from "../services/orderService";

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

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Órdenes Registradas</h2>
      {orders.map((order) => (
        <div
          key={order.order_id}
          className="border p-4 rounded mb-4 shadow-sm bg-white"
        >
          <p className="text-gray-700 text-sm">
            Fecha: {new Date(order.created_at).toLocaleString()}
          </p>
          <p className="font-semibold text-lg mb-2">
            Total: ${(+order.total).toFixed(2)}
          </p>
          <ul className="ml-4 list-disc text-sm">
            {order.products.map((prod) => (
              <li key={prod.id}>
                {prod.name} - ${(+prod.price).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
