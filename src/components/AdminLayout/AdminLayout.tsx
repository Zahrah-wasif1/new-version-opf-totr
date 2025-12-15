import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout(): React.JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const menuItems = [
    { path: "/admin", icon: "fas fa-chart-line", label: "Dashboard" },
    { path: "/admin/cars", icon: "fas fa-car", label: "Cars" },
    { path: "/admin/bookings", icon: "fas fa-calendar-check", label: "Bookings" },
    { path: "/admin/users", icon: "fas fa-users", label: "Users" },
    { path: "/admin/settings", icon: "fas fa-cog", label: "Settings" },
  ];

  const handleLogout = (): void => {
    // Handle logout logic here
    navigate("/login");
  };

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <i className={`fas fa-${sidebarOpen ? "times" : "bars"}`}></i>
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${location.pathname === item.path ? "active" : ""}`}
            >
              <i className={item.icon}></i>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <Link to="/" className="sidebar-item">
            <i className="fas fa-home"></i>
            {sidebarOpen && <span>Back to Site</span>}
          </Link>
          <button className="sidebar-item logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <button
              className="mobile-sidebar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <i className="fas fa-bars"></i>
            </button>
            <h1>Admin Dashboard</h1>
          </div>
          <div className="header-right">
            <div className="admin-user">
              <i className="fas fa-user-circle"></i>
              <span>Admin User</span>
            </div>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

