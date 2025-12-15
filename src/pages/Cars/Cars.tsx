
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiService } from "../../services/api";
import "./Cars.css";

interface Car {
  _id: string;
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

export default function Cars(): React.JSX.Element {
  const [filter, setFilter] = useState<FilterState>({ type: "all", seats: "all", priceRange: "all" });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchCars();
  }, [filter, searchTerm]);

  const fetchCars = async () => {
    setLoading(true);
    setError("");
    try {
      const filters: any = {
        available: true,
      };
      
      if (filter.type !== "all") {
        filters.type = filter.type;
      }
      if (filter.seats !== "all") {
        filters.seats = filter.seats;
      }
      if (filter.priceRange !== "all") {
        filters.priceRange = filter.priceRange;
      }
      if (searchTerm) {
        filters.search = searchTerm;
      }

      const response = await apiService.getCars(filters);
      
      if (response.success && response.data) {
        setCars(response.data);
      } else {
        setError(response.error || "Failed to load cars");
      }
    } catch (err) {
      setError("Failed to load cars. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCars = cars;

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

        {loading ? (
          <div className="loading" style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Loading cars...</p>
          </div>
        ) : error ? (
          <div className="error" style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
            <p>{error}</p>
          </div>
        ) : (
          <div className="cars-grid">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <div key={car._id} className="car-card">
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
                    <Link to={`/cars/${car._id}`} className="view-details-btn">
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
        )}
      </div>
    </div>
  );
}

