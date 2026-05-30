// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const BookHotel = () => {
//   const [loading, setLoading] = useState("");
//   const [error, setError] = useState("");
//   const [hotels, setHotels] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 9;
  
//   const navigate = useNavigate();
//   const image_url = "http://lexluther.alwaysdata.net/static/images/";

//   const fetchHotels = async () => {
//     setLoading("Loading destinations...");
//     try {
//       const response = await axios.get("https://lexluther.alwaysdata.net/api/getproductsdetails");
//       setHotels(response.data);
//       setLoading("");
//     } catch (err) {
//       setLoading("");
//       setError(err.message);
//     }
//   };

//   useEffect(() => { fetchHotels(); }, []);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = hotels.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(hotels.length / itemsPerPage);

//   // Helper for pagination buttons
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div id="form-view">
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
//         <h2 className="title" style={{ fontSize: '1.8rem', margin: 0 }}>Book Hotel</h2>
//         <button className="tag" onClick={() => navigate(-1)}>← Back</button>
//       </div>
      
//       <p className='text-warning'>{loading}</p>
//       {error && <p className='text-danger'>{error}</p>}
      
//       <div className="services-grid">
//         {currentItems.map((hotel) => (
//           <div 
//             className="service-card" 
//             key={hotel.id} 
//             onClick={() => navigate("/hotel-details", { state: { hotel } })}
//             style={{ 
//               border: '1px solid #eee', 
//               borderRadius: '12px', 
//               padding: '15px', 
//               background: '#d8d10e',
//               cursor: 'pointer'
//             }}
//           >
//             <div className="product-image-wrapper" style={{ width: '100%', height: '250px', overflow: 'hidden', borderRadius: '8px', marginBottom: '10px' }}>
//                 <img 
//                     src={image_url + hotel.product_photo} 
//                     alt="Hotel"
//                     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                     onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
//                 />
//             </div>

//             <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{hotel.product_name}</h3>
            
//             <p className="text-secondary" style={{ fontSize: '0.9rem', margin: '5px 0', color: '#555' }}>
//                 {hotel.product_description}
//             </p>
            
//             <div style={{ marginTop: '10px' }}>
//                 <span className="text-warning" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
//                     KSH {hotel.product_cost}
//                 </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Styled Pagination Section */}
//       {hotels.length > itemsPerPage && (
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           marginTop: '40px', 
//           gap: '8px',
//           paddingBottom: '20px' 
//         }}>
//           {/* Previous Arrow */}
//           <button 
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             style={{
//               padding: '8px 15px',
//               borderRadius: '8px',
//               border: '1px solid #ddd',
//               background: currentPage === 1 ? '#f9f9f9' : '#fff',
//               cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//               color: currentPage === 1 ? '#ccc' : '#333'
//             }}
//           >
//             Prev
//           </button>

//           {/* Individual Page Numbers */}
//           {pageNumbers.map(number => (
//             <button
//               key={number}
//               onClick={() => setCurrentPage(number)}
//               style={{
//                 width: '40px',
//                 height: '40px',
//                 borderRadius: '8px',
//                 border: '1px solid',
//                 borderColor: currentPage === number ? '#f39c12' : '#ddd',
//                 background: currentPage === number ? '#f39c12' : '#fff',
//                 color: currentPage === number ? '#fff' : '#333',
//                 fontWeight: 'bold',
//                 cursor: 'pointer',
//                 transition: 'all 0.2s ease'
//               }}
//             >
//               {number}
//             </button>
//           ))}

//           {/* Next Arrow */}
//           <button 
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             style={{
//               padding: '8px 15px',
//               borderRadius: '8px',
//               border: '1px solid #ddd',
//               background: currentPage === totalPages ? '#f9f9f9' : '#fff',
//               cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
//               color: currentPage === totalPages ? '#ccc' : '#333'
//             }}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookHotel;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookHotel = () => {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Adjusted items per page for larger cards
  const itemsPerPage = 6;
  const navigate = useNavigate();
  const image_url = "http://lexluther.alwaysdata.net/static/images/";

  const fetchProducts = async () => {
    setLoading("Fetching destinations...");
    try {
      const response = await axios.get("https://lexluther.alwaysdata.net/api/getproductsdetails");
      setAllProducts(response.data);
      setLoading("");
    } catch (err) {
      setLoading("");
      setError(err.message);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const filteredHotels = allProducts.filter((item) => {
    const name = item.product_name ? item.product_name.toLowerCase().trim() : "";
    const isHotelByName = name.endsWith("hotel");
    const matchesSearch = name.includes(searchTerm.toLowerCase());
    return isHotelByName && matchesSearch;
  });

  // --- PAGINATION LOGIC ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHotels.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);

  return (
    <div id="form-view" style={{ minHeight: '100vh', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', maxWidth: '1200px', margin: '0 auto 30px' }}>
        <h2 className="title" style={{ fontSize: '2rem', color: '#fff' }}>Book Hotel</h2>
        <button className="tag" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>← Back</button>
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <input 
          type="text" 
          placeholder="Search by hotel name..." 
          className="form-control"
          style={{ 
            padding: '15px 25px', 
            borderRadius: '30px', 
            border: 'none', 
            width: '100%',
            maxWidth: '600px',
            background: 'rgba(243, 219, 6, 0.9)',
            fontSize: '1rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      
      <p className='text-warning' style={{ textAlign: 'center' }}>{loading}</p>
      {error && <p className='text-danger' style={{ textAlign: 'center' }}>{error}</p>}
      
      {/* Services Grid - Increased card size via minmax */}
      <div className="services-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {currentItems.length > 0 ? (
          currentItems.map((hotel) => (
            <div 
              className="service-card" 
              key={hotel.id} 
              onClick={() => navigate("/hotel-details", { state: { hotel } })}
              style={{ 
                borderRadius: '16px', 
                padding: '20px', 
                background: 'rgba(171, 209, 17, 0.95)', 
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '400px' // Increased height
              }}
            >
              <div style={{ width: '100%', height: '220px', overflow: 'hidden', borderRadius: '12px', marginBottom: '15px' }}>
                  <img 
                    src={image_url + hotel.product_photo} 
                    alt="Hotel" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200'; }} 
                  />
              </div>

              <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#222' }}>{hotel.product_name}</h3>
              
              <p style={{ fontSize: '0.95rem', color: '#555', margin: '5px 0', flexGrow: 1 }}>
                  {hotel.product_description}
              </p>
              
              <div style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                  <span className="text-warning" style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                    KSH {hotel.product_cost}
                  </span>
              </div>
            </div>
          ))
        ) : (
          !loading && <div style={{ color: '#fff', textAlign: 'center', gridColumn: '1/-1', padding: '60px' }}>
            <h3>No hotels found matching your search.</h3>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredHotels.length > itemsPerPage && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginTop: '50px', 
          gap: '12px',
          paddingBottom: '40px'
        }}>
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                background: currentPage === i + 1 ? '#f39c12' : '#fff',
                color: currentPage === i + 1 ? '#fff' : '#333',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            >
              {i + 1}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BookHotel;