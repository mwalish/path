// import React, { useState } from 'react';
// import Navbar from './Navbar';
// import './Home.css';

// const API_BASE = 'https://lexluther.alwaysdata.net';

// const Home = () => {
//   const [currentService, setCurrentService] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });

//   const services = [
//     {
//       key: 'trip',
//       title: 'Book Trip',
//       desc: 'Plan your next destination',
//       icon: '✈️',
//     },
//     {
//       key: 'car',
//       title: 'Rent Car',
//       desc: 'Luxury & off-road vehicles',
//       icon: '🚗',
//     },
//     {
//       key: 'style',
//       title: 'Travel Style',
//       desc: 'Personalize your experience',
//       icon: '✨',
//     },
//     {
//       key: 'plan',
//       title: 'Travel Plan',
//       desc: 'Create a custom itinerary',
//       icon: '🗺️',
//     },
//     {
//       key: 'hotel',
//       title: 'Book Hotel',
//       desc: 'Luxury accommodations',
//       icon: '🏨',
//     },
//     {
//       key: 'product',
//       title: 'Product enquiry',
//       desc: 'Manage inventory details',
//       icon: '📦',
//     },
//   ];

//   const openService = (service) => {
//     setCurrentService(service);
//     setFormData({});
//     setMessage({ type: '', text: '' });
//   };

//   // FIXED: Converts number inputs to actual numbers
//   const handleChange = (e) => {
//     const { name, value, type } = e.target;

//     setFormData({
//       ...formData,
//       [name]: type === 'number' ? Number(value) : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!currentService) return;

//     setLoading(true);
//     setMessage({ type: '', text: '' });

//     try {
//       let endpoint = currentService.key;

//       if (currentService.key === 'trip') {
//         endpoint = 'book_trip';
//       } else if (currentService.key === 'car') {
//         endpoint = 'book_car';
//       } else if (currentService.key === 'hotel') {
//         endpoint = 'book_hotel';
//       }
// const url = `${API_BASE}/api/${endpoint}`;

// console.log('POST URL:', url);
// console.log('FORM DATA:', formData);

// const data = new FormData();

// Object.keys(formData).forEach((key) => {
//   data.append(key, formData[key]);
// });

// const response = await fetch(url, {
//   method: 'POST',
//   body: data,
// });

// console.log('STATUS:', response.status);

// const text = await response.text();

// console.log('RAW RESPONSE:', text);

// let result;

// try {
//   result = JSON.parse(text);
// } catch {
//   result = { message: text };
// }

// console.log('PARSED RESPONSE:', result);

//       if (response.ok) {
//         setMessage({
//           type: 'success',
//           text: '✅ Successfully saved!',
//         });

//         setFormData({});

//         setTimeout(() => {
//           setMessage({ type: '', text: '' });
//         }, 2000);
//       } else {
//         setMessage({
//           type: 'error',
//           text: result.message || 'Failed to save data',
//         });
//       }
//     } catch (error) {
//       console.error('FETCH ERROR:', error);

//       setMessage({
//         type: 'error',
//         text: error.message || 'Network error. Please try again.',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==================== DYNAMIC FIELDS FOR EACH SERVICE ====================
//   const renderFields = () => {
//     switch (currentService?.key) {
//       case 'trip':
//         return (
//           <>
//             <div className="input-group">
//               <label>Explorer Name</label>
//               <input
//                 type="text"
//                 name="username"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="email@gmail.com"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <label>Destination</label>
//               <input
//                 type="text"
//                 name="place_to_visit"
//                 placeholder="e.g. Maasai Mara"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <label>Departure Date</label>
//               <input
//                 type="date"
//                 name="departure_date"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <label>Number of People</label>
//               <input
//                 type="number"
//                 name="number_of_people"
//                 min="1"
//                 onChange={handleChange}
//               />
//             </div>
//           </>
//         );

