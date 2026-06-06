
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TravelStyle = () => {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 6;
  const navigate = useNavigate();
  const image_url = "http://lexluther.alwaysdata.net/static/images/";
  
  // High-quality travel background
  const bg_image = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

  const fetchProducts = async () => {
    setLoading("Curating travel styles...");
    try {
      const response = await axios.get("https://lexluther.alwaysdata.net/api/getproductsdetails");
      setAllProducts(response.data);
      setLoading("");
    } catch (err) {
      setLoading("");
      setError("Failed to load travel styles.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- FILTER LOGIC: Strict name filter for "style" ---
  const filteredStyles = allProducts.filter((item) => {
    const name = item.product_name ? item.product_name.toLowerCase() : "";
    
    // Logic: Must include 'style' in the name and match search term
    const isStyleItem = name.includes("style"); 
    const matchesSearch = name.includes(searchTerm.toLowerCase());
    
    return isStyleItem && matchesSearch;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStyles = filteredStyles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStyles.length / itemsPerPage);

  return (
    <div id="style-view" style={{ 
      minHeight: '100vh', 
      padding: '40px 20px',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bg_image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      
      {/* Header Section: Gold Back Button on the Right */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        maxWidth: '1200px', 
        margin: '0 auto 30px' 
      }}>
        <h2 style={{ fontSize: '2.5rem', color: '#fff', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Travel Styles
        </h2>
        <button 
            onClick={() => navigate(-1)} 
            style={{ 
                padding: '10px 25px', 
                borderRadius: '30px', 
                border: 'none', 
                background: '#f39c12', 
                color: '#fff',
                cursor: 'pointer', 
                fontWeight: 'bold', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            ← BACK
        </button>
      </div>

      {/* Search Bar: Gold Theme */}
      <div style={{ maxWidth: '800px', margin: '0 auto 50px' }}>
        <input 
          type="text" 
          placeholder="Search style name..." 
          style={{ 
            width: '100%', 
            padding: '18px 30px', 
            borderRadius: '50px', 
            border: 'none', 
            fontSize: '1.1rem',
            background: 'rgba(243, 219, 6, 0.95)', 
            boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
            color: '#000',
            fontWeight: '500',
            outline: 'none'
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {loading && (
        <p style={{ textAlign: 'center', color: '#f39c12', fontSize: '1.2rem', fontWeight: 'bold' }}>
          {loading}
        </p>
      )}

      {/* Travel Style Cards Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
        gap: '35px',
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        {currentStyles.length > 0 ? (
          currentStyles.map((style) => (
            <div 
              key={style.id}
              onClick={() => navigate("/style-details", { state: { style } })}
              style={{
                background: 'rgba(255, 255, 255, 0.98)',
                borderRadius: '24px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '380px' 
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ height: '260px', width: '100%', overflow: 'hidden' }}>
                <img 
                  src={image_url + style.product_photo} 
                  alt={style.product_name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/500x300?text=Travel+Style'; }}
                />
              </div>
              
              <div style={{ padding: '25px', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.6rem', margin: '0 0 12px 0', color: '#1a1a1a' }}>
                    {style.product_name}
                </h3>
                <p style={{ color: '#555', lineHeight: '1.6', fontSize: '1rem', margin: 0 }}>
                  {style.product_description}
                </p>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#fff' }}>
              <h3>No items found with "Style" in the name.</h3>
            </div>
          )
        )}
      </div>

      {/* --- CIRCULAR GOLD PAGINATION --- */}
      {filteredStyles.length > itemsPerPage && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginTop: '60px', 
          gap: '15px',
          paddingBottom: '50px'
        }}>
          <button 
            disabled={currentPage === 1}
            onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo(0, 0); }}
            style={{ 
                padding: '12px 20px', 
                borderRadius: '12px', 
                border: 'none', 
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer', 
                background: '#fff',
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                opacity: currentPage === 1 ? 0.5 : 1
            }}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentPage(i + 1); window.scrollTo(0, 0); }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: 'none',
                background: currentPage === i + 1 ? '#f39c12' : '#fff',
                color: currentPage === i + 1 ? '#fff' : '#333',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              {i + 1}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages}
            onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo(0, 0); }}
            style={{ 
                padding: '12px 20px', 
                borderRadius: '12px', 
                border: 'none', 
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', 
                background: '#fff',
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                opacity: currentPage === totalPages ? 0.5 : 1
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TravelStyle;