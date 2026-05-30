import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await axios.post(
        "https://lexluther.alwaysdata.net/api/signin",
        formData
      );

      if (response.data.user || response.data.success) {
        setSuccess(response.data.message || "Sign in successful!");

        localStorage.setItem("user", JSON.stringify(response.data.user));

        setTimeout(() => {
          navigate("/");
        }, 1800);
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Sign in failed";
      setError(msg);
    } finally {
      setLoading(false);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="signin-container">
      <div className="glass-card signin-card">
        <div className="signin-header">
          <div className="nav-logo">PATHFINDER</div>
          <h1>Welcome Back</h1>
          <p>Continue your journey</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="confirm-btn"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="signin-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="gold-link">Create one</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;