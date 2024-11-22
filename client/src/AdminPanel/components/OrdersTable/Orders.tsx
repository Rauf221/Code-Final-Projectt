"use client"; 

import { useState, useEffect } from 'react';
import { Order } from "../../../types/order";

export default function OrderTable() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await fetch('/api/admin/orders');
    const data = await response.json();
    setOrders(data);
  };

  const handleStatusChange = async (orderId: string, status: Order['status']) => {
    await fetch('/api/admin/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status }),
    });
    fetchOrders();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">Order ID</th>
              <th className="px-6 py-3 border-b">Product ID</th>
              <th className="px-6 py-3 border-b">Quantity</th>
              <th className="px-6 py-3 border-b">Customer IP</th>
              <th className="px-6 py-3 border-b">Status</th>
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 border-b">{order.id}</td>
                <td className="px-6 py-4 border-b">{order.productId}</td>
                <td className="px-6 py-4 border-b">{order.quantity}</td>
                <td className="px-6 py-4 border-b">{order.customerIp}</td>
                <td className="px-6 py-4 border-b">{order.status}</td>
                <td className="px-6 py-4 border-b">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                    className="border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="shipped">Shipped</option>
                    <option value="received">Received</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}