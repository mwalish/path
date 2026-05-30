import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TourActivity = () => {
  const [loading, setLoading] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 6;
  const navigate = useNavigate();
  const image_url = "http://lexluther.alwaysdata.net/static/images/";
  const bg_image = "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

  const fetchProducts = async () => {
    setLoading("Finding exciting activities...");
    try {
      const response = await axios.get("https://lexluther.alwaysdata.net/api/getproductsdetails");
      setAllProducts(response.data || []);
      setLoading("");
    } catch (err) {
      setLoading("");
      console.error("Error fetching activities:", err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // --- FILTER LOGIC: Strict filter by "activity" in product name ---
  const filteredActivities = allProducts.filter((item) => {
    const name = item.product_name ? item.product_name.toLowerCase() : "";
    
    // Logic: Item MUST contain the word "activity"
    const isActivity = name.includes("activity");
    const matchesSearch = name.includes(searchTerm.toLowerCase());
    
    return isActivity && matchesSearch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredActivities.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div id="activity-view" style={{ 
      minHeight: '100vh', 
      padding: '40px 20px',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg_image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto 30px' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#fff', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Activities
        </h2>
        <button 
            onClick={() => navigate(-1)} 
            style={{ padding: '10px 25px', borderRadius: '30px', border: 'none', background: '#f39c12', color: '#fff', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}
        >
            ← BACK
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ maxWidth: '800px', margin: '0 auto 50px' }}>
        <input 
          type="text" 
          placeholder="Search activity name..." 
          style={{ 
            width: '100%', padding: '18px 30px', borderRadius: '50px', border: 'none', fontSize: '1.1rem',
            background: 'rgba(243, 219, 6, 0.95)', boxShadow: '0 8px 25px rgba(0,0,0,0.3)', color: '#000', fontWeight: '600', outline: 'none'
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {loading && <p style={{ textAlign: 'center', color: '#f39c12', fontWeight: 'bold' }}>{loading}</p>}

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '35px', maxWidth: '1200px', margin: '0 auto' }}>
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => navigate("/activity-details", { state: { item } })}
              style={{
                background: 'rgba(255, 255, 255, 0.98)', borderRadius: '24px', overflow: 'hidden', cursor: 'pointer',
                transition: 'all 0.3s ease', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', minHeight: '400px' 
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ height: '240px', width: '100%', overflow: 'hidden' }}>
                <img 
                  src={image_url + item.product_photo} 
                  alt={item.product_name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/500x300?text=Activity'; }}
                />
              </div>
              <div style={{ padding: '25px', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.6rem', margin: '0 0 12px 0', color: '#111' }}>{item.product_name}</h3>
                <p style={{ color: '#444', lineHeight: '1.6' }}>{item.product_description}</p>
              </div>
            </div>
          ))
        ) : (
          !loading && <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#fff' }}><h3>No items found with "Activity" in the name.</h3></div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '60px', gap: '12px', paddingBottom: '50px' }}>
          <button 
            disabled={currentPage === 1}
            onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo(0, 0); }}
            style={{ padding: '12px 20px', borderRadius: '12px', border: 'none', background: '#fff', fontWeight: 'bold', cursor: 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => { setCurrentPage(num); window.scrollTo(0, 0); }}
              style={{
                width: '48px', height: '48px', borderRadius: '50%', border: 'none',
                background: currentPage === num ? '#f39c12' : '#fff', color: currentPage === num ? '#fff' : '#333',
                cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              {num}
            </button>
          ))}
          <button 
            disabled={currentPage === totalPages}
            onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo(0, 0); }}
            style={{ padding: '12px 20px', borderRadius: '12px', border: 'none', background: '#fff', fontWeight: 'bold', cursor: 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TourActivity;