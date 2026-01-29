import { useEffect, useState, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

// Assets
const LOGO_URL = "https://customer-assets.emergentagent.com/job_088889e5-4e09-4832-a9ab-ee47810e4742/artifacts/9u1yrvg7_PHOTO-2025-12-18-21-58-23.jpeg";
const LOCKER_IMAGE = "https://customer-assets.emergentagent.com/job_secure-locker-8/artifacts/nnxxz388_IMG_5788.jpeg";
const EVENT_IMAGE_1 = "https://images.unsplash.com/photo-1549452026-91574599e7f6?w=800&q=80";
const EVENT_IMAGE_2 = "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80";
const EVENT_IMAGE_3 = "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=800&q=80";

// Icons as SVG components
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    <circle cx="12" cy="16" r="1"/>
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const MonitorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// Animated Section Component
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation();
  const delayClass = delay ? `animate-delay-${delay}` : '';
  
  return (
    <div 
      ref={ref} 
      className={`animate-on-scroll ${isVisible ? 'visible' : ''} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
  };

  const isHomePage = location.pathname === '/';

  const scrollToSection = (sectionId) => {
    if (!isHomePage) {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    if (isHomePage && window.location.hash) {
      setTimeout(() => {
        const sectionId = window.location.hash.slice(1);
        scrollToSection(sectionId);
      }, 100);
    }
  }, [isHomePage]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav-container">
          <Link to="/" className="logo" aria-label="Smart Secure Lockers - Home">
            <img src={LOGO_URL} alt="" className="logo-icon" />
            <span className="logo-text">Smart Secure Lockers</span>
          </Link>
          
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
            <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a></li>
            <li><a href="#solutions" onClick={(e) => { e.preventDefault(); scrollToSection('solutions'); }}>Solutions</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
            <li>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="btn btn-primary">
                Get Started
              </a>
            </li>
          </ul>
          
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className="mobile-menu-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </nav>

      <div className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu} aria-hidden="true" />
      
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`} role="dialog" aria-label="Mobile navigation">
        <div className="mobile-nav-header">
          <Link to="/" className="logo">
            <img src={LOGO_URL} alt="" className="logo-icon" />
            <span className="logo-text">SSL</span>
          </Link>
          <button className="mobile-nav-close" onClick={toggleMobileMenu} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>
        <ul className="mobile-nav-links">
          <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
          <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a></li>
          <li><a href="#solutions" onClick={(e) => { e.preventDefault(); scrollToSection('solutions'); }}>Solutions</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
          <li style={{ marginTop: '1rem' }}>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

// Footer Component
const Footer = () => (
  <footer className="footer" role="contentinfo">
    <div className="footer-content">
      <div>
        <div className="footer-brand">
          <img src={LOGO_URL} alt="" className="logo-icon" />
          <span className="logo-text">Smart Secure Lockers</span>
        </div>
        <p className="footer-description">
          Providing reliable and smart locker solutions for events worldwide. Secure, easy, and efficient storage for attendees.
        </p>
        <div className="newsletter-title">Subscribe for Updates</div>
        <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }}>
          <input type="email" placeholder="Enter your email" required aria-label="Email for newsletter" />
          <button type="submit">Subscribe</button>
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
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/terms-of-service">Terms of Service</Link></li>
          <li><Link to="/imprint">Imprint</Link></li>
        </ul>
      </div>
      
      <div className="footer-links">
        <h4>Connect</h4>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </div>
    </div>
    
    <div className="footer-bottom">
      <span>© {new Date().getFullYear()} Smart Secure Lockers. All rights reserved.</span>
      <div className="footer-bottom-links">
        <Link to="/privacy-policy">Privacy</Link>
        <Link to="/terms-of-service">Terms</Link>
        <Link to="/imprint">Imprint</Link>
      </div>
    </div>
  </footer>
);

