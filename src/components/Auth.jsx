// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import './Auth.css';

// const Auth = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const isSignIn = location.pathname === '/signin';

//     // Different backgrounds
//     const signInBg = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
//     const signUpBg = "https://images.unsplash.com/photo-1506929113675-b55f9d3bb76a?auto=format&fit=crop&w=1920&q=80";
//     const currentBg = isSignIn ? signInBg : signUpBg;

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");

//     // Sign In
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);

//     // Sign Up
//     const [formData, setFormData] = useState({
//         username: "", email: "", phone: "", password: "", confirmPassword: "", agreeTerms: false
//     });

//     const [strength, setStrength] = useState({ score: 0, label: "", color: "transparent" });

//     useEffect(() => {
//         resetForm();
//     }, [isSignIn]);

//     const resetForm = () => {
//         setError(""); setSuccess("");
//         setEmail(""); setPassword("");
//         setFormData({ username: "", email: "", phone: "", password: "", confirmPassword: "", agreeTerms: false });
//         setStrength({ score: 0, label: "", color: "transparent" });
//     };

//     const evaluatePasswordStrength = (pass) => {
//         if (!pass) return setStrength({ score: 0, label: "", color: "transparent" });

//         let score = 0;
//         if (pass.length >= 8) score++;
//         if (/[a-zA-Z]/.test(pass)) score++;
//         if (/[0-9]/.test(pass)) score++;
//         if (/[^A-Za-z0-9]/.test(pass)) score++;

//         const levels = [
//             { score: 25, label: "Weak", color: "#ff4d4d" },
//             { score: 50, label: "Fair", color: "#ffa500" },
//             { score: 75, label: "Good", color: "#2ecc71" },
//             { score: 100, label: "Strong", color: "#1db954" }
//         ];
//         setStrength(levels[score - 1] || levels[0]);
//     };

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         const val = type === 'checkbox' ? checked : value;

//         if (!isSignIn) {
//             setFormData(prev => ({ ...prev, [name]: val }));
//             if (name === "password") evaluatePasswordStrength(val);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(""); setSuccess("");

//         if (isSignIn) {
//             // Sign In Logic
//             setLoading(true);
//             try {
//                 const fd = new FormData();
//                 fd.append('email', email);
//                 fd.append('password', password);

//                 const res = await axios.post("https://lexluther.alwaysdata.net/api/signin", fd);
//                 if (res.data.user || res.data.success) {
//                     setSuccess("Sign in successful!");
//                     localStorage.setItem("user", JSON.stringify(res.data.user));
//                     setTimeout(() => navigate("/"), 1500);
//                 } else {
//                     setError(res.data.message || "Invalid credentials");
//                 }
//             } catch (err) {
//                 setError(err?.response?.data?.message || "Sign in failed");
//             } finally {
//                 setLoading(false);
//             }
//         } else {
//             // Sign Up Logic
//             if (formData.password !== formData.confirmPassword) return setError("Passwords do not match.");
//             if (formData.password.length < 8) return setError("Password must be at least 8 characters.");
//             if (!formData.agreeTerms) return setError("You must agree to Terms & Conditions.");

//             setLoading(true);
//             try {
//                 const data = new FormData();
//                 data.append('username', formData.username);
//                 data.append('email', formData.email);
//                 data.append('password', formData.password);
//                 if (formData.phone) data.append('phone', formData.phone);

