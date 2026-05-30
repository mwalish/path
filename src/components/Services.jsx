import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './Services.css';

const API_BASE = 'https://lexluther.alwaysdata.net/api';

const Services = () => {
  const [view, setView] = useState('selection');
  const [currentService, setCurrentService] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Hotel & Product Grids
  const [hotels, setHotels] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const serviceConfig = {
    trip: {
      title: "Trip Details",
      endpoint: "/book_trip",
      fields: [
        { name: "username", label: "Explorer Name", type: "text", placeholder: "Your Username", required: true },
        { name: "email", label: "Email Address", type: "email", placeholder: "email@example.com", required: true },
        { name: "place_to_visit", label: "Place to Visit", type: "text", placeholder: "Destination Name", required: true },
        { name: "departure_date", label: "Departure Date", type: "date", required: true },
        { name: "number_of_people", label: "Number of People", type: "number", min: 1, value: 1 },
      ]
    },
    car: {
      title: "Car Rental",
      endpoint: "/book_car",
      fields: [
        { name: "username", label: "Explorer Name", type: "text", required: true },
        { name: "car_model", label: "Car Model", type: "text", placeholder: "e.g. SUV Explorer", required: true },
        { name: "pickup_date", label: "Pickup Date", type: "date", required: true },
        { name: "return_date", label: "Return Date", type: "date", required: true },
        { name: "total_cost", label: "Estimated Cost (Ksh)", type: "number", placeholder: "0.00" },
      ]
    },
    hotel: {
      title: "Hotel Selection",
      endpoint: "/book_hotel",
      fields: [] // Special handling below
    },
    product: {
      title: "Product & Activity Registry",
      endpoint: "/product_details",
      fields: [] // Special handling below
    },
    plan: {
      title: "Custom Travel Plan",
      endpoint: "/travel_plans",
      fields: [
        { name: "plan_name", label: "Plan Name", type: "text", placeholder: "Summer Safari 2026", required: true },
        { name: "plan_type", label: "Travel Strategy", type: "select", options: ["solo", "family", "business"] },
        { name: "duration", label: "Duration (Days)", type: "number", min: 1, value: 1 },
        { name: "notes", label: "Special Notes", type: "textarea", placeholder: "Any specific requirements?" },
      ]
    },
    style: {
      title: "Personalize Your Style",
      endpoint: "/travel_styles",
      fields: [
        { name: "style_preference", label: "Preferred Atmosphere", type: "select", options: ["luxury", "budget", "eco", "adventure"] },
        { name: "dining", label: "Dining Preference", type: "text", placeholder: "e.g. Local Cuisine, Fine Dining" },
        { name: "transport", label: "Transport Mode", type: "text", placeholder: "e.g. Private Jet, 4x4, Train" },
      ]
    },
  };

  const openService = (type) => {
    const service = { type, ...serviceConfig[type] };
    setCurrentService(service);
    setFormData({});
    setMessage({ type: '', text: '' });
    setSelectedHotel(null);

    if (type === 'hotel') {
      generateFakeHotels();
    } else if (type === 'product') {
      generateFakeProducts();
    }

    setView('form');
  };

  const generateFakeHotels = () => {
    const fakeHotels = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: `Soko Resort ${i + 1}`,
      price: 7500 + (i * 120),
      image: `https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80`
    }));
    setHotels(fakeHotels);
  };

  const generateFakeProducts = () => {
    const fakeProducts = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: i % 2 === 0 ? "Hiking Kit Pro" : "Mountain Bike Explorer",
      cost: 2800 + (i * 450),
      image: i % 2 === 0 
        ? "https://images.unsplash.com/photo-1520639889410-d65c36fbe9a3?w=400" 
        : "https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad28?w=400"
    }));
    setProducts(fakeProducts);
  };

  const selectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setFormData({ ...formData, hotel_name: hotel.name, total_price: hotel.price });
  };

  const resetView = () => {
    setView('selection');
    setCurrentService(null);
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentService) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${API_BASE}${currentService.endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Successfully saved to database!' });
        setTimeout(resetView, 1800);
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to save' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Connection error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="hero-container">
      <Navbar />
      <div className="vignette"></div>

      <main className="glass-card services-card">
        {/* Selection View */}
        {view === 'selection' && (
          <div id="selection-view">
            <h1 className="title">Our Services</h1>
            <p className="subtitle">Select a service to manage your next adventure.</p>

            <div className="services-grid">
              {Object.keys(serviceConfig).map((key) => (
                <div key={key} className="service-card" onClick={() => openService(key)}>
                  <div className="icon">
                    {key === 'trip' && '✈️'}
                    {key === 'car' && '🚗'}
                    {key === 'hotel' && '🏨'}
                    {key === 'product' && '⛺'}
                    {key === 'plan' && '🗺️'}
                    {key === 'style' && '✨'}
                  </div>
                  <h3>{serviceConfig[key].title}</h3>
                  <p>Click to manage</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form View */}
        {view === 'form' && currentService && (
          <div id="form-view">
            <div className="form-header">
              <h2 className="title">{currentService.title}</h2>
              <button className="back-btn" onClick={resetView}>← Back</button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Hotel Special View */}
              {currentService.type === 'hotel' && (
                <div className="hotel-section">
                  <label className="section-label">Available Hotels</label>
                  <div className="hotel-selection-grid">
                    {hotels.map(hotel => (
                      <div 
                        key={hotel.id}
                        className={`hotel-option-card ${selectedHotel?.id === hotel.id ? 'active-hotel' : ''}`}
                        onClick={() => selectHotel(hotel)}
                      >
                        <div className="hotel-image-wrapper">
                          <img src={hotel.image} alt={hotel.name} />
                        </div>
                        <div className="hotel-info">
                          <span className="hotel-name">{hotel.name}</span>
                          <small className="hotel-price">Ksh {hotel.price.toLocaleString()}/night</small>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedHotel && (
                    <div className="form-details-section">
                      <div className="input-group">
                        <label>Explorer Name</label>
                        <input type="text" name="username" onChange={handleChange} required />
                      </div>
                      <div className="input-row">
                        <div className="input-group">
                          <label>Room Type</label>
                          <select name="room_type" onChange={handleChange}>
                            <option value="single">Single Room</option>
                            <option value="double">Double Room</option>
                            <option value="suite">Luxury Suite</option>
                          </select>
                        </div>
                        <div className="input-group">
                          <label>Total Price (Ksh)</label>
                          <input type="number" name="total_price" value={selectedHotel.price} readOnly />
                        </div>
                      </div>
                      <div className="input-group">
                        <label>Stay Dates</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <input type="date" name="check_in" onChange={handleChange} required style={{ flex: 1 }} />
                          <input type="date" name="check_out" onChange={handleChange} required style={{ flex: 1 }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Product Special View */}
              {currentService.type === 'product' && (
                <div>
                  <label className="section-label">Available Gear & Activities</label>
                  <div className="hotel-selection-grid">
                    {products.map(product => (
                      <div key={product.id} className="hotel-option-card">
                        <div className="hotel-image-wrapper">
                          <img src={product.image} alt={product.name} />
                        </div>
                        <div className="hotel-info">
                          <span className="hotel-name">{product.name}</span>
                          <small className="hotel-price">Ksh {product.cost.toLocaleString()}</small>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="form-details-section">
                    <h3 style={{ color: '#FFD700', margin: '20px 0 15px' }}>Add New Item</h3>
                    <div className="input-group">
                      <label>Product Name</label>
                      <input type="text" name="product_name" onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                      <label>Cost (Ksh)</label>
                      <input type="number" name="product_cost" onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                      <label>Description</label>
                      <input type="text" name="product_description" onChange={handleChange} />
                    </div>
                  </div>
                </div>
              )}

              {/* Regular Fields */}
              {currentService.fields && currentService.fields.map((field, index) => (
                <div className="input-group" key={index}>
                  <label>{field.label}</label>
                  {field.type === 'select' ? (
                    <select name={field.name} onChange={handleChange} required>
                      {field.options.map(opt => (
                        <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea name={field.name} placeholder={field.placeholder} onChange={handleChange} />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      min={field.min}
                      defaultValue={field.value}
                      onChange={handleChange}
                      required={field.required}
                    />
                  )}
                </div>
              ))}

              {message.text && <p className={`message ${message.type}`}>{message.text}</p>}

              <button type="submit" className="confirm-btn" disabled={loading || (currentService.type === 'hotel' && !selectedHotel)}>
                {loading ? "SAVING TO DATABASE..." : "CONFIRM & SAVE"}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Services;