// Home Page
const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you within 24 hours.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <main>
      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-background-image" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="hero-badge-dot" aria-hidden="true" />
              Trusted by Event Planners Worldwide
            </div>
            <h1>
              Secure & <span className="highlight">Smart Storage</span> for Your Events
            </h1>
            <p className="hero-subtitle">
              Provide your guests with a safe, easy, and modern locker solution that ensures their belongings are protected while they enjoy the event.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary btn-lg">Get Started</a>
              <a href="#features" className="btn btn-secondary btn-lg">Learn More</a>
            </div>
          </div>
          <div className="hero-right">
            <p>
              Smart Secure Lockers provide innovative solutions for conferences, festivals, and events, ensuring secure storage and seamless access for every attendee.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section features">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label">Features</span>
            <h2 className="section-title">Why Choose <span className="highlight">Smart Lockers</span>?</h2>
            <p className="section-description">
              Our lockers are designed to provide convenience, security, and peace of mind for event organizers and attendees alike.
            </p>
          </div>
        </AnimatedSection>
        
        <div className="features-grid">
          <AnimatedSection delay={1}>
            <div className="feature-card">
              <div className="feature-icon"><LockIcon /></div>
              <h3>High Security</h3>
              <p>Personal codes and robust construction keep valuables safe during events.</p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={2}>
            <div className="feature-card">
              <div className="feature-icon"><BoltIcon /></div>
              <h3>Easy Access</h3>
              <p>Quick and effortless access for guests via smart codes for a seamless experience.</p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={3}>
            <div className="feature-card">
              <div className="feature-icon"><MonitorIcon /></div>
              <h3>Smart Integration</h3>
              <p>Integrates with event management platforms for seamless check-in and tracking.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="section section-alt">
        <div className="solutions-container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">Solutions</span>
              <h2 className="section-title">Tailored Solutions for Every Event</h2>
              <p className="section-description">
                From small gatherings to large festivals, our lockers adapt to your event's needs.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="solutions-content">
            <AnimatedSection>
              <div className="solutions-image">
                <img src={LOCKER_IMAGE} alt="Smart Secure Lockers at an event" loading="lazy" />
              </div>
            </AnimatedSection>
            
            <div className="solutions-list">
              <AnimatedSection delay={1}>
                <div className="solution-item">
                  <div className="solution-number">01</div>
                  <div>
                    <h3>Event Check-in</h3>
                    <p>Streamlined storage check-in for attendees, reducing queues and wait times.</p>
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={2}>
                <div className="solution-item">
                  <div className="solution-number">02</div>
                  <div>
                    <h3>Secure Storage</h3>
                    <p>Lockers equipped with high-security codes and monitoring for peace of mind.</p>
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={3}>
                <div className="solutions-cta">
                  <a href="#contact" className="btn btn-primary btn-lg">Request a Demo</a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <AnimatedSection>
          <div className="cta-content">
            <h2>Ready to Elevate Your Event Experience?</h2>
            <p>Join hundreds of event organizers who trust Smart Secure Lockers for their storage needs.</p>
            <div className="cta-buttons">
              <a href="#contact" className="btn btn-primary btn-lg">Request a Demo</a>
              <a href="#features" className="btn btn-outline">Learn More</a>
            </div>
          </div>
        </AnimatedSection>
        
        <div className="events-showcase">
          <AnimatedSection delay={1}>
            <div className="event-card">
              <img src={EVENT_IMAGE_1} alt="Music festival crowd" loading="lazy" />
              <span className="event-label">Festivals</span>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={2}>
            <div className="event-card">
              <img src={EVENT_IMAGE_2} alt="Conference attendees" loading="lazy" />
              <span className="event-label">Conferences</span>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={3}>
            <div className="event-card">
              <img src={EVENT_IMAGE_3} alt="Corporate event" loading="lazy" />
              <span className="event-label">Corporate Events</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact">
        <div className="contact-container">
          <AnimatedSection>
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>
                Want to see our lockers in action or request a personalized demo? Fill the form and our team will reach out within 24 hours.
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
          </AnimatedSection>
          
          <AnimatedSection delay={1}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Request a Demo</h3>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="form-input"
                  placeholder="Your full name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="form-input"
                  placeholder="you@example.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company / Event Name</label>
                <input 
                  type="text" 
                  id="company" 
                  className="form-input"
                  placeholder="Your company or event name" 
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  className="form-input"
                  placeholder="Tell us about your event and requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg submit-btn">Submit Request</button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

