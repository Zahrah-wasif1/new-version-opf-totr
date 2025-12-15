import React from "react";
import { Link } from "react-router-dom";
import Slider from "../../components/Slider";
import "./Home.css";

export default function Home(): React.JSX.Element {
  return (
    <div className="home-page">
      <Slider />
      
      <section className="cars-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Vehicles</h2>
          </div>
          <div className="cars-grid-home">
            <div className="car-card-home">
              <div className="car-image-home">
                <img src="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop" alt="Toyota Camry" />
                <span className="available-badge-home">Available</span>
              </div>
              <div className="car-info-home">
                <h3>Toyota Camry</h3>
                <div className="car-details-home">
                  <span>Sedan</span>
                  <span>5 Seats</span>
                </div>
                <div className="car-price-home">
                  <span className="price-home">$45</span>
                  <span className="price-unit-home">/day</span>
                </div>
                <Link to="/cars/1" className="view-details-btn-home">
                  View Details
                </Link>
              </div>
            </div>

            <div className="car-card-home">
              <div className="car-image-home">
                <img src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop" alt="Honda Accord" />
                <span className="available-badge-home">Available</span>
              </div>
              <div className="car-info-home">
                <h3>Honda Accord</h3>
                <div className="car-details-home">
                  <span>Sedan</span>
                  <span>5 Seats</span>
                </div>
                <div className="car-price-home">
                  <span className="price-home">$48</span>
                  <span className="price-unit-home">/day</span>
                </div>
                <Link to="/cars/2" className="view-details-btn-home">
                  View Details
                </Link>
              </div>
            </div>

            <div className="car-card-home">
              <div className="car-image-home">
                <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop" alt="Ford Explorer" />
                <span className="available-badge-home">Available</span>
              </div>
              <div className="car-info-home">
                <h3>Ford Explorer</h3>
                <div className="car-details-home">
                  <span>SUV</span>
                  <span>7 Seats</span>
                </div>
                <div className="car-price-home">
                  <span className="price-home">$75</span>
                  <span className="price-unit-home">/day</span>
                </div>
                <Link to="/cars/3" className="view-details-btn-home">
                  View Details
                </Link>
              </div>
            </div>

            <div className="car-card-home">
              <div className="car-image-home">
                <img src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop" alt="BMW 3 Series" />
                <span className="available-badge-home">Available</span>
              </div>
              <div className="car-info-home">
                <h3>BMW 3 Series</h3>
                <div className="car-details-home">
                  <span>Luxury</span>
                  <span>5 Seats</span>
                </div>
                <div className="car-price-home">
                  <span className="price-home">$120</span>
                  <span className="price-unit-home">/day</span>
                </div>
                <Link to="/cars/4" className="view-details-btn-home">
                  View Details
                </Link>
              </div>
            </div>
          </div>
          <div className="view-all-container">
            <Link to="/cars" className="view-all-btn">View All Cars →</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-car"></i>
              </div>
              <h3>Wide Selection</h3>
              <p>Choose from our extensive fleet of premium and economy vehicles</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <h3>Best Prices</h3>
              <p>Competitive rates with no hidden fees or charges</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <h3>Quick Booking</h3>
              <p>Easy online booking process completed in minutes</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Fully Insured</h3>
              <p>All vehicles come with comprehensive insurance coverage</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Excellent service and great cars! The booking process was smooth and the staff was very helpful."
              </p>
              <div className="testimonial-author">
                <strong>John Doe</strong>
                <span>Regular Customer</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Best car rental experience I've had. The car was clean, well-maintained, and the rates were fair."
              </p>
              <div className="testimonial-author">
                <strong>Sarah Smith</strong>
                <span>Business Traveler</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Highly recommend! Quick booking, great customer service, and reliable vehicles."
              </p>
              <div className="testimonial-author">
                <strong>Mike Johnson</strong>
                <span>Family Traveler</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

