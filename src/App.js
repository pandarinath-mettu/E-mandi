import React, { useState } from 'react';
import './App.css';
import {
  User, ShoppingCart, TrendingUp, MapPin, Calendar,
  MessageSquare, Settings, FileText, Home, Search,
  Bell, Menu, X, ChevronDown, Phone, Mail, Globe
} from 'react-feather';

const EMandi = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [registrationForm, setRegistrationForm] = useState({
    name: '', email: '', phone: '', userType: 'civilian', location: ''
  });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  // Sample data
  const vegetables = [
    { id: 1, name: 'Tomato', retailPrice: 45, wholesalePrice: 35, govPrice: 40, quantity: '500kg', region: 'Mumbai' },
    { id: 2, name: 'Onion', retailPrice: 30, wholesalePrice: 25, govPrice: 28, quantity: '750kg', region: 'Delhi' },
    { id: 3, name: 'Potato', retailPrice: 25, wholesalePrice: 20, govPrice: 22, quantity: '1000kg', region: 'Bangalore' },
    { id: 4, name: 'Carrot', retailPrice: 40, wholesalePrice: 32, govPrice: 36, quantity: '300kg', region: 'Chennai' },
  ];

  const regions = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];

  const handleLogin = (e) => {
    e.preventDefault();
    setCurrentUser({ 
      name: 'John Doe', 
      email: loginForm.email, 
      userType: 'civilian',
      id: 'USER001'
    });
    setShowAuthModal(false);
    setLoginForm({ email: '', password: '' });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setCurrentUser({ 
      ...registrationForm, 
      id: 'USER' + Math.random().toString(36).substr(2, 9).toUpperCase()
    });
    setShowAuthModal(false);
    setRegistrationForm({ name: '', email: '', phone: '', userType: 'civilian', location: '' });
  };

  const VegetableCard = ({ vegetable }) => (
    <div className="vegetable-card">
      <div className="vegetable-content">
        <div className="vegetable-header">
          <div>
            <h3 className="vegetable-name">{vegetable.name}</h3>
            <p className="vegetable-region">
              <MapPin size={16} className="icon" /> {vegetable.region}
            </p>
          </div>
          <div className="vegetable-availability">
            <span className="availability-label">Available</span>
            <p className="availability-quantity">{vegetable.quantity}</p>
          </div>
        </div>
        
        <div className="vegetable-prices">
          <div className="vegetable-price price-retail">
            <span>Retail Price</span>
            <span className="price-value">₹{vegetable.retailPrice}/kg</span>
          </div>
          <div className="vegetable-price price-wholesale">
            <span>Wholesale Price</span>
            <span className="price-value">₹{vegetable.wholesalePrice}/kg</span>
          </div>
          <div className="vegetable-price price-govt">
            <span>Govt. Rate</span>
            <span className="price-value">₹{vegetable.govPrice}/kg</span>
          </div>
        </div>
        
        <div className="price-difference">
          <span>Price Difference</span>
          <span className="difference-value">
            ₹{vegetable.retailPrice - vegetable.wholesalePrice}/kg
          </span>
        </div>
      </div>
    </div>
  );

  const StatsCard = ({ icon: Icon, title, value, color }) => (
    <div className={`stat-card ${color}`}>
      <div>
        <p className="stat-text">{title}</p>
        <h3>{value}</h3>
      </div>
      <Icon size={32} className="stat-icon" />
    </div>
  );

  const renderHome = () => (
    <div className="page-content">
      <div className="hero">
        <h2>E-MANDI</h2>
        <p className="description">
          Transparent pricing, direct farmer-to-consumer connections, and real-time market data 
          to eliminate middleman exploitation and ensure fair prices for all.
        </p>
        <div className="hero-buttons">
          <button className="explore-btn" onClick={() => setActiveTab('marketplace')}>
            Explore Market
          </button>
          <button className="compare-btn" onClick={() => setActiveTab('pricing')}>
            Compare Prices
          </button>
        </div>
      </div>

      <div className="stats">
        <StatsCard icon={User} title="Active Users" value="12,547" color="blue" />
        <StatsCard icon={ShoppingCart} title="Products Listed" value="3,249" color="green" />
        <StatsCard icon={TrendingUp} title="Avg. Savings" value="₹850/month" color="purple" />
        <StatsCard icon={MapPin} title="Cities Covered" value="127" color="orange" />
      </div>

      <div className="section">
        <h2 className="section-title">Today's Best Deals</h2>
        <div className="vegetable-grid">
          {vegetables.slice(0, 4).map(veg => (
            <VegetableCard key={veg.id} vegetable={veg} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderMarketplace = () => (
    <div className="page-content">
      <div className="section-header">
        <h2 className="section-title">Marketplace</h2>
        <div className="search-filter">
          <select className="filter-select">
            <option>All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search vegetables..." className="search-input" />
          </div>
        </div>
      </div>
      <div className="vegetable-grid">
        {vegetables.map(veg => (
          <VegetableCard key={veg.id} vegetable={veg} />
        ))}
      </div>
    </div>
  );

  const renderPricing = () => (
    <div className="page-content">
      <h2 className="section-title">Price Comparison</h2>
      <div className="table-container">
        <table className="price-table">
          <thead>
            <tr>
              <th>Vegetable</th>
              <th>Region</th>
              <th>Retail Price</th>
              <th>Wholesale Price</th>
              <th>Govt. Rate</th>
              <th>Margin</th>
            </tr>
          </thead>
          <tbody>
            {vegetables.map(veg => (
              <tr key={veg.id}>
                <td>{veg.name}</td>
                <td>{veg.region}</td>
                <td className="price-retail">₹{veg.retailPrice}/kg</td>
                <td className="price-wholesale">₹{veg.wholesalePrice}/kg</td>
                <td className="price-govt">₹{veg.govPrice}/kg</td>
                <td className="price-difference-value">
                  ₹{veg.retailPrice - veg.wholesalePrice}/kg
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBooking = () => (
    <div className="page-content">
      <h2 className="section-title">Bulk Booking</h2>
      <div className="form-container">
        <h3>Place Bulk Order</h3>
        <form className="bulk-order-form">
          <div className="form-group">
            <label className="form-label">Select Vegetable</label>
            <select className="form-input">
              <option>Choose vegetable...</option>
              {vegetables.map(veg => (
                <option key={veg.id} value={veg.name}>{veg.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Quantity (kg)</label>
            <input type="number" placeholder="Enter quantity" className="form-input" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Preferred Region</label>
            <select className="form-input">
              <option>Select region...</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Delivery Date</label>
            <input type="date" className="form-input" />
          </div>
          
          <button type="submit" className="form-button">
            Submit Order Request
          </button>
        </form>
      </div>
    </div>
  );

  const AuthModal = () => (
    <div className="auth-modal">
      <div className="auth-modal-content">
        <div className="auth-modal-header">
          <h2>{authMode === 'login' ? 'Login' : 'Register'}</h2>
          <button onClick={() => setShowAuthModal(false)} className="auth-modal-close">
            <X size={20} />
          </button>
        </div>
        
        {authMode === 'login' ? (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="form-button">
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={registrationForm.name}
                onChange={(e) => setRegistrationForm({...registrationForm, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={registrationForm.email}
                onChange={(e) => setRegistrationForm({...registrationForm, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input 
                type="tel" 
                value={registrationForm.phone}
                onChange={(e) => setRegistrationForm({...registrationForm, phone: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>User Type</label>
              <select 
                value={registrationForm.userType}
                onChange={(e) => setRegistrationForm({...registrationForm, userType: e.target.value})}
              >
                <option value="civilian">Civilian</option>
                <option value="farmer">Farmer</option>
                <option value="retailer">Retailer</option>
                <option value="wholesaler">Wholesaler</option>
              </select>
            </div>
            <div className="form-group">
              <label>Location</label>
              <select 
                value={registrationForm.location}
                onChange={(e) => setRegistrationForm({...registrationForm, location: e.target.value})}
                required
              >
                <option value="">Select location...</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="form-button">
              Register
            </button>
          </form>
        )}
        
        <div className="auth-toggle">
          <button 
            onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            className="link-button"
          >
            {authMode === 'login' 
              ? "Don't have an account? Register" 
              : "Already have an account? Login"
            }
          </button>
        </div>
      </div>
    </div>
  );

  const Navigation = () => {
    const navItems = [
      { key: 'home', label: 'Home', icon: Home },
      { key: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
      { key: 'pricing', label: 'Price Comparison', icon: TrendingUp },
      { key: 'booking', label: 'Bulk Booking', icon: Calendar },
      { key: 'reports', label: 'Reports', icon: FileText },
      { key: 'complaints', label: 'Complaints', icon: MessageSquare },
      { key: 'help', label: 'Help', icon: Settings },
    ];

    return (
      <nav className="navbar">
        <div className="logo">
          <div className="logo-circle">E</div>
          <div>
            <h1 className="brand">E-MANDI</h1>
            <p className="subtitle">Electronic Vegetable Market</p>
          </div>
        </div>

        <div className={`nav-items ${isMenuOpen ? 'open' : ''}`}>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  setIsMenuOpen(false);
                }}
                className={`nav-item ${activeTab === item.key ? 'active' : ''}`}
              >
                <Icon size={18} className="nav-icon" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="nav-actions">
          <select className="language">
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="te">తెలుగు</option>
          </select>
          
          {currentUser ? (
            <div className="user-section">
              <button className="icon-button">
                <Bell size={20} className="notification-icon" />
              </button>
              <div className="user-profile">
                <User size={18} className="user-icon" />
                <span>{currentUser.name}</span>
              </div>
              <button 
                onClick={() => setCurrentUser(null)}
                className="logout-btn"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={() => {setShowAuthModal(true); setAuthMode('login');}}
                className="login"
              >
                Login
              </button>
              <button 
                onClick={() => {setShowAuthModal(true); setAuthMode('register');}}
                className="register"
              >
                Register
              </button>
            </>
          )}
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="menu-icon"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHome();
      case 'marketplace': return renderMarketplace();
      case 'pricing': return renderPricing();
      case 'booking': return renderBooking();
      case 'reports': return renderReports();
      case 'complaints': return renderComplaints();
      case 'help': return renderHelp();
      default: return renderHome();
    }
  };

  const renderReports = () => (
    <div className="page-content">
      <h2 className="section-title">Reports & Analytics</h2>
      <div className="reports-container">
        <p>Reports content will be displayed here</p>
      </div>
    </div>
  );

  const renderComplaints = () => (
    <div className="page-content">
      <h2 className="section-title">Complaints & Feedback</h2>
      <div className="complaints-container">
        <p>Complaints content will be displayed here</p>
      </div>
    </div>
  );

  const renderHelp = () => (
    <div className="page-content">
      <h2 className="section-title">Help & Support</h2>
      <div className="help-container">
        <div className="help-section">
          <h3>Contact Support</h3>
          <div className="contact-method">
            <Phone size={16} />
            <span>1800-123-4567</span>
          </div>
          <div className="contact-method">
            <Mail size={16} />
            <span>support@emandi.gov.in</span>
          </div>
          <div className="contact-method">
            <Globe size={16} />
            <span>www.emandi.gov.in</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">
      <Navigation />
      {renderContent()}
      {showAuthModal && <AuthModal />}
      
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-about">
            <div className="footer-logo">
              <div className="footer-logo-circle">E</div>
              <span className="footer-title">E-MANDI</span>
            </div>
            <p className="footer-description">
              Transparent vegetable market platform connecting farmers, retailers, 
              and consumers for fair pricing.
            </p>
          </div>
          
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><button className="footer-link" onClick={() => setActiveTab('marketplace')}>Market Prices</button></li>
              <li><button className="footer-link" onClick={() => setActiveTab('booking')}>Bulk Orders</button></li>
              <li><button className="footer-link" onClick={() => setActiveTab('pricing')}>Price Comparison</button></li>
              <li><button className="footer-link" onClick={() => setActiveTab('reports')}>Reports</button></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h3>Support</h3>
            <ul>
              <li><button className="footer-link" onClick={() => setActiveTab('help')}>Help Center</button></li>
              <li><button className="footer-link" onClick={() => setActiveTab('help')}>Contact Us</button></li>
              <li><button className="footer-link" onClick={() => setActiveTab('complaints')}>Submit Complaint</button></li>
              <li><button className="footer-link" onClick={() => setActiveTab('help')}>FAQ</button></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3>Connect</h3>
            <div className="social-icons">
              <a href="https://facebook.com" aria-label="Facebook" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2023 E-MANDI. All rights reserved. | A Government of India Initiative</p>
        </div>
      </footer>
    </div>
  );
};

export default EMandi;