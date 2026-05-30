import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RentCar = () => {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  const image_url = "http://lexluther.alwaysdata.net/static/images/";

  const fetchCars = async () => {
    setLoading("Retrieving luxury fleet...");
    try {
      const response = await axios.get("https://lexluther.alwaysdata.net/api/getproductsdetails");
      setCars(response.data);
      setLoading("");
    } catch (err) {
      setLoading("");
      setError(err.message);
    }
  };

  useEffect(() => { fetchCars(); }, []);

  return (
    <div id="form-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
        <h2 className="title" style={{ fontSize: '1.8rem', margin: 0 }}>Rent Car</h2>
        <button className="tag" onClick={() => navigate(-1)}>← Back</button>
      </div>
      <p className='text-warning'>{loading}</p>
      <p className='text-danger'>{error}</p>
      
      <div className="hotel-selection-grid">
        {cars.map((car) => (
          <div className="hotel-option-card" key={car.id}>
            <div className="hotel-image-wrapper">
              <img src={image_url + car.car_photo} alt={car.car_name} />
            </div>
            <div className="hotel-info">
              <span className="hotel-name">{car.car_name}</span>
              <span className="hotel-price">KSH {car.price_per_day} / Day</span>
              <input type="button" className="confirm-btn" value="Rent Now" onClick={() => navigate("/booking", { state: { car } })} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentCar;