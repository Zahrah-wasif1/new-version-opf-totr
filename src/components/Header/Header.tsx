
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <h1 className="logo">
            <span className="logo-black">Track </span>
            <span className="logo-green">OnTrack Rental</span>
          </h1>
        </Link>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/cars">Cars</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/login" className="login-link">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
