
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Cars.css";

interface Car {
  id: number;
  name: string;
  type: string;
  seats: number;
  price: number;
  image: string;
  available: boolean;
}

interface FilterState {
  type: string;
  seats: string;
  priceRange: string;
}

const mockCars: Car[] = [
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
  },
  {
    id: 5,
    name: "Mercedes-Benz C-Class",
    type: "Luxury",
    seats: 5,
    price: 130,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop",
    available: true
  },
  {
    id: 6,
    name: "Nissan Altima",
    type: "Sedan",
    seats: 5,
    price: 42,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
    available: true
  }
];

export default function Cars(): React.JSX.Element {
  const [filter, setFilter] = useState<FilterState>({ type: "all", seats: "all", priceRange: "all" });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredCars = mockCars.filter((car) => {
    const matchesType = filter.type === "all" || car.type.toLowerCase() === filter.type.toLowerCase();
    const matchesSeats = filter.seats === "all" || car.seats >= parseInt(filter.seats);
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesPrice = true;
    if (filter.priceRange !== "all") {
      const [min, max] = filter.priceRange.split("-").map(Number);
      matchesPrice = car.price >= min && (max ? car.price <= max : true);
    }

    return matchesType && matchesSeats && matchesSearch && matchesPrice;
  });

  return (
    <div className="cars-page">
      <div className="cars-header">
        <div className="container">
          <h1>Our Fleet</h1>
          <p>Choose from our wide selection of vehicles</p>
        </div>
      </div>

      <div className="container">
        <div className="cars-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Type:</label>
            <select value={filter.type} onChange={(e) => setFilter({ ...filter, type: e.target.value })}>
              <option value="all">All Types</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Seats:</label>
            <select value={filter.seats} onChange={(e) => setFilter({ ...filter, seats: e.target.value })}>
              <option value="all">All</option>
              <option value="5">5+ Seats</option>
              <option value="7">7+ Seats</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Price:</label>
            <select value={filter.priceRange} onChange={(e) => setFilter({ ...filter, priceRange: e.target.value })}>
              <option value="all">All Prices</option>
              <option value="0-50">Under $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100">$100+</option>
            </select>
          </div>
        </div>

        <div className="cars-grid">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div key={car.id} className="car-card">
                <div className="car-image">
                  <img src={car.image} alt={car.name} />
                  {car.available && <span className="available-badge">Available</span>}
                </div>
                <div className="car-info">
                  <h3>{car.name}</h3>
                  <div className="car-details">
                    <span>{car.type}</span>
                    <span>{car.seats} Seats</span>
                  </div>
                  <div className="car-price">
                    <span className="price">${car.price}</span>
                    <span className="price-unit">/day</span>
                  </div>
                  <Link to={`/cars/${car.id}`} className="view-details-btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No cars found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

