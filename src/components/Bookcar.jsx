// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const BookCar = () => {
//   const [loading, setLoading] = useState("");
//   const [allProducts, setAllProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");

//   const itemsPerPage = 6;
//   const navigate = useNavigate();
//   const image_url = "http://lexluther.alwaysdata.net/static/images/";
  
//   // High-quality automotive/road background
//   const bg_image = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

//   const fetchProducts = async () => {
//     setLoading("Locating available vehicles...");
//     try {
//       const response = await axios.get("https://lexluther.alwaysdata.net/api/getproductsdetails");
//       setAllProducts(response.data || []);
//       setLoading("");
//     } catch (err) {
//       setLoading("");
//       console.error("Error fetching cars:", err);
//     }
//   };

//   useEffect(() => { fetchProducts(); }, []);

//   // --- FILTER LOGIC: Filter by "Model" in the product name ---
//   const filteredCars = allProducts.filter((item) => {
//     const name = item.product_name ? item.product_name.toLowerCase() : "";
    
//     // Logic: Look for "model" or "car" to identify vehicle listings
//     const isVehicle = name.includes("model") || name.includes("car");
//     const matchesSearch = name.includes(searchTerm.toLowerCase());
    
//     return isVehicle && matchesSearch;
//   });

//   // Pagination Calculations
//   const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentCars = filteredCars.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <div id="car-view" style={{ 
//       minHeight: '100vh', 
//       padding: '40px 20px',
//       backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bg_image})`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       backgroundAttachment: 'fixed'
//     }}>
      
//       {/* Header Section */}
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'space-between', 
//         alignItems: 'center', 
//         maxWidth: '1200px', 
//         margin: '0 auto 30px' 
//       }}>
//         <h2 style={{ fontSize: '2.5rem', color: '#fff', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
//             Rent a Car
//         </h2>
//         <button 
//             onClick={() => navigate(-1)} 
//             style={{ 
//                 padding: '10px 25px', 
//                 borderRadius: '30px', 
//                 border: 'none', 
//                 background: '#f39c12', 
//                 color: '#fff',
//                 cursor: 'pointer', 
//                 fontWeight: 'bold', 
//                 boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
//             }}
//         >
//             ← BACK
//         </button>
//       </div>

//       {/* Search Bar - Gold Theme */}
//       <div style={{ maxWidth: '800px', margin: '0 auto 50px' }}>
//         <input 
//           type="text" 
//           placeholder="Search car model (e.g. SUV, Luxury, Tesla)..." 
//           style={{ 
//             width: '100%', 
//             padding: '18px 30px', 
//             borderRadius: '50px', 
//             border: 'none', 
//             fontSize: '1.1rem',
//             background: 'rgba(243, 219, 6, 0.95)', 
//             boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
//             color: '#000',
//             fontWeight: '600',
//             outline: 'none'
//           }}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//         />
//       </div>

//       {loading && (
//         <p style={{ textAlign: 'center', color: '#f39c12', fontSize: '1.2rem', fontWeight: 'bold' }}>
//           {loading}
//         </p>
//       )}

//       {/* Car Cards Grid */}
//       <div style={{ 
//         display: 'grid', 
//         gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
//         gap: '35px',
//         maxWidth: '1200px', 
//         margin: '0 auto' 
//       }}>
//         {currentCars.length > 0 ? (
//           currentCars.map((car) => (
//             <div 
//               key={car.id}
//               onClick={() => navigate("/car-details", { state: { car } })}
//               style={{
//                 background: 'rgba(255, 255, 255, 0.98)',
//                 borderRadius: '24px',
//                 overflow: 'hidden',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s ease',
//                 boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 minHeight: '400px' 
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
//               onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//             >
//               <div style={{ height: '240px', width: '100%', overflow: 'hidden' }}>
//                 <img 
//                   src={image_url + car.product_photo} 
//                   alt={car.product_name}
//                   style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                   onError={(e) => { e.target.src = 'https://via.placeholder.com/500x300?text=Vehicle+Model'; }}
//                 />
//               </div>
              
//               <div style={{ padding: '25px', flexGrow: 1 }}>
//                 <h3 style={{ fontSize: '1.6rem', margin: '0 0 12px 0', color: '#111' }}>
//                     {car.product_name}
//                 </h3>
//                 <p style={{ color: '#444', lineHeight: '1.6', fontSize: '1rem' }}>
//                   {car.product_description}
//                 </p>
//                 <div style={{ marginTop: '15px', color: '#f39c12', fontWeight: 'bold' }}>
//                     Available Now
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           !loading && (
//             <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#fff' }}>
//               <h3>No vehicle models found matching your search.</h3>
//             </div>
//           )
//         )}
//       </div>

//       {/* --- CIRCULAR GOLD PAGINATION --- */}
//       {totalPages > 1 && (
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center',
//           marginTop: '60px', 
//           gap: '12px',
//           paddingBottom: '50px'
//         }}>
//           <button 
//             disabled={currentPage === 1}
//             onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo(0, 0); }}
//             style={{ 
//                 padding: '12px 20px', borderRadius: '12px', border: 'none', 
//                 background: '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', 
//                 fontWeight: 'bold', opacity: currentPage === 1 ? 0.5 : 1,
//                 boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
//             }}
//           >
//             Prev
//           </button>

//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
//             <button
//               key={pageNum}
//               onClick={() => { setCurrentPage(pageNum); window.scrollTo(0, 0); }}
//               style={{
//                 width: '48px', height: '48px', borderRadius: '50%', border: 'none',
//                 background: currentPage === pageNum ? '#f39c12' : '#fff',
//                 color: currentPage === pageNum ? '#fff' : '#333',
//                 cursor: 'pointer', fontWeight: 'bold',
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
//                 transition: 'all 0.3s ease'
//               }}
//             >
//               {pageNum}
//             </button>
//           ))}

//           <button 
//             disabled={currentPage === totalPages}
//             onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo(0, 0); }}
//             style={{ 
//                 padding: '12px 20px', borderRadius: '12px', border: 'none', 
//                 background: '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', 
//                 fontWeight: 'bold', opacity: currentPage === totalPages ? 0.5 : 1,
//                 boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
//             }}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookCar;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookCar = () => {
  const [loading, setLoading] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 6;
  const navigate = useNavigate();
  const image_url = "http://lexluther.alwaysdata.net/static/images/";
  
  // Cinematic "Open Road" background for Pathfinder
  const bg_image = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

  const fetchProducts = async () => {
    setLoading("Locating available vehicles...");
    try {
      const response = await axios.get("https://lexluther.alwaysdata.net/api/getproductsdetails");
      setAllProducts(response.data || []);
      setLoading("");
    } catch (err) {
      setLoading("");
      console.error("Error fetching cars:", err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const filteredCars = allProducts.filter((item) => {
    const name = item.product_name ? item.product_name.toLowerCase() : "";
    const isVehicle = name.includes("model") || name.includes("car");
    const matchesSearch = name.includes(searchTerm.toLowerCase());
    return isVehicle && matchesSearch;
  });

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div id="car-view" style={{ 
      minHeight: '100vh', 
      padding: '40px 20px',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(${bg_image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      fontFamily: "'Segoe UI', Roboto, sans-serif"
    }}>
      
      {/* Header Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        maxWidth: '1200px', 
        margin: '0 auto 40px' 
      }}>
        <h2 style={{ 
            fontSize: '2.8rem', 
            color: '#fff', 
            fontWeight: '800', 
            textShadow: '3px 3px 6px rgba(0,0,0,0.6)',
            margin: 0
        }}>
            Rent a Car
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
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            ← BACK
        </button>
      </div>

      {/* Search Bar - Glassmorphism Style */}
      <div style={{ maxWidth: '700px', margin: '0 auto 60px' }}>
        <input 
          type="text" 
          placeholder="Search car model (e.g. SUV, Luxury, Tesla)..." 
          style={{ 
            width: '100%', 
            padding: '20px 35px', 
            borderRadius: '50px', 
            border: '2px solid rgba(255,255,255,0.2)', 
            fontSize: '1.2rem',
            background: 'rgba(255, 255, 255, 0.95)', 
            boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
            color: '#222',
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
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <p style={{ color: '#f39c12', fontSize: '1.5rem', fontWeight: 'bold', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                {loading}
            </p>
        </div>
      )}

      {/* Car Cards Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
        gap: '40px',
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        {currentCars.length > 0 ? (
          currentCars.map((car) => (
            <div 
              key={car.id}
              onClick={() => navigate("/car-details", { state: { car } })}
              style={{
                background: '#fff',
                borderRadius: '24px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '420px' 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
              }}
            >
              <div style={{ height: '260px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={image_url + car.product_photo} 
                  alt={car.product_name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/500x300?text=Vehicle'; }}
                />
              </div>
              
              <div style={{ padding: '30px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.7rem', margin: '0 0 10px 0', color: '#1a1a1a', fontWeight: '700' }}>
                    {car.product_name}
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6', fontSize: '1.05rem', flexGrow: 1, margin: 0 }}>
                  {car.product_description?.substring(0, 100)}...
                </p>
                <div style={{ 
                    marginTop: '20px', 
                    color: '#f39c12', 
                    fontWeight: 'bold', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between'
                }}>
                    <span>RENTAL DETAILS</span>
                    <span style={{ fontSize: '1.3rem' }}>→</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#fff' }}>
              <h3 style={{ fontSize: '1.5rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                No vehicles found matching your criteria.
              </h3>
            </div>
          )
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
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
            onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo(0, 0); }}
            style={{ 
                padding: '12px 25px', borderRadius: '15px', border: 'none', 
                background: 'rgba(255,255,255,0.9)', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', 
                fontWeight: 'bold', opacity: currentPage === 1 ? 0.5 : 1,
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => { setCurrentPage(pageNum); window.scrollTo(0, 0); }}
              style={{
                width: '50px', height: '50px', borderRadius: '50%', border: 'none',
                background: currentPage === pageNum ? '#f39c12' : 'rgba(255,255,255,0.9)',
                color: currentPage === pageNum ? '#fff' : '#333',
                cursor: 'pointer', fontWeight: 'bold',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              {pageNum}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages}
            onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo(0, 0); }}
            style={{ 
                padding: '12px 25px', borderRadius: '15px', border: 'none', 
                background: 'rgba(255,255,255,0.9)', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', 
                fontWeight: 'bold', opacity: currentPage === totalPages ? 0.5 : 1,
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

export default BookCar;