// Legal Pages with shared layout
const LegalPageLayout = ({ title, subtitle, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="back-link">
          <ArrowLeftIcon />
          Back to Home
        </Link>
        <div className="legal-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="legal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

// Privacy Policy
const PrivacyPolicy = () => (
  <LegalPageLayout title="Privacy Policy" subtitle="Last updated: January 2026">
    <h2>1. Introduction</h2>
    <p>Smart Secure Lockers ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our locker services.</p>
    <p>We comply with the General Data Protection Regulation (GDPR) and other applicable data protection laws in Germany and the European Union.</p>

    <h2>2. Data Controller</h2>
    <p>The data controller responsible for your personal data is:</p>
    <p>Smart Secure Lockers<br/>Bielefeld, Germany<br/>Email: smartsecurelockers@gmail.com<br/>Phone: +49 176 23969218</p>

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

    <h2>5. Your Rights</h2>
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
    <p>To exercise these rights, please contact us at <a href="mailto:smartsecurelockers@gmail.com">smartsecurelockers@gmail.com</a>.</p>

    <h2>6. Contact Us</h2>
    <p>If you have questions about this Privacy Policy, please contact:</p>
    <p>Email: <a href="mailto:smartsecurelockers@gmail.com">smartsecurelockers@gmail.com</a><br/>Phone: +49 176 23969218<br/>Address: Bielefeld, Germany</p>
  </LegalPageLayout>
);

// Terms of Service
const TermsOfService = () => (
  <LegalPageLayout title="Terms of Service" subtitle="Last updated: January 2026">
    <h2>1. Scope and Provider</h2>
    <p>These Terms of Service ("Terms") govern the use of services provided by Smart Secure Lockers, located in Bielefeld, Germany.</p>
    <p>By using our services, you ("Customer" or "you") agree to these Terms. If you do not agree, please do not use our services.</p>

    <h2>2. Services Description</h2>
    <p>Smart Secure Lockers provides:</p>
    <ul>
      <li>Temporary storage solutions (lockers) for events, conferences, and festivals</li>
      <li>Digital access management via code systems</li>
      <li>Integration with event management platforms</li>
      <li>Customer support and maintenance services</li>
    </ul>

    <h2>3. User Obligations</h2>
    <p>As a user of our services, you agree to:</p>
    <ul>
      <li>Provide accurate and complete information</li>
      <li>Use lockers only for lawful purposes</li>
      <li>Not store prohibited items (hazardous materials, illegal substances, weapons, perishables)</li>
      <li>Follow access procedures and security guidelines</li>
      <li>Report any damage or malfunction immediately</li>
      <li>Retrieve stored items within the agreed rental period</li>
    </ul>

    <h2>4. Liability</h2>
    <p>Maximum liability for stored items is limited to €500 per locker unless additional insurance is arranged. We recommend not storing items of high sentimental or monetary value.</p>

    <h2>5. Governing Law</h2>
    <p>These Terms are governed by German law. For business customers, the exclusive place of jurisdiction is Bielefeld, Germany.</p>

    <h2>6. Contact Information</h2>
    <p>For questions about these Terms, please contact:</p>
    <p>Smart Secure Lockers<br/>Bielefeld, Germany<br/>Email: <a href="mailto:smartsecurelockers@gmail.com">smartsecurelockers@gmail.com</a><br/>Phone: +49 176 23969218</p>
  </LegalPageLayout>
);

// Imprint
const Imprint = () => (
  <LegalPageLayout title="Imprint (Impressum)" subtitle="Information according to § 5 TMG">
    <h2>Company Information</h2>
    <p><strong>Smart Secure Lockers</strong><br/>Bielefeld, Germany</p>

    <h2>Contact</h2>
    <p>Phone: +49 176 23969218<br/>Email: <a href="mailto:smartsecurelockers@gmail.com">smartsecurelockers@gmail.com</a></p>

    <h2>Represented by</h2>
    <p>Smart Secure Lockers Management</p>

    <h2>VAT Identification Number</h2>
    <p>VAT identification number according to §27a of the German VAT Act:<br/>[VAT number to be added]</p>

    <h2>Dispute Resolution</h2>
    <p>The European Commission provides a platform for online dispute resolution (OS): <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a></p>
    <p>We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.</p>

    <h2>Liability for Content</h2>
    <p>As a service provider, we are responsible for our own content on these pages according to § 7 para. 1 TMG. However, according to §§ 8 to 10 TMG, we are not obligated to monitor transmitted or stored third-party information.</p>

    <h2>Copyright</h2>
    <p>The content and works created by the site operators on these pages are subject to German copyright law. Downloads and copies of this site are only permitted for private, non-commercial use.</p>
  </LegalPageLayout>
);

// App
function App() {
  return (
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
  );
}

export default App;
