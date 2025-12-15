import React, { useState } from "react";
import "./AdminSettings.css";

export default function AdminSettings(): React.JSX.Element {
  const [settings, setSettings] = useState({
    companyName: "TrackOnTrack Rental",
    companyEmail: "info@trackontrack.com",
    companyPhone: "+1 (555) 123-4567",
    companyAddress: "123 Main Street, City, State 12345",
    taxRate: 10,
    currency: "USD",
    maintenanceReminder: 30
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: name === "taxRate" || name === "maintenanceReminder" ? parseFloat(value) : value
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Handle settings save here
    alert("Settings saved successfully!");
  };

  return (
    <div className="admin-settings">
      <div className="admin-settings-header">
        <h2>Settings</h2>
        <p>Manage your application settings and preferences</p>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h3>Company Information</h3>
          <form onSubmit={handleSubmit} className="settings-form">
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={settings.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Company Email</label>
              <input
                type="email"
                name="companyEmail"
                value={settings.companyEmail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Company Phone</label>
              <input
                type="tel"
                name="companyPhone"
                value={settings.companyPhone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Company Address</label>
              <textarea
                name="companyAddress"
                value={settings.companyAddress}
                onChange={handleChange}
                rows={3}
                required
              ></textarea>
            </div>

            <h3>Business Settings</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Tax Rate (%)</label>
                <input
                  type="number"
                  name="taxRate"
                  value={settings.taxRate}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.1"
                  required
                />
              </div>
              <div className="form-group">
                <label>Currency</label>
                <select name="currency" value={settings.currency} onChange={handleChange} required>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="PKR">PKR (₨)</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Maintenance Reminder (Days)</label>
              <input
                type="number"
                name="maintenanceReminder"
                value={settings.maintenanceReminder}
                onChange={handleChange}
                min="1"
                required
              />
              <small>Send maintenance reminder X days before scheduled maintenance</small>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

