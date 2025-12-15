import React from "react";
import "./Dashboard.css";

export default function Dashboard(): React.JSX.Element {
  const stats = [
    {
      title: "Total Bookings",
      value: "1,234",
      change: "+12.5%",
      icon: "fas fa-calendar-check",
      color: "#22c55e"
    },
    {
      title: "Total Revenue",
      value: "$45,678",
      change: "+8.2%",
      icon: "fas fa-dollar-sign",
      color: "#3b82f6"
    },
    {
      title: "Active Cars",
      value: "42",
      change: "+3",
      icon: "fas fa-car",
      color: "#f59e0b"
    },
    {
      title: "Total Users",
      value: "856",
      change: "+15.3%",
      icon: "fas fa-users",
      color: "#ef4444"
    }
  ];

  const recentBookings = [
    { id: 1, customer: "John Doe", car: "BMW 3 Series", date: "2024-01-15", status: "Active", amount: "$240" },
    { id: 2, customer: "Jane Smith", car: "Toyota Camry", date: "2024-01-14", status: "Completed", amount: "$135" },
    { id: 3, customer: "Mike Johnson", car: "Ford Explorer", date: "2024-01-13", status: "Active", amount: "$375" },
    { id: 4, customer: "Sarah Williams", car: "Mercedes-Benz C-Class", date: "2024-01-12", status: "Pending", amount: "$390" },
    { id: 5, customer: "David Brown", car: "Honda Accord", date: "2024-01-11", status: "Completed", amount: "$192" }
  ];

  const getStatusClass = (status: string): string => {
    const statusMap: Record<string, string> = {
      Active: "status-active",
      Completed: "status-completed",
      Pending: "status-pending",
      Cancelled: "status-cancelled"
    };
    return statusMap[status] || "";
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome back! Here's what's happening with your car rental business.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              <i className={stat.icon}></i>
            </div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <div className="stat-value-row">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-change positive">{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Recent Bookings</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="table-container">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Car</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>#{booking.id}</td>
                    <td>{booking.customer}</td>
                    <td>{booking.car}</td>
                    <td>{booking.date}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>{booking.amount}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn view" title="View">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="action-btn edit" title="Edit">
                          <i className="fas fa-edit"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="quick-actions">
            <button className="quick-action-btn">
              <i className="fas fa-plus"></i>
              <span>Add New Car</span>
            </button>
            <button className="quick-action-btn">
              <i className="fas fa-calendar-plus"></i>
              <span>Create Booking</span>
            </button>
            <button className="quick-action-btn">
              <i className="fas fa-user-plus"></i>
              <span>Add User</span>
            </button>
            <button className="quick-action-btn">
              <i className="fas fa-chart-bar"></i>
              <span>View Reports</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

