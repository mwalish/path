import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TravelPlan.css';

const TravelPlan = () => {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  const fetchPlans = async () => {
    setLoading("Creating your custom itinerary...");
    try {
      const response = await axios.get("http://mwalish.alwaysdata.net/api/gettravelplans");
      setPlans(response.data);
      setLoading("");
    } catch (err) {
      setLoading("");
      setError(err?.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div id="form-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h2 className="title" style={{ fontSize: '1.8rem', margin: 0 }}>Travel Plan</h2>
        <button className="tag" onClick={() => navigate(-1)}>← Back</button>
      </div>

      <p className='text-warning'>{loading}</p>
      <p className='text-danger'>{error}</p>

      <div className="services-grid">
        {plans.map((plan) => (
          <div className="service-card" key={plan.id}>
            <div className="icon">🗺️</div>
            <h3>{plan.plan_name}</h3>
            <p>{plan.plan_details}</p>
            <div style={{ marginTop: '10px', color: '#FFD700', fontSize: '0.8rem' }}>
              Duration: {plan.days} Days
            </div>
            <input 
              type="button" 
              className="confirm-btn" 
              value="View Details" 
              onClick={() => navigate("/plan-details", { state: { plan } })} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelPlan;