import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CarDetail.css";

interface Car {
  id: number;
  name: string;
  type: string;
  seats: number;
  price: number;
  image: string;
  description: string;
  features: string[];
  available: boolean;
}

const mockCars: Record<string, Car> = {
  "1": {
    id: 1,
    name: "Toyota Camry",
    type: "Sedan",
    seats: 5,
    price: 45,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop",
    description: "The Toyota Camry is a reliable and comfortable sedan perfect for daily commutes and long trips. Features include advanced safety systems, fuel efficiency, and spacious interior.",
    features: ["Bluetooth", "GPS Navigation", "Backup Camera", "Cruise Control", "Air Conditioning"],
    available: true
  },
  "2": {
    id: 2,
    name: "Honda Accord",
    type: "Sedan",
    seats: 5,
    price: 48,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    description: "The Honda Accord offers excellent fuel economy and a smooth ride. Ideal for business travelers and families.",
    features: ["Bluetooth", "GPS Navigation", "Backup Camera", "Leather Seats", "Sunroof"],
    available: true
  },
  "3": {
    id: 3,
    name: "Ford Explorer",
    type: "SUV",
    seats: 7,
    price: 75,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
    description: "Spacious SUV perfect for families and group trips. Offers ample cargo space and comfortable seating for up to 7 passengers.",
    features: ["Third Row Seating", "All-Wheel Drive", "GPS Navigation", "Backup Camera", "Roof Rack"],
    available: true
  },
  "4": {
    id: 4,
    name: "BMW 3 Series",
    type: "Luxury",
    seats: 5,
    price: 120,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    description: "Experience luxury and performance with the BMW 3 Series. Premium features and exceptional driving experience.",
    features: ["Leather Seats", "Premium Sound System", "GPS Navigation", "Sunroof", "Heated Seats"],
    available: true
  },
  "5": {
    id: 5,
    name: "Mercedes-Benz C-Class",
    type: "Luxury",
    seats: 5,
    price: 130,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
    description: "Luxury and elegance combined. The Mercedes-Benz C-Class offers premium comfort and advanced technology.",
    features: ["Premium Leather", "Advanced Safety", "GPS Navigation", "Panoramic Sunroof", "Premium Audio"],
    available: true
  },
  "6": {
    id: 6,
    name: "Nissan Altima",
    type: "Sedan",
    seats: 5,
    price: 42,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    description: "Affordable and reliable sedan with great fuel economy. Perfect for budget-conscious travelers.",
    features: ["Bluetooth", "Backup Camera", "Air Conditioning", "USB Ports", "Keyless Entry"],
    available: true
  }
};

export default function CarDetail(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const car = id ? mockCars[id] : undefined;
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  if (!car) {
    return (
      <div className="car-detail-page">
        <div className="container">
          <div className="not-found">
            <h2>Car not found</h2>
            <button className="back-button" onClick={() => navigate("/cars")}>Back to Cars</button>
          </div>
        </div>
      </div>
    );
  }

  const handleBooking = (): void => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }
    // Navigate to booking page or show booking modal
    alert(`Booking ${car.name} from ${startDate} to ${endDate}`);
  };

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

            <div className="car-features">
              <h3>Features</h3>
              <ul>
                {car.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="booking-section">
              <h3>Book This Car</h3>
              <div className="date-inputs">
                <div className="date-input">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="date-input">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
              <button className="book-button" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

