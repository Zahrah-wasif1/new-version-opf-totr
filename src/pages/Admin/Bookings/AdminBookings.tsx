import React, { useState } from "react";
import "./AdminBookings.css";

interface Booking {
  id: number;
  customer: string;
  car: string;
  startDate: string;
  endDate: string;
  status: string;
  amount: number;
  phone: string;
  email: string;
}

export default function AdminBookings(): React.JSX.Element {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      customer: "John Doe",
      car: "BMW 3 Series",
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      status: "Active",
      amount: 600,
      phone: "+1234567890",
      email: "john@example.com"
    },
    {
      id: 2,
      customer: "Jane Smith",
      car: "Toyota Camry",
      startDate: "2024-01-14",
      endDate: "2024-01-17",
      status: "Completed",
      amount: 135,
      phone: "+1234567891",
      email: "jane@example.com"
    },
    {
      id: 3,
      customer: "Mike Johnson",
      car: "Ford Explorer",
      startDate: "2024-01-13",
      endDate: "2024-01-18",
      status: "Active",
      amount: 375,
      phone: "+1234567892",
      email: "mike@example.com"
    },
    {
      id: 4,
      customer: "Sarah Williams",
      car: "Mercedes-Benz C-Class",
      startDate: "2024-01-20",
      endDate: "2024-01-23",
      status: "Pending",
      amount: 390,
      phone: "+1234567893",
      email: "sarah@example.com"
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredBookings = bookings.filter((booking) => {
    if (filterStatus === "all") return true;
    return booking.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const updateBookingStatus = (id: number, newStatus: string): void => {
    setBookings(bookings.map((booking) => (booking.id === id ? { ...booking, status: newStatus } : booking)));
  };

  const getStatusClass = (status: string): string => {
    const statusMap: Record<string, string> = {
      Active: "status-active",
      Completed: "status-completed",
      Pending: "status-pending",
      Cancelled: "status-cancelled"
    };
    return statusMap[status] || "";
  };

  const getStatusCount = (status: string): number => {
    return bookings.filter((b) => b.status === status).length;
  };

  return (
    <div className="admin-bookings">
      <div className="admin-bookings-header">
        <div>
          <h2>Booking Management</h2>
          <p>Manage all car rental bookings</p>
        </div>
      </div>

      <div className="booking-stats">
        <div className="booking-stat-card">
          <div className="stat-icon active">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-info">
            <h3>Pending</h3>
            <p>{getStatusCount("Pending")} bookings</p>
          </div>
        </div>
        <div className="booking-stat-card">
          <div className="stat-icon processing">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-info">
            <h3>Active</h3>
            <p>{getStatusCount("Active")} bookings</p>
          </div>
        </div>
        <div className="booking-stat-card">
          <div className="stat-icon completed">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div className="stat-info">
            <h3>Completed</h3>
            <p>{getStatusCount("Completed")} bookings</p>
          </div>
        </div>
        <div className="booking-stat-card">
          <div className="stat-icon cancelled">
            <i className="fas fa-times-circle"></i>
          </div>
          <div className="stat-info">
            <h3>Cancelled</h3>
            <p>{getStatusCount("Cancelled")} bookings</p>
          </div>
        </div>
      </div>

      <div className="bookings-filters">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bookings-table-container">
        <table className="admin-bookings-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Car</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>#{booking.id}</td>
                  <td>
                    <div className="customer-info">
                      <strong>{booking.customer}</strong>
                      <span>{booking.email}</span>
                    </div>
                  </td>
                  <td>{booking.car}</td>
                  <td>{booking.startDate}</td>
                  <td>{booking.endDate}</td>
                  <td>${booking.amount}</td>
                  <td>
                    <select
                      value={booking.status}
                      onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                      className={`status-select ${getStatusClass(booking.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn view" title="View Details">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="action-btn edit" title="Edit">
                        <i className="fas fa-edit"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="no-data">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

