import React from 'react';
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import Navbar from './components/Navbar';
import TravelStyle from './components/TravelStyle';
import TravelPlan from './components/TravelPlan';
import HotelBooking from './components/HotelBooking';
import BookTrip from './components/BookTrip';
import BookCar from './components/Bookcar';
import TourActivity from './components/TourActivity';
import ChatBot from './components/ChatBot';   
import FloatingChatBot from './components/FloatingChatBot';
import Auth from './components/Auth';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/booktrip" element={<BookTrip />} />
          <Route path="/travelstyle" element={<TravelStyle />} />
          <Route path="/travelplan" element={<TravelPlan />} />
          <Route path="/hotelbooking" element={<HotelBooking />} />
          <Route path="/bookcar" element={<BookCar />} />
          <Route path="/touractivity" element={<TourActivity />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Add more routes as needed */}

        </Routes>
        <FloatingChatBot />
      </div>
    </BrowserRouter>
  )
}

export default App;