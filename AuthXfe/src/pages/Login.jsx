import { NavLink } from "react-router-dom"
import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import axios from "axios"
const API_BASE_URL = import.meta.env.VITE_API_URL;
const Port = import.meta.env.VITE_API_PORT;


function Login() {
    const [error, setError] = useState(null);
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
            const response = await axios.post(`http://20.55.42.170:3000/auth/login`, { email, password });
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);

        } catch (error) {
            console.error("Error logging in:", error);
            setError(error.response?.data?.error || "An error occurred while logging in.");
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
                        className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                </form>
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
