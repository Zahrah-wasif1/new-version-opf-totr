import React, { useState } from "react";
import "./AdminUsers.css";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  joinDate: string;
}

export default function AdminUsers(): React.JSX.Element {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      role: "Customer",
      status: "Active",
      joinDate: "2023-01-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1234567891",
      role: "Customer",
      status: "Active",
      joinDate: "2023-02-20"
    },
    {
      id: 3,
      name: "Admin User",
      email: "admin@example.com",
      phone: "+1234567892",
      role: "Admin",
      status: "Active",
      joinDate: "2022-06-10"
    },
    {
      id: 4,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1234567893",
      role: "Customer",
      status: "Inactive",
      joinDate: "2023-05-12"
    }
  ]);

  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole === "all" || user.role.toLowerCase() === filterRole.toLowerCase();
    const matchesStatus = filterStatus === "all" || user.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesRole && matchesStatus;
  });

  const updateUserStatus = (id: number, newStatus: string): void => {
    setUsers(users.map((user) => (user.id === id ? { ...user, status: newStatus } : user)));
  };

  const updateUserRole = (id: number, newRole: string): void => {
    setUsers(users.map((user) => (user.id === id ? { ...user, role: newRole } : user)));
  };

  const getStatusClass = (status: string): string => {
    return status === "Active" ? "status-active" : "status-inactive";
  };

  const getRoleClass = (role: string): string => {
    return role === "Admin" ? "role-admin" : "role-customer";
  };

  return (
    <div className="admin-users">
      <div className="admin-users-header">
        <div>
          <h2>User Management</h2>
          <p>Manage all users and their permissions</p>
        </div>
      </div>

      <div className="users-filters">
        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="users-table-container">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-name">
                      <strong>{user.name}</strong>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                      className={`role-select ${getRoleClass(user.role)}`}
                    >
                      <option value="Customer">Customer</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={user.status}
                      onChange={(e) => updateUserStatus(user.id, e.target.value)}
                      className={`status-select ${getStatusClass(user.status)}`}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td>{user.joinDate}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn view" title="View">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="action-btn edit" title="Edit">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="action-btn delete" title="Delete">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="no-data">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

