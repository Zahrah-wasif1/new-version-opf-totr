import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <h3 className="footer-logo">
              <span className="logo-black">Track </span>
              <span className="logo-green">OnTrack Rental</span>
            </h3>
            <p className="footer-description">
              Your trusted partner for premium car rental services. 
              Experience the freedom of the road with our reliable fleet.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/cars">Services</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4 className="footer-title">Our Services</h4>
            <ul className="footer-links">
              <li><Link to="/cars">Car Rental</Link></li>
              <li><Link to="/cars">Luxury Cars</Link></li>
              <li><Link to="/cars">Economy Cars</Link></li>
              <li><Link to="/cars">SUV Rental</Link></li>
              <li><Link to="/cars">Long Term Rental</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-title">Contact Info</h4>
            <ul className="footer-contact">
              <li>
                <i className="fas fa-envelope"></i>
                <span className="contact-label">Email:</span>
                <span>info@trackontrack.com</span>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <span className="contact-label">Phone:</span>
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span className="contact-label">Address:</span>
                <span>123 Rental Street, City, State 12345</span>
              </li>
            </ul>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Track OnTrack Rental. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

