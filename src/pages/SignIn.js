import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signIn } from '../services/auth/authServices';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const submitSignIn = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        const data = await signIn(email, password);
        if (data) {
            console.log('Successfully signed in!');
            navigate('/home');
        } else {
            setError('Failed to sign in!');
            console.log('Failed to sign in!');
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 bg-primary"></div>
            <div className="w-1/2 flex flex-col justify-center px-28 bg-white">
                <h1 className="text-6xl mb-4 text-secondary font-encode-sans">
                    Sign in
                </h1>
                <form className="w-full max-w-sm" onSubmit={submitSignIn}>
                    <div className="mb-4 font-open-sans">
                        <label className="text-secondary font-light mb-1" htmlFor="email">UW Email</label>
                        <input
                            className="shadow appearance-none border rounded-md w-full py-3 px-3 text-gray-700 leading-tight focus:outline-primary focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="UW Email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="text-secondary font-light mb-1" htmlFor="password">Password</label>
                        <input
                            className="shadow appearance-none border rounded-md w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-primary focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <div className="flex items-center">
                        <button
                            className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <p className="pt-20 text-xl font-light">
                    Don't have an account? <NavLink className="text-primary hover:underline font-bold" to="/signup">Sign up</NavLink>
                </p>
            </div>
        </div>
    );
}

export default SignIn;
