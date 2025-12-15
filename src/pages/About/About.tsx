import "./About.css";

export default function About(): React.JSX.Element {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1>About Track OnTrack Rental</h1>
          <p>Your trusted partner for premium car rental services</p>
        </div>
      </div>

      <div className="container">
        <section className="about-content">
          <div className="about-section">
            <h2>Our Story</h2>
            <p>
              Track OnTrack Rental was founded with a simple mission: to provide reliable, 
              affordable, and convenient car rental services to customers. We understand that 
              transportation is essential, and we're committed to making your journey as smooth 
              as possible.
            </p>
            <p>
              With years of experience in the automotive industry, we've built a reputation for 
              excellence and customer satisfaction. Our fleet consists of well-maintained vehicles 
              from trusted manufacturers, ensuring your safety and comfort.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              To provide exceptional car rental services that exceed customer expectations while 
              maintaining competitive prices and ensuring vehicle reliability and safety.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Reliability</h3>
                <p>We ensure all our vehicles are well-maintained and ready for your journey.</p>
              </div>
              <div className="value-card">
                <h3>Customer Service</h3>
                <p>Our team is dedicated to providing excellent support throughout your rental experience.</p>
              </div>
              <div className="value-card">
                <h3>Transparency</h3>
                <p>No hidden fees. Clear pricing and terms for all our services.</p>
              </div>
              <div className="value-card">
                <h3>Innovation</h3>
                <p>We continuously improve our services and technology to serve you better.</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Why Choose Us</h2>
            <ul className="features-list">
              <li>Wide selection of vehicles from economy to luxury</li>
              <li>Competitive pricing with no hidden fees</li>
              <li>24/7 customer support</li>
              <li>Easy online booking process</li>
              <li>Fully insured vehicles</li>
              <li>Flexible rental periods</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

