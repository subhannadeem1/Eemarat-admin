import React, { useState, useEffect } from 'react';
import { backend_url } from "./Navbar";

const WorkerBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(backend_url + '/bookings');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl items-center font-bold mb-4">Admin Bookings</h1>
      <div className="overflow-x-auto">
        <div className="shadow-md overflow-hidden border  border-gray-300 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#005173] py-6 ">
              <tr className="text-left text-xs font-medium text-[#FFFFFF] uppercase tracking-wider">
                <th className="px-6 py-3">Booking ID</th>
                <th className="px-6 py-3"> Title</th>
                
                <th className="px-6 py-3">Client Name</th>
                <th className="px-6 py-3">Contact</th>
                <th className="px-6 py-3">City</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3"> Cost</th>
                <th className="px-6 py-3">No Labores</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking._id} className="text-sm text-gray-900">
                  <td className="px-6 py-4 whitespace-nowrap">{booking._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.workerTitle}</td>

                  <td className="px-6 py-4 whitespace-nowrap">{booking.clientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.clientContact}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">Rs. {booking.totalCost}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.numLaborers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkerBooking;
