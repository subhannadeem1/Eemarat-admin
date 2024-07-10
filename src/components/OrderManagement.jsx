import React, { useState, useEffect } from 'react';
import { backend_url } from "./Navbar";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(backend_url + '/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">Received Orders</h1>
      <div className="overflow-x-auto">
        <div className="shadow-md overflow-hidden border border-gray-300 sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#005173] py-6">
                <tr className="text-left text-xs font-medium text-[#FFFFFF] uppercase tracking-wider">
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Client Name</th>
                  <th className="px-6 py-3">Contact</th>
                  <th className="px-6 py-3">City</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Cost</th>
                  <th className="px-6 py-3">Number of Laborers</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="text-sm text-gray-900">
                    <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.billingDetails.firstName} {order.billingDetails.lastName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.billingDetails.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.billingDetails.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.billingDetails.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">Rs. {order.items.reduce((total, item) => total + item.total, 0).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.items.reduce((total, item) => total + item.quantity, 0)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="unpaid">Unpaid</option>
                        <option value="fulfilled">Fulfilled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
