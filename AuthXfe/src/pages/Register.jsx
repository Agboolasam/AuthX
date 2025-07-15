import { NavLink } from "react-router-dom"
import logo from '../assets/logo.jpg'
import axios from 'axios'
import { useState } from 'react'
const API_BASE_URL = import.meta.env.VITE_API_URL;
const Port = import.meta.env.VITE_API_PORT;

function Register() {
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        name: '',
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

        try {
            const response = await axios.post(`http://20.55.42.170:3000/auth/register`, data);
            console.log(response.data);
            setError(data.message || "Registration successful!");
        } catch (error) {
            console.error("Error registering:", error);
            setError(error.response?.data?.error || "An error occurred while registering.");
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <img src={logo} alt="Logo" className="mb-6 mx-auto h-25 " />
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        name="name"
                        required
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{" "}
                    <NavLink to="/" className="text-blue-600 hover:underline">
                        Log in
                    </NavLink>
                </p>
            </div>
        </div>
    )
}

export default Register