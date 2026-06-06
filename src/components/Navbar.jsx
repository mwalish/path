import React from 'react';
import './Navbar.css'; // Create this or use global styles
import './TravelStyle';
import './TravelPlan';
import './HotelBooking';
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">PATHFINDER</div>
      <div className="nav-links">
        
        {/* <a href="/signup" className='nav-auth-btn'>Sign Up</a>
        <a href="/signin" className="nav-auth-btn">Sign In</a> */}
        {/* <a href="/services" className="nav-auth-btn">Services</a> */}
        {/* <a href="/BookTrip" className="nav-auth-btn">Book Trip</a> */}
        <a href="/TravelStyle" className="nav-auth-btn">Travel Style</a>
        <a href="/booktrip" className="nav-auth-btn">Available Trips</a>
        <a href="/HotelBooking" className="nav-auth-btn">Hotel Booking</a>
        <a href="/bookcar" className="nav-auth-btn">Car Rental</a>
        <a href="/TourActivity" className="nav-auth-btn">TourActivity</a>
        {/* <a href="/TourActivity" className="nav-auth-btn">TourActivity</a> */}
        {/* <a href="/chatbot" className="nav-auth-btn">chatbot</a> */}
        <a href="/auth" className="nav-auth-btn">Log out</a>
        
      </div>
    </nav>
  );
};

export default Navbar;