//       case 'car':
//         return (
//           <>
//             <div className="input-group">
//               <label>Explorer Name</label>
//               <input
//                 type="text"
//                 name="username"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <label>Car Model</label>
//               <input
//                 type="text"
//                 name="car_model"
//                 placeholder="e.g. Toyota Land Cruiser"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="input-row">
//               <div className="input-group">
//                 <label>Pickup Date</label>
//                 <input
//                   type=""
//                   name="pickup_date"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="input-group">
//                 <label>Return Date</label>
//                 <input
//                   type=""
//                   name="return_date"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="input-group">
//                 <label>Total Cost</label>
//                 <input
//                   type="number"
//                   name="total_cost"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>
//           </>
//         );

//       case 'hotel':
//         return (
//           <>
//             <div className="input-group">
//               <label>Explorer Name</label>
//               <input
//                 type="text"
//                 name="username"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <label>Hotel Name</label>
//               <input
//                 type="text"
//                 name="hotel_name"
//                 placeholder="e.g. Resort"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="input-row">
//               <div className="input-group">
//                 <label>Check In</label>
//                 <input
//                   type=""
//                   name="check_in"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="input-group">
//                 <label>Check Out</label>
//                 <input
//                   type=""
//                   name="check_out"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="input-group">
//               <label>Room Type</label>
//               <select name="room_type" onChange={handleChange}>
//                 <option value="single">Single Room</option>
//                 <option value="double">Double Room</option>
//                 <option value="suite">Luxury Suite</option>
//               </select>
//             </div>

//             <div className="input-group">
//               <label>Hotel Cost</label>
//               <input
//                 type="number"
//                 name="total_price"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </>
//         );

//       case 'product':
//         return (
//           <>
//             <div className="input-group">
//               <label>Product Name</label>
//               <input
//                 type="text"
//                 name="product_name"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <label>Cost (Ksh)</label>
//               <input
//                 type="number"
//                 name="product_cost"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <label>Description</label>
//               <textarea
//                 name="product_description"
//                 placeholder="Product details..."
//                 onChange={handleChange}
//                 rows="3"
//               ></textarea>
//             </div>
//           </>
//         );

//       case 'plan':
//         return (
//           <>
//             <div className="input-group">
//               <label>Explorer Name</label>
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Submit your name"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <label>Place</label>
//               <input
//                 type="text"
//                 name="place"
//                 placeholder="e.g. Kenya Safari 2026"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <label>Travel Type</label>
//               <select name="plan_type" onChange={handleChange}>
//                 <option value="solo">Solo Adventure</option>
//                 <option value="family">Family Vacation</option>
//                 <option value="couple">Couple Getaway</option>
//                 <option value="group">Group Trip</option>
//               </select>
//             </div>

//             <div className="input-group">
//               <label>Duration</label>
//               <input
//                 type="number"
//                 name="selected_days"
//                 min="1"
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="input-group">
//               <label>Special Notes</label>
//               <textarea
//                 name="notes"
//                 placeholder="Any special requirements?"
//                 onChange={handleChange}
//                 rows="3"
//               ></textarea>
//             </div>
//           </>
//         );

//       case 'style':
//         return (
//           <>
//             <div className="input-group">
//               <label>Preferred Atmosphere</label>
//               <select name="style_preference" onChange={handleChange}>
//                 <option value="luxury">Luxury & Comfort</option>
//                 <option value="adventure">Adventure & Sport</option>
//                 <option value="budget">Budget / Backpacker</option>
//                 <option value="eco">Eco-Friendly</option>
//               </select>
//             </div>

//             <div className="input-group">
//               <label>Dining Preference</label>
//               <input
//                 type="text"
//                 name="dining"
//                 placeholder="e.g. Local cuisine, Fine dining"
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="input-group">
//               <label>Transport Mode</label>
//               <input
//                 type="text"
//                 name="transport"
//                 placeholder="e.g. 4x4, Private Jet, Train"
//                 onChange={handleChange}
//               />
//             </div>
//           </>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="hero-container">
//       <Navbar />
//       <div className="vignette"></div>

//       <main className="glass-card services-card">
//         {!currentService ? (
//           <>
//             <h1 className="title">Our Services</h1>

//             <p className="subtitle">
//               Select a service to manage your next adventure.
//             </p>

//             <div className="services-grid">
//               {services.map((service) => (
//                 <div
//                   key={service.key}
//                   className="service-card"
//                   onClick={() => openService(service)}
//                 >
//                   <div className="service-icon">{service.icon}</div>

