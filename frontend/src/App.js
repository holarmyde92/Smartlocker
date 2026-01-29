import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

// Logo URL
const LOGO_URL = "https://customer-assets.emergentagent.com/job_088889e5-4e09-4832-a9ab-ee47810e4742/artifacts/9u1yrvg7_PHOTO-2025-12-18-21-58-23.jpeg";

// Event Images
const EVENT_IMAGE_1 = "https://images.unsplash.com/photo-1549452026-91574599e7f6?w=800&q=80"; // Festival crowd
const EVENT_IMAGE_2 = "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80"; // Conference
const EVENT_IMAGE_3 = "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=800&q=80"; // Auditorium

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isHomePage = location.pathname === '/';

  const scrollToSection = (sectionId) => {
    if (!isHomePage) {
      // Navigate to home page with hash
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle hash navigation on page load
  useEffect(() => {
    if (isHomePage && window.location.hash) {
      const sectionId = window.location.hash.slice(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const navHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [isHomePage]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} data-testid="navbar">
        <div className="nav-container">
          <Link to="/" className="logo" data-testid="logo-link">
            <img src={LOGO_URL} alt="Smart Secure Lockers" className="logo-icon" />
            <span className="logo-text">Smart Secure Lockers</span>
          </Link>
          <ul className="nav-links">
            <li><a href="/#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} data-testid="nav-home">Home</a></li>
            <li><a href="/#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }} data-testid="nav-features">Features</a></li>
            <li><a href="/#solutions" onClick={(e) => { e.preventDefault(); scrollToSection('solutions'); }} data-testid="nav-solutions">Solutions</a></li>
            <li><a href="/#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} data-testid="nav-contact">Contact</a></li>
            <li><a href="/#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="btn-primary" data-testid="nav-get-started">Get Started</a></li>
          </ul>
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(true)}
            data-testid="mobile-menu-btn"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)} />
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`} data-testid="mobile-nav">
        <div className="mobile-nav-header">
          <Link to="/" className="logo">
            <img src={LOGO_URL} alt="Smart Secure Lockers" className="logo-icon" />
            <span className="logo-text">SSL</span>
          </Link>
          <button className="mobile-nav-close" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-nav-close">✕</button>
        </div>
        <ul className="mobile-nav-links">
          <li><a href="/#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); setMobileMenuOpen(false); }}>Home</a></li>
          <li><a href="/#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); setMobileMenuOpen(false); }}>Features</a></li>
          <li><a href="/#solutions" onClick={(e) => { e.preventDefault(); scrollToSection('solutions'); setMobileMenuOpen(false); }}>Solutions</a></li>
          <li><a href="/#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); setMobileMenuOpen(false); }}>Contact</a></li>
          <li><a href="/#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); setMobileMenuOpen(false); }} className="btn-primary" style={{display: 'inline-block', marginTop: '1rem'}}>Get Started</a></li>
        </ul>
      </div>
    </>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-content">
        <div>
          <div className="footer-brand">
            <img src={LOGO_URL} alt="Smart Secure Lockers" className="logo-icon" />
            <span className="logo-text">Smart Secure Lockers</span>
          </div>
          <p className="footer-description">
            Providing reliable and smart locker solutions for events worldwide. Secure, easy, and efficient storage for attendees.
          </p>
          <div className="newsletter-title">Subscribe for Updates</div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" data-testid="newsletter-email" />
            <button type="submit" data-testid="newsletter-submit">Subscribe</button>
          </form>
        </div>
        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><a href="/#home">Home</a></li>
            <li><a href="/#features">Features</a></li>
            <li><a href="/#solutions">Solutions</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy-policy" data-testid="footer-privacy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" data-testid="footer-terms">Terms of Service</Link></li>
            <li><Link to="/imprint" data-testid="footer-imprint">Imprint</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" data-testid="social-facebook">F</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" data-testid="social-twitter">T</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" data-testid="social-instagram">I</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" data-testid="social-linkedin">L</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Smart Secure Lockers. All rights reserved.</span>
        <div style={{display: 'flex', gap: '1.5rem'}}>
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/terms-of-service">Terms</Link>
          <Link to="/imprint">Imprint</Link>
        </div>
      </div>
    </footer>
  );
};

// Home Page Component
const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero" data-testid="hero-section">
        <div className="hero-background-image"></div>
        <div className="hero-content">
          <div className="hero-left">
            <div className="trust-badge">
              <div className="trust-icons">
                <div className="trust-icon">⭐</div>
                <div className="trust-icon">🚀</div>
              </div>
              Trusted by Event Planners Worldwide
            </div>
            <h1>Secure & <span className="highlight">Smart Storage</span> for Your Events</h1>
            <p className="hero-subtitle">
              Provide your guests with a safe, easy, and modern locker solution that ensures their belongings are protected while enjoying events.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn-primary" data-testid="hero-cta-primary">Get Started</a>
              <a href="#features" className="btn-secondary" data-testid="hero-cta-secondary">Learn More</a>
            </div>
          </div>
          <div className="hero-right">
            <p>
              Smart Secure Lockers provide innovative solutions for conferences, festivals, and events, ensuring secure storage and seamless access for every attendee.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features" data-testid="features-section">
        <div className="section-header">
          <span className="section-label">Features</span>
          <h2 className="section-title">Why Choose <span className="highlight">Smart Lockers</span>?</h2>
          <p className="section-description">
            Our lockers are designed to provide convenience, security, and peace of mind for event organizers and attendees alike.
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card-minimal" data-testid="feature-card-secure">
            <div className="feature-icon-wrapper">
              <svg className="feature-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                <circle cx="12" cy="16" r="1"></circle>
              </svg>
            </div>
            <h3>High Security</h3>
            <p>Personal codes and robust construction keep valuables safe during events.</p>
          </div>
          <div className="feature-card-minimal" data-testid="feature-card-access">
            <div className="feature-icon-wrapper">
              <svg className="feature-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h3>Easy Access</h3>
            <p>Quick and effortless access for guests via smart codes for seamless experience.</p>
          </div>
          <div className="feature-card-minimal" data-testid="feature-card-integration">
            <div className="feature-icon-wrapper">
              <svg className="feature-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
                <path d="M7 8h2m2 0h2m2 0h2"></path>
                <path d="M7 12h10"></path>
              </svg>
            </div>
            <h3>Smart Integration</h3>
            <p>Integrates with event management platforms for seamless check-in and tracking.</p>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="solutions" data-testid="solutions-section">
        <div className="solutions-container">
          <div className="section-header">
            <span className="section-label">Solutions</span>
            <h2 className="section-title">Tailored Solutions for Every Event</h2>
            <p className="section-description">
              From small gatherings to large festivals, our lockers adapt to your event's needs.
            </p>
          </div>
          <div className="solutions-content">
            <div className="solutions-image-premium">
              <img src={LOCKER_IMAGE_1} alt="Smart Secure Lockers" />
            </div>
            <div className="solutions-list">
              <div className="solution-item" data-testid="solution-checkin">
                <div className="solution-number">01</div>
                <div>
                  <h3>Event Check-in</h3>
                  <p>Streamlined storage check-in for attendees, reducing queues and wait times.</p>
                </div>
              </div>
              <div className="solution-item" data-testid="solution-storage">
                <div className="solution-number">02</div>
                <div>
                  <h3>Secure Storage</h3>
                  <p>Lockers equipped with high-security codes and monitoring for peace of mind.</p>
                </div>
              </div>
              <a href="#contact" className="btn-primary explore-solutions-btn" data-testid="solutions-cta">Request a Demo</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" data-testid="cta-section">
        <div className="cta-content">
          <h2>Ready to Elevate Your Event Experience?</h2>
          <p>Join hundreds of event organizers who trust Smart Secure Lockers for their storage needs.</p>
          <div className="cta-buttons">
            <a href="#contact" className="btn-primary btn-large" data-testid="cta-button">Request a Demo</a>
            <a href="#features" className="btn-outline">Learn More</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact" data-testid="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              Want to see our lockers in action or request a personalized demo? Fill the form and our team will reach out promptly.
            </p>
            <div className="contact-item">
              <h3>Email</h3>
              <p>smartsecurelockers@gmail.com</p>
            </div>
            <div className="contact-item">
              <h3>Phone</h3>
              <p>+49 176 23969218</p>
            </div>
            <div className="contact-item">
              <h3>Location</h3>
              <p>Bielefeld, Germany</p>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit} data-testid="contact-form">
            <h3>Request a Demo</h3>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Your full name" 
                value={formData.name}
                onChange={handleChange}
                required
                data-testid="contact-name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="you@example.com" 
                value={formData.email}
                onChange={handleChange}
                required
                data-testid="contact-email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company / Event Name</label>
              <input 
                type="text" 
                id="company" 
                placeholder="Company or Event" 
                value={formData.company}
                onChange={handleChange}
                data-testid="contact-company"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                placeholder="Tell us more..."
                value={formData.message}
                onChange={handleChange}
                data-testid="contact-message"
              ></textarea>
            </div>
            <button type="submit" className="submit-btn" data-testid="contact-submit">Submit Request</button>
          </form>
        </div>
      </section>
    </>
  );
};

// Privacy Policy Page
const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page" data-testid="privacy-policy-page">
      <div className="legal-container">
        <Link to="/" className="back-link" data-testid="back-to-home">← Back to Home</Link>
        <div className="legal-header">
          <h1>Privacy Policy</h1>
          <p>Last updated: January 2026</p>
        </div>
        <div className="legal-content">
          <h2>1. Introduction</h2>
          <p>
            Smart Secure Lockers ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our locker services.
          </p>
          <p>
            We comply with the General Data Protection Regulation (GDPR) and other applicable data protection laws in Germany and the European Union.
          </p>

          <h2>2. Data Controller</h2>
          <p>The data controller responsible for your personal data is:</p>
          <p>
            Smart Secure Lockers<br />
            Bielefeld, Germany<br />
            Email: smartsecurelockers@gmail.com<br />
            Phone: +49 176 23969218
          </p>

          <h2>3. Information We Collect</h2>
          <h3>3.1 Personal Data</h3>
          <p>We may collect the following personal data:</p>
          <ul>
            <li>Name and contact information (email address, phone number)</li>
            <li>Company or organization name</li>
            <li>Event details and preferences</li>
            <li>Locker usage data and access logs</li>
            <li>Payment information (processed securely through third-party providers)</li>
          </ul>

          <h3>3.2 Automatically Collected Data</h3>
          <p>When you visit our website, we may automatically collect:</p>
          <ul>
            <li>IP address and device information</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent on our website</li>
            <li>Referring website addresses</li>
          </ul>

          <h2>4. Legal Basis for Processing</h2>
          <p>We process your personal data based on:</p>
          <ul>
            <li><strong>Consent (Art. 6(1)(a) GDPR):</strong> When you provide explicit consent for marketing communications.</li>
            <li><strong>Contract (Art. 6(1)(b) GDPR):</strong> To fulfill our contractual obligations when providing locker services.</li>
            <li><strong>Legitimate Interests (Art. 6(1)(f) GDPR):</strong> To improve our services and ensure security.</li>
            <li><strong>Legal Obligation (Art. 6(1)(c) GDPR):</strong> To comply with legal requirements.</li>
          </ul>

          <h2>5. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and maintain our locker services</li>
            <li>Process inquiries and demo requests</li>
            <li>Send relevant communications about our services</li>
            <li>Improve our website and services</li>
            <li>Ensure security and prevent fraud</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>6. Data Sharing and Disclosure</h2>
          <p>We may share your data with:</p>
          <ul>
            <li>Service providers who assist in operating our business</li>
            <li>Event organizers (only with your consent)</li>
            <li>Legal authorities when required by law</li>
          </ul>
          <p>We do not sell your personal data to third parties.</p>

          <h2>7. Data Retention</h2>
          <p>
            We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, typically:
          </p>
          <ul>
            <li>Contact form inquiries: 2 years</li>
            <li>Customer data: Duration of business relationship plus 10 years (German commercial law)</li>
            <li>Website analytics: 26 months</li>
          </ul>

          <h2>8. Your Rights</h2>
          <p>Under the GDPR, you have the right to:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
            <li><strong>Erasure:</strong> Request deletion of your personal data</li>
            <li><strong>Restriction:</strong> Limit the processing of your data</li>
            <li><strong>Portability:</strong> Receive your data in a structured format</li>
            <li><strong>Objection:</strong> Object to certain types of processing</li>
            <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
          </ul>
          <p>
            To exercise these rights, please contact us at <a href="mailto:smartsecurelockers@gmail.com">smartsecurelockers@gmail.com</a>.
          </p>

          <h2>9. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>10. Cookies</h2>
          <p>
            Our website uses cookies to enhance your browsing experience. For more information, please see our cookie settings when visiting our website.
          </p>

          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
          </p>
          <p>
            Email: <a href="mailto:smartsecurelockers@gmail.com">smartsecurelockers@gmail.com</a><br />
            Phone: +49 176 23969218<br />
            Address: Bielefeld, Germany
          </p>
          <p>
            You also have the right to lodge a complaint with the competent supervisory authority (Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen).
          </p>
        </div>
      </div>
    </div>
  );
};

// Terms of Service Page
const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page" data-testid="terms-of-service-page">
      <div className="legal-container">
        <Link to="/" className="back-link" data-testid="back-to-home">← Back to Home</Link>
        <div className="legal-header">
          <h1>Terms of Service</h1>
          <p>Last updated: January 2026</p>
        </div>
        <div className="legal-content">
          <h2>1. Scope and Provider</h2>
          <p>
            These Terms of Service ("Terms") govern the use of services provided by Smart Secure Lockers, located in Bielefeld, Germany ("Provider," "we," "our," or "us").
          </p>
          <p>
            By using our services, you ("Customer" or "you") agree to these Terms. If you do not agree, please do not use our services.
          </p>

          <h2>2. Services Description</h2>
          <p>Smart Secure Lockers provides:</p>
          <ul>
            <li>Temporary storage solutions (lockers) for events, conferences, and festivals</li>
            <li>Digital access management via mobile app or code systems</li>
            <li>Integration with event management platforms</li>
            <li>Customer support and maintenance services</li>
          </ul>

          <h2>3. Contract Formation</h2>
          <p>
            A contract is formed when we confirm your booking or service request in writing (including email). Our offers are non-binding until confirmed.
          </p>
          <p>
            For event organizers, additional agreements may apply based on specific requirements and scale.
          </p>

          <h2>4. User Obligations</h2>
          <p>As a user of our services, you agree to:</p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Use lockers only for lawful purposes</li>
            <li>Not store prohibited items (hazardous materials, illegal substances, weapons, perishables)</li>
            <li>Follow access procedures and security guidelines</li>
            <li>Report any damage or malfunction immediately</li>
            <li>Retrieve stored items within the agreed rental period</li>
          </ul>

          <h2>5. Prohibited Items</h2>
          <p>The following items may not be stored in our lockers:</p>
          <ul>
            <li>Weapons, explosives, or ammunition</li>
            <li>Illegal drugs or controlled substances</li>
            <li>Hazardous, flammable, or toxic materials</li>
            <li>Perishable food items</li>
            <li>Live animals</li>
            <li>Cash or high-value jewelry exceeding €500</li>
            <li>Items that may damage the locker or other stored items</li>
          </ul>

          <h2>6. Pricing and Payment</h2>
          <p>
            Prices for our services are as quoted at the time of booking. All prices include applicable VAT unless stated otherwise.
          </p>
          <p>
            Payment terms depend on the service type and will be communicated during the booking process. Event organizers may receive invoices with payment terms of 14 days.
          </p>

          <h2>7. Liability</h2>
          <h3>7.1 Our Liability</h3>
          <p>We are liable for:</p>
          <ul>
            <li>Damages caused intentionally or through gross negligence</li>
            <li>Injury to life, body, or health</li>
            <li>Breach of essential contractual obligations (cardinal duties)</li>
          </ul>
          <p>
            Our liability for slight negligence is limited to typical, foreseeable damages, unless relating to essential contractual obligations.
          </p>

          <h3>7.2 Limitation</h3>
          <p>
            Maximum liability for stored items is limited to €500 per locker unless additional insurance is arranged. We recommend not storing items of high sentimental or monetary value.
          </p>

          <h2>8. Lost Access Codes</h2>
          <p>
            If you lose your access code, please contact our support immediately. Identity verification will be required before alternative access is granted. A service fee may apply.
          </p>

          <h2>9. Unclaimed Items</h2>
          <p>
            Items left in lockers after the rental period ends will be stored for 30 days. After this period, we may dispose of or donate unclaimed items in accordance with German law (§§ 959, 960 BGB).
          </p>

          <h2>10. Cancellation and Refunds</h2>
          <p>
            Cancellations must be made at least 48 hours before the event start date for a full refund. Cancellations within 48 hours may be subject to a 50% cancellation fee.
          </p>
          <p>
            For consumers: You have a 14-day withdrawal right for contracts concluded at a distance, starting from the date of contract conclusion. To exercise this right, contact us at smartsecurelockers@gmail.com.
          </p>

          <h2>11. Data Protection</h2>
          <p>
            We process personal data in accordance with our <Link to="/privacy-policy">Privacy Policy</Link> and applicable data protection laws, including the GDPR.
          </p>

          <h2>12. Force Majeure</h2>
          <p>
            We are not liable for failure to perform our obligations due to circumstances beyond our reasonable control, including natural disasters, pandemics, strikes, or governmental actions.
          </p>

          <h2>13. Amendments</h2>
          <p>
            We reserve the right to amend these Terms. Changes will be communicated via email or our website. Continued use of our services after changes constitutes acceptance.
          </p>

          <h2>14. Governing Law and Jurisdiction</h2>
          <p>
            These Terms are governed by German law. For business customers, the exclusive place of jurisdiction is Bielefeld, Germany. Consumer rights under mandatory law remain unaffected.
          </p>

          <h2>15. Severability</h2>
          <p>
            If any provision of these Terms is found invalid or unenforceable, the remaining provisions remain in full force and effect.
          </p>

          <h2>16. Contact Information</h2>
          <p>For questions about these Terms, please contact:</p>
          <p>
            Smart Secure Lockers<br />
            Bielefeld, Germany<br />
            Email: <a href="mailto:smartsecurelockers@gmail.com">smartsecurelockers@gmail.com</a><br />
            Phone: +49 176 23969218
          </p>
        </div>
      </div>
    </div>
  );
};

// Imprint Page (Impressum - required in Germany)
const Imprint = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page" data-testid="imprint-page">
      <div className="legal-container">
        <Link to="/" className="back-link" data-testid="back-to-home">← Back to Home</Link>
        <div className="legal-header">
          <h1>Imprint (Impressum)</h1>
          <p>Information according to § 5 TMG</p>
        </div>
        <div className="legal-content">
          <h2>Company Information</h2>
          <p>
            <strong>Smart Secure Lockers</strong><br />
            Bielefeld, Germany
          </p>

          <h2>Contact</h2>
          <p>
            Phone: +49 176 23969218<br />
            Email: <a href="mailto:smartsecurelockers@gmail.com">smartsecurelockers@gmail.com</a>
          </p>

          <h2>Represented by</h2>
          <p>
            Smart Secure Lockers Management
          </p>

          <h2>VAT Identification Number</h2>
          <p>
            VAT identification number according to §27a of the German VAT Act:<br />
            [VAT number to be added]
          </p>

          <h2>Regulatory Authority</h2>
          <p>
            Trade Office (Gewerbeamt) Bielefeld<br />
            Niederwall 23<br />
            33602 Bielefeld, Germany
          </p>

          <h2>Professional Liability Insurance</h2>
          <p>
            [Insurance company and coverage details to be added]
          </p>

          <h2>Dispute Resolution</h2>
          <p>
            The European Commission provides a platform for online dispute resolution (OS): <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>
          </p>
          <p>
            Our email address can be found above in the contact information section.
          </p>
          <p>
            We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
          </p>

          <h2>Liability for Content</h2>
          <p>
            As a service provider, we are responsible for our own content on these pages according to § 7 para. 1 TMG (German Telemedia Act). However, according to §§ 8 to 10 TMG, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
          </p>
          <p>
            Obligations to remove or block the use of information according to general laws remain unaffected. However, liability in this regard is only possible from the time of knowledge of a specific infringement. Upon becoming aware of such violations, we will remove this content immediately.
          </p>

          <h2>Liability for Links</h2>
          <p>
            Our website may contain links to external third-party websites over whose content we have no influence. Therefore, we cannot accept any liability for this external content. The respective provider or operator of the pages is always responsible for the content of the linked pages.
          </p>
          <p>
            The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking. However, permanent content control of the linked pages is not reasonable without concrete evidence of a violation. Upon becoming aware of legal violations, we will remove such links immediately.
          </p>

          <h2>Copyright</h2>
          <p>
            The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, and any kind of exploitation outside the limits of copyright law require the written consent of the respective author or creator.
          </p>
          <p>
            Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is marked as such. Should you nevertheless become aware of a copyright infringement, please inform us accordingly. Upon becoming aware of legal violations, we will remove such content immediately.
          </p>

          <h2>Image Credits</h2>
          <p>
            Images on this website are sourced from:<br />
            - Unsplash (unsplash.com)<br />
            - Pexels (pexels.com)<br />
            - Company-owned materials
          </p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/imprint" element={<Imprint />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
