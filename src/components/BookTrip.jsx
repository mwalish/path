import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookTrip = () => {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 6;
  const navigate = useNavigate();
  const image_url = "http://lexluther.alwaysdata.net/static/images/";
  
  const bg_image = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

  const fetchProducts = async () => {
    setLoading("Loading amazing destinations...");
    try {
      const response = await axios.get("https://lexluther.alwaysdata.net/api/getproductsdetails");
      setAllProducts(response.data);
      setLoading("");
    } catch (err) {
      setLoading("");
      setError("Failed to load trips.");
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const filteredTrips = allProducts.filter((item) => {
    const name = item.product_name ? item.product_name.toLowerCase() : "";
    const isTrip = name.includes("trip"); 
    const matchesSearch = name.includes(searchTerm.toLowerCase());
    return isTrip && matchesSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTrips = filteredTrips.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTrips.length / itemsPerPage);

  return (
    <div id="trip-view" style={{ 
      minHeight: '100vh', 
      padding: '40px 20px',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(${bg_image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      
      {/* Header Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        maxWidth: '1200px', 
        margin: '0 auto 30px' 
      }}>
        <h2 style={{ 
            fontSize: '2.8rem', 
            color: '#fff', 
            fontWeight: '800', 
            textShadow: '3px 3px 6px rgba(0,0,0,0.6)',
            margin: 0 
        }}>
            Explore Trips
        </h2>
        <button 
            onClick={() => navigate(-1)} 
            style={{ 
                padding: '12px 28px', 
                borderRadius: '50px', 
                border: 'none', 
                background: '#f39c12', 
                color: '#fff',
                cursor: 'pointer', 
                fontWeight: 'bold', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.background = '#e67e22';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = '#f39c12';
            }}
        >
            ← BACK
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ maxWidth: '700px', margin: '0 auto 60px' }}>
        <input 
          type="text" 
          placeholder="Where do you want to go?" 
          style={{ 
            width: '100%', 
            padding: '20px 35px', 
            borderRadius: '50px', 
            border: '2px solid rgba(255,255,255,0.2)', 
            fontSize: '1.2rem',
            background: 'rgba(255, 255, 255, 0.95)', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
            color: '#333',
            outline: 'none'
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {loading && (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <p style={{ color: '#f39c12', fontSize: '1.5rem', fontWeight: 'bold', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                {loading}
            </p>
        </div>
      )}
      
      {/* Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
        gap: '40px',
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        {currentTrips.map((trip) => (
          <div 
            key={trip.id}
            onClick={() => navigate("/trip-details", { state: { trip } })}
            style={{
              background: '#fff',
              borderRadius: '20px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '380px' // Reduced min-height since footer is gone
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
            }}
          >
            <div style={{ height: '240px', width: '100%', overflow: 'hidden' }}>
              <img 
                src={image_url + trip.product_photo} 
                alt={trip.product_name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/500x300?text=Trip+Image'; }}
              />
            </div>
            
            <div style={{ padding: '25px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 10px 0', color: '#2c3e50' }}>{trip.product_name}</h3>
              <p style={{ color: '#7f8c8d', lineHeight: '1.6', fontSize: '1rem', flexGrow: 1, margin: 0 }}>
                {trip.product_description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredTrips.length > itemsPerPage && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginTop: '70px', 
          gap: '15px',
          paddingBottom: '60px'
        }}>
          <button 
            disabled={currentPage === 1}
            onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo(0,0); }}
            style={{ 
                padding: '12px 25px', 
                borderRadius: '12px', 
                border: 'none', 
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer', 
                background: '#fff',
                color: '#333',
                fontWeight: 'bold',
                opacity: currentPage === 1 ? 0.5 : 1,
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentPage(i + 1); window.scrollTo(0,0); }}
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                border: 'none',
                background: currentPage === i + 1 ? '#f39c12' : 'rgba(255,255,255,0.9)',
                color: currentPage === i + 1 ? '#fff' : '#333',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                transition: 'all 0.2s'
              }}
            >
              {i + 1}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages}
            onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo(0,0); }}
            style={{ 
                padding: '12px 25px', 
                borderRadius: '12px', 
                border: 'none', 
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', 
                background: '#fff',
                color: '#333',
                fontWeight: 'bold',
                opacity: currentPage === totalPages ? 0.5 : 1,
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BookTrip;