//                   <h3>{service.title}</h3>

//                   <p>{service.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="form-header">
//               <h2 className="title">{currentService.title}</h2>

//               <button
//                 className="back-btn"
//                 onClick={() => setCurrentService(null)}
//               >
//                 ← Back
//               </button>
//             </div>

//             <form onSubmit={handleSubmit}>
//               {renderFields()}

//               {message.text && (
//                 <p className={`message ${message.type}`}>
//                   {message.text}
//                 </p>
//               )}

//               <button
//                 type="submit"
//                 className="confirm-btn"
//                 disabled={loading}
//               >
//                 {loading
//                   ? 'SAVING TO DATABASE...'
//                   : 'CONFIRM & SAVE'}
//               </button>
//             </form>
//           </>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Home;

import React, { useState } from 'react';
import Navbar from './Navbar';
import './Home.css';

const API_BASE = 'https://lexluther.alwaysdata.net';

const Home = () => {
  const [currentService, setCurrentService] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const services = [
    {
      key: 'trip',
      title: 'Book Trip',
      desc: 'Plan your next destination',
      icon: '✈️',
    },
    {
      key: 'car',
      title: 'Rent Car',
      desc: 'Luxury & off-road vehicles',
      icon: '🚗',
    },
    {
      key: 'style',
      title: 'Travel Style',
      desc: 'Personalize your experience',
      icon: '✨',
    },
    {
      key: 'plan',
      title: 'Travel Plan',
      desc: 'Create a custom itinerary',
      icon: '🗺️',
    },
    {
      key: 'hotel',
      title: 'Book Hotel',
      desc: 'Luxury accommodations',
      icon: '🏨',
    },
    {
      key: 'product',
      title: 'Product enquiry',
      desc: 'Manage inventory details',
      icon: '📦',
    },
  ];

  const openService = (service) => {
    setCurrentService(service);
    setFormData({});
    setMessage({ type: '', text: '' });
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentService) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      let endpoint = '';

      // Map frontend services to correct backend endpoints
      switch (currentService.key) {
        case 'trip':
          endpoint = 'book_trip';
          break;
        case 'car':
          endpoint = 'book_car';
          break;
        case 'hotel':
          endpoint = 'book_hotel';
          break;
        case 'style':
          endpoint = 'add_style';
          break;
        case 'plan':
          endpoint = 'add_plan';        // No /api/ prefix
          break;
        case 'product':
          endpoint = 'addproducts';
          break;
        default:
          endpoint = currentService.key;
      }

      // Handle special case for add_plan (no /api/)
      const url = currentService.key === 'plan'
        ? `${API_BASE}/${endpoint}`
        : `${API_BASE}/api/${endpoint}`;

      console.log('POST URL:', url);
      console.log('FORM DATA:', formData);

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const response = await fetch(url, {
        method: 'POST',
        body: data,
      });

      console.log('STATUS:', response.status);

      const text = await response.text();
      console.log('RAW RESPONSE:', text);

      let result;
      try {
        result = JSON.parse(text);
      } catch {
        result = { message: text };
      }

      console.log('PARSED RESPONSE:', result);

      if (response.ok) {
        setMessage({
          type: 'success',
          text: '✅ Successfully saved!',
        });

        setFormData({});

        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 2000);
      } else {
        setMessage({
          type: 'error',
          text: result.message || 'Failed to save data',
        });
      }
    } catch (error) {
      console.error('FETCH ERROR:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Network error. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  // ==================== DYNAMIC FIELDS ====================
  const renderFields = () => {
    switch (currentService?.key) {
      case 'trip':
        return (
          <>
            <div className="input-group">
              <label>Explorer Name</label>
              <input type="text" name="username" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="email@gmail.com" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Destination</label>
              <input type="text" name="place_to_visit" placeholder="e.g. Maasai Mara" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Departure Date</label>
              <input type="date" name="departure_date" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Number of People</label>
              <input type="number" name="number_of_people" min="1" onChange={handleChange} required />
            </div>
          </>
        );

      case 'car':
        return (
          <>
            <div className="input-group">
              <label>Explorer Name</label>
              <input type="text" name="username" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Car Model</label>
              <input type="text" name="car_model" placeholder="e.g. Toyota Land Cruiser" onChange={handleChange} required />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Pickup Date</label>
                <input type="date" name="pick_date" onChange={handleChange} required />
              </div>

              <div className="input-group">
                <label>Return Date</label>
                <input type="date" name="return_date" onChange={handleChange} required />
              </div>

              <div className="input-group">
                <label>Total Cost (Ksh)</label>
                <input type="number" name="total_cost" onChange={handleChange} required />
              </div>
            </div>
          </>
        );

      case 'hotel':
        return (
          <>
            <div className="input-group">
              <label>Explorer Name</label>
              <input type="text" name="username" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Hotel Name</label>
              <input type="text" name="hotel_name" placeholder="e.g. Resort" onChange={handleChange} required />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Check In</label>
                <input type="date" name="check_in" onChange={handleChange} required />
              </div>

              <div className="input-group">
                <label>Check Out</label>
                <input type="date" name="check_out" onChange={handleChange} required />
              </div>
            </div>

            <div className="input-group">
              <label>Room Type</label>
              <select name="room_type" onChange={handleChange} required>
                <option value="">Select Room Type</option>
                <option value="single">Single Room</option>
                <option value="double">Double Room</option>
                <option value="suite">Luxury Suite</option>
              </select>
            </div>

            <div className="input-group">
              <label>Total Price (Ksh)</label>
              <input type="number" name="total_price" onChange={handleChange} required />
            </div>
          </>
        );

      case 'product':
        return (
          <>
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
              <textarea name="product_description" placeholder="Product details..." onChange={handleChange} rows="3"></textarea>
            </div>
          </>
        );

      case 'plan':
        return (
          <>
            <div className="input-group">
              <label>Explorer Name</label>
              <input type="text" name="username" placeholder="Your name" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Destination / Place</label>
              <input type="text" name="place" placeholder="e.g. Kenya Safari 2026" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Travel Type / Period</label>
              <select name="period_type" onChange={handleChange} required>
                <option value="">Select Type</option>
                <option value="Solo">Solo Adventure</option>
                <option value="Family">Family Vacation</option>
                <option value="Couple">Couple Getaway</option>
                <option value="Group">Group Trip</option>
              </select>
            </div>

            <div className="input-group">
              <label>Duration (Days)</label>
              <input type="number" name="selected_days" min="1" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Special Notes</label>
              <textarea name="notes" placeholder="Any special requirements?" onChange={handleChange} rows="3"></textarea>
            </div>
          </>
        );

      case 'style':
        return (
          <>
            <div className="input-group">
              <label>Explorer Name</label>
              <input type="text" name="username" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Preferred Travel Style</label>
              <select name="style_name" onChange={handleChange} required>
                <option value="">Select Style</option>
                <option value="Adventure">Adventure & Sport</option>
                <option value="Luxury">Luxury & Comfort</option>
                <option value="Budget">Budget / Backpacker</option>
                <option value="Eco">Eco-Friendly</option>
              </select>
            </div>

            <div className="input-group">
              <label>Preference Details</label>
              <textarea
                name="preference_details"
                placeholder="E.g. I love hiking, camping, cultural experiences, fine dining..."
                onChange={handleChange}
                rows="4"
                required
              ></textarea>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="hero-container">
      <Navbar />
      <div className="vignette"></div>

      <main className="glass-card services-card">
        {!currentService ? (
          <>
            <h1 className="title">Our Services</h1>
            <p className="subtitle">Select a service to manage your next adventure.</p>

            <div className="services-grid">
              {services.map((service) => (
                <div
                  key={service.key}
                  className="service-card"
                  onClick={() => openService(service)}
                >
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="form-header">
              <h2 className="title">{currentService.title}</h2>
              <button className="back-btn" onClick={() => setCurrentService(null)}>
                ← Back
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {renderFields()}

              {message.text && (
                <p className={`message ${message.type}`}>{message.text}</p>
              )}

              <button type="submit" className="confirm-btn" disabled={loading}>
                {loading ? 'SAVING TO DATABASE...' : 'CONFIRM & SAVE'}
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;