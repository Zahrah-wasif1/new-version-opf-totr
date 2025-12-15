import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiService } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./CarDetail.css";

interface Car {
  _id: string;
  name: string;
  type: string;
  seats: number;
  price: number;
  image: string;
  description?: string;
  features?: string[];
  available: boolean;
}

export default function CarDetail(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [bookingMessage, setBookingMessage] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetchCar();
    }
  }, [id]);

  const fetchCar = async () => {
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      const response = await apiService.getCar(id);
      if (response.success && response.data) {
        setCar(response.data);
      } else {
        setError(response.error || "Car not found");
      }
    } catch (err) {
      setError("Failed to load car details");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (): Promise<void> => {
    if (!startDate || !endDate) {
      setBookingMessage("Please select both start and end dates");
      return;
    }

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!car || !id) return;

    setBookingLoading(true);
    setBookingMessage("");

    try {
      const response = await apiService.createBooking({
        carId: id,
        startDate,
        endDate,
      });

      if (response.success) {
        setBookingMessage("Booking created successfully!");
        setStartDate("");
        setEndDate("");
      } else {
        setBookingMessage(response.error || "Failed to create booking");
      }
    } catch (err) {
      setBookingMessage("An error occurred. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="car-detail-page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Loading car details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="car-detail-page">
        <div className="container">
          <div className="not-found">
            <h2>{error || "Car not found"}</h2>
            <button className="back-button" onClick={() => navigate("/cars")}>Back to Cars</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="car-detail-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate("/cars")}>
          ← Back to Cars
        </button>

        <div className="car-detail-content">
          <div className="car-image-section">
            <img src={car.image} alt={car.name} />
            {car.available && <span className="available-badge">Available</span>}
          </div>

          <div className="car-info-section">
            <h1>{car.name}</h1>
            <div className="car-meta">
              <span className="car-type">{car.type}</span>
              <span className="car-seats">{car.seats} Seats</span>
            </div>
            <div className="car-price-section">
              <span className="price">${car.price}</span>
              <span className="price-unit">/day</span>
            </div>

            <div className="car-description">
              <h3>Description</h3>
              <p>{car.description}</p>
            </div>

            {car.features && car.features.length > 0 && (
              <div className="car-features">
                <h3>Features</h3>
                <ul>
                  {car.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="booking-section">
              <h3>Book This Car</h3>
              {bookingMessage && (
                <div style={{ 
                  padding: '0.75rem', 
                  marginBottom: '1rem', 
                  borderRadius: '4px',
                  backgroundColor: bookingMessage.includes('success') ? '#d4edda' : '#f8d7da',
                  color: bookingMessage.includes('success') ? '#155724' : '#721c24'
                }}>
                  {bookingMessage}
                </div>
              )}
              <div className="date-inputs">
                <div className="date-input">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    disabled={bookingLoading}
                  />
                </div>
                <div className="date-input">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split("T")[0]}
                    disabled={bookingLoading}
                  />
                </div>
              </div>
              <button 
                className="book-button" 
                onClick={handleBooking}
                disabled={bookingLoading}
              >
                {bookingLoading ? "Booking..." : "Book Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

