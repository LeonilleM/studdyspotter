import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signUp } from '../services/auth/authServices';

function SignUp() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        try {
            const { data, error } = await signUp(email, password, firstName, lastName,);
            if (error) {
                setError(error.message);
                console.log('Failed to sign up!');
            } else {
                console.log('Signed up successfully!')
                navigate('/home')
                return data
            }
        } catch (error) {
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 flex flex-col justify-center px-28 bg-white">
                <h1 className="text-6xl mb-4 text-secondary font-encode-sans">
                    Create An Account
                </h1>
                <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                    <div className="mb-4 font-open-sans">
                        <label className="text-secondary font-light mb-1" htmlFor="email">UW Email</label>
                        <input
                            className="shadow appearance-none border rounded-md w-full py-3 px-3 text-gray-700 leading-tight focus:outline-primary focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="UW Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </div>
                    <div className="mb-4 flex flex-row space-x-3">
                        <div>
                            <label className="text-secondary font-light mb-1" htmlFor="firstName">First Name</label>
                            <input
                                className="shadow appearance-none border rounded-md w-full py-3 px-3 leading-tight focus:outline-primary focus:shadow-outline"
                                id="firstName"
                                type="text"
                                placeholder="Enter First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                autoComplete='given-name'
                            />
                        </div>
                        <div>
                            <label className="text-secondary font-light mb-1" htmlFor="lastName">Last Name</label>
                            <input
                                className="shadow appearance-none border rounded-md w-full py-3 px-3 leading-tight focus:outline-primary focus:shadow-outline"
                                id="lastName"
                                type="text"
                                placeholder="Enter Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                autoComplete='family-name'
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="text-secondary font-light mb-1" htmlFor="password">Password</label>
                        <input
                            className="shadow appearance-none border rounded-md w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <div className="flex items-center">
                        <button
                            className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="pt-20 text-xl font-light">
                    Have an account?
                    <NavLink className="text-primary hover:underline font-bold" to="/">
                        Sign in
                    </NavLink>
                </p>
            </div>
            <div className="w-1/2 bg-primary"></div>
        </div>
    );
}

export default SignUp;
