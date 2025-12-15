import React, { useState } from "react";
import "./AdminCars.css";

interface Car {
  id: number;
  name: string;
  type: string;
  seats: number;
  price: number;
  image: string;
  available: boolean;
}

export default function AdminCars(): React.JSX.Element {
  const [cars, setCars] = useState<Car[]>([
    {
      id: 1,
      name: "Toyota Camry",
      type: "Sedan",
      seats: 5,
      price: 45,
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop",
      available: true
    },
    {
      id: 2,
      name: "Honda Accord",
      type: "Sedan",
      seats: 5,
      price: 48,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
      available: true
    },
    {
      id: 3,
      name: "Ford Explorer",
      type: "SUV",
      seats: 7,
      price: 75,
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
      available: true
    },
    {
      id: 4,
      name: "BMW 3 Series",
      type: "Luxury",
      seats: 5,
      price: 120,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop",
      available: true
    }
  ]);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [formData, setFormData] = useState<Partial<Car>>({
    name: "",
    type: "Sedan",
    seats: 5,
    price: 0,
    image: "",
    available: true
  });

  const handleAddCar = (): void => {
    setEditingCar(null);
    setFormData({
      name: "",
      type: "Sedan",
      seats: 5,
      price: 0,
      image: "",
      available: true
    });
    setShowModal(true);
  };

  const handleEditCar = (car: Car): void => {
    setEditingCar(car);
    setFormData(car);
    setShowModal(true);
  };

  const handleDeleteCar = (id: number): void => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      setCars(cars.filter((car) => car.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (editingCar) {
      setCars(cars.map((car) => (car.id === editingCar.id ? { ...formData, id: editingCar.id } as Car : car)));
    } else {
      const newCar: Car = {
        ...formData,
        id: cars.length + 1
      } as Car;
      setCars([...cars, newCar]);
    }
    setShowModal(false);
    setEditingCar(null);
  };

  const toggleAvailability = (id: number): void => {
    setCars(cars.map((car) => (car.id === id ? { ...car, available: !car.available } : car)));
  };

  return (
    <div className="admin-cars">
      <div className="admin-cars-header">
        <div>
          <h2>Car Management</h2>
          <p>Manage your fleet of rental cars</p>
        </div>
        <button className="add-car-btn" onClick={handleAddCar}>
          <i className="fas fa-plus"></i>
          Add New Car
        </button>
      </div>

      <div className="cars-table-container">
        <table className="admin-cars-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Seats</th>
              <th>Price/Day</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>
                  <img src={car.image} alt={car.name} className="car-thumbnail" />
                </td>
                <td>{car.name}</td>
                <td>{car.type}</td>
                <td>{car.seats}</td>
                <td>${car.price}</td>
                <td>
                  <span
                    className={`status-badge ${car.available ? "available" : "unavailable"}`}
                    onClick={() => toggleAvailability(car.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {car.available ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit" onClick={() => handleEditCar(car)} title="Edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="action-btn delete" onClick={() => handleDeleteCar(car.id)} title="Delete">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingCar ? "Edit Car" : "Add New Car"}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="car-form">
              <div className="form-group">
                <label>Car Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                >
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Seats</label>
                  <input
                    type="number"
                    value={formData.seats}
                    onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                    min="2"
                    max="10"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price per Day ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  />
                  <span>Available for rent</span>
                </label>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingCar ? "Update Car" : "Add Car"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

