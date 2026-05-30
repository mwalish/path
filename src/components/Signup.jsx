import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';   // ← New CSS file for SignUp

const SignUp = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState({ score: 0, label: "", color: "transparent" });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;

        setFormData(prev => ({ ...prev, [name]: val }));

        if (name === "password") {
            evaluatePasswordStrength(val);
        }
    };

    const evaluatePasswordStrength = (pass) => {
        if (!pass) {
            setStrength({ score: 0, label: "", color: "transparent" });
            return;
        }

        let score = 0;
        if (pass.length >= 8) score++;
        if (/[a-zA-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;

        const levels = [
            { score: 25, label: "Weak", color: "#ff4d4d" },
            { score: 50, label: "Fair", color: "#ffa500" },
            { score: 75, label: "Good", color: "#2ecc71" },
            { score: 100, label: "Strong", color: "#1db954" }
        ];

        setStrength(levels[score - 1] || levels[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }
        if (!formData.agreeTerms) {
            setError("You must agree to the Terms & Conditions.");
            return;
        }

        setLoading(true);

        try {
            const data = new FormData();
            data.append('username', formData.username);
            data.append('email', formData.email);
            data.append('password', formData.password);
            if (formData.phone) data.append('phone', formData.phone);

            await axios.post("https://lexluther.alwaysdata.net/api/signup", data);

            setSuccess("Account created successfully! Redirecting...");
            setTimeout(() => navigate("/signin"), 1800);
        } catch (err) {
            if (err?.response?.status === 409) {
                setError("Username or email already taken.");
            } else {
                setError(err?.response?.data?.message || "Signup failed.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="vignette"></div>

            <div className="glass-card signup-card">
                <div className="auth-header">
                    <div className="nav-logo">PATHFINDER</div>
                    <h1>Join the Journey</h1>
                    <p>Create your account and start exploring</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}

                    <div className="input-group">
                        <label>USERNAME</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Choose a username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>EMAIL ADDRESS</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>PHONE NUMBER </label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone number"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>PASSWORD</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Create password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {formData.password && (
                        <div className="strength-container">
                            <div className="strength-bar">
                                <div
                                    className="strength-progress"
                                    style={{ width: `${strength.score}%`, backgroundColor: strength.color }}
                                />
                            </div>
                            <span className="strength-label" style={{ color: strength.color }}>
                                {strength.label}
                            </span>
                        </div>
                    )}

                    <div className="input-group">
                        <label>CONFIRM PASSWORD</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="terms-group">
                        <input
                            type="checkbox"
                            id="agreeTerms"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                        />
                        <label htmlFor="agreeTerms">
                            I agree to the <Link to="/terms" className="gold-link">Terms & Conditions</Link>
                        </label>
                    </div>

                    <button type="submit" className="confirm-btn" disabled={loading}>
                        {loading ? "Creating Account..." : "CREATE ACCOUNT"}
                    </button>

                    <div className="auth-footer">
                        <p>
                            Already have an account?{" "}
                            <Link to="/signin" className="gold-link">Sign In</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;