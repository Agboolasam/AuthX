import { NavLink } from "react-router-dom"
import logo from '../assets/logo.jpg'

function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <img src={logo} alt="Logo" className="mb-6 mx-auto h-25 " />
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
                <form className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        required
                        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
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