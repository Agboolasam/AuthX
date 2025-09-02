import { NavLink, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.jpg'
import axios from "axios"
const API_BASE_URL = import.meta.env.VITE_API_URL;
const Port = import.meta.env.VITE_API_PORT;


function Login() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const response = await axios.post(`https://authx-ch2d.onrender.com/auth/login`, { email, password });
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);

        } catch (error) {
            console.error("Error logging in:", error);
            setError(error.response?.data?.error || "An error occurred while logging in.");
        }
    };


    // Load Google Sign-In script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: '866082152282-sbdh5209qou8hqatns2ce37e35sjpb9d.apps.googleusercontent.com',
                    callback: handleGoogleResponse
                });
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    });


    const handleGoogleResponse = async (response) => {
        setLoading(true);
        setError(null);

        try {
            const googleToken = response.credential;

            const backendResponse = await axios.post(`https://authx-ch2d.onrender.com/auth/google-signin`, {
                token: googleToken
            });

            localStorage.setItem("token", backendResponse.data.accessToken);
            localStorage.setItem("refreshToken", backendResponse.data.refreshToken);

            // Redirect to dashboard or home page
            navigate('/dashboard');

        } catch (error) {
            console.error("Google sign-in error:", error);
            setError(error.response?.data?.error || "Google sign-in failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        if (window.google) {
            window.google.accounts.id.prompt();
        } else {
            setError("Google Sign-In not loaded. Please refresh the page.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <img src={logo} alt="Logo" className="mb-6 mx-auto h-25 " />
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                </form>
                <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    {loading ? 'Signing In...' : 'Sign In with Google'}
                </button>
                <p className="mt-4 text-center text-gray-600">
                    Dont have an account?{" "}
                    <NavLink to="/register" className="text-blue-600 hover:underline">
                        register
                    </NavLink>
                </p>
            </div>
        </div>
    )
}

export default Login