//                 await axios.post("https://lexluther.alwaysdata.net/api/signup", data);
//                 setSuccess("Account created! Redirecting...");
//                 setTimeout(() => navigate("/signin"), 1800);
//             } catch (err) {
//                 setError(err?.response?.data?.message || "Signup failed.");
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     return (
//         <div className="auth-container" style={{ backgroundImage: `url(${currentBg})` }}>
//             <div className="vignette"></div>

//             <div className="glass-card auth-card">
//                 <div className="auth-header">
//                     <div className="nav-logo">PATHFINDER</div>
//                     <h1>{isSignIn ? "Welcome Back" : "Join the Journey"}</h1>
//                     <p>{isSignIn ? "Continue your journey" : "Create your account and start exploring"}</p>
//                 </div>

//                 <form onSubmit={handleSubmit}>
//                     {error && <p className="error-message">{error}</p>}
//                     {success && <p className="success-message">{success}</p>}

//                     {!isSignIn && (
//                         <div className="input-group">
//                             <label>USERNAME</label>
//                             <input type="text" name="username" placeholder="Choose a username" value={formData.username} onChange={handleChange} required />
//                         </div>
//                     )}

//                     <div className="input-group">
//                         <label>EMAIL ADDRESS</label>
//                         <input 
//                             type="email" 
//                             placeholder="Enter your email" 
//                             value={isSignIn ? email : formData.email} 
//                             onChange={isSignIn ? (e) => setEmail(e.target.value) : handleChange} 
//                             required 
//                         />
//                     </div>

//                     {!isSignIn && (
//                         <div className="input-group">
//                             <label>PHONE NUMBER (OPTIONAL)</label>
//                             <input type="tel" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} />
//                         </div>
//                     )}

//                     <div className="input-group">
//                         <label>PASSWORD</label>
//                         <div className="password-wrapper">
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 placeholder={isSignIn ? "Enter your password" : "Create password"}
//                                 value={isSignIn ? password : formData.password}
//                                 onChange={isSignIn ? (e) => setPassword(e.target.value) : handleChange}
//                                 required
//                             />
//                             <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
//                                 {showPassword ? "Hide" : "Show"}
//                             </button>
//                         </div>
//                     </div>

//                     {!isSignIn && formData.password && (
//                         <div className="strength-container">
//                             <div className="strength-bar">
//                                 <div className="strength-progress" style={{ width: `${strength.score}%`, backgroundColor: strength.color }} />
//                             </div>
//                             <span className="strength-label" style={{ color: strength.color }}>{strength.label}</span>
//                         </div>
//                     )}

//                     {!isSignIn && (
//                         <div className="input-group">
//                             <label>CONFIRM PASSWORD</label>
//                             <input type="password" name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} required />
//                         </div>
//                     )}

//                     {!isSignIn && (
//                         <div className="terms-group">
//                             <input type="checkbox" id="agreeTerms" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />
//                             <label htmlFor="agreeTerms">I agree to the <Link to="/terms" className="gold-link">Terms & Conditions</Link></label>
//                         </div>
//                     )}

//                     <button type="submit" className="confirm-btn" disabled={loading}>
//                         {loading ? (isSignIn ? "Signing In..." : "Creating Account...") : (isSignIn ? "SIGN IN" : "CREATE ACCOUNT")}
//                     </button>

//                     <div className="auth-footer">
//                         <p>
//                             {isSignIn ? "Don't have an account?" : "Already have an account?"} {' '}
//                             <Link to={isSignIn ? "/signup" : "/signin"} className="gold-link">
//                                 {isSignIn ? "Create one" : "Sign In"}
//                             </Link>
//                         </p>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Auth;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Auth = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
                setSuccess("Sign in successful! Redirecting...");
                localStorage.setItem("user", JSON.stringify(response.data.user));
                
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            } else {
                setError(response.data.message || "Invalid credentials");
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Sign in failed. Please check your details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container" style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80')`
        }}>
            <div className="vignette"></div>

            <div className="glass-card auth-card">
                <div className="auth-header">
                    <div className="nav-logo">PATHFINDER</div>
                    <h1>Welcome Back</h1>
                    <p>Continue your journey</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}

                    <div className="input-group">
                        <label>EMAIL ADDRESS</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>PASSWORD</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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

                    <button 
                        type="submit" 
                        className="confirm-btn"
                        disabled={loading}
                    >
                        {loading ? "Signing In..." : "SIGN IN"}
                    </button>

                    <div className="auth-footer">
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

export default Auth;