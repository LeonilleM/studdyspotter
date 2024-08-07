import React from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { signIn } from '../services/auth/authServices'

function SignIn() {

    const submitSignIn = async (e) => {
        e.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const response = await signIn(email, password)
        if (response.status === 200) {
            console.log('Successfully signed in!')
            return <Navigate to="/"></Navigate>
        } else {
            console.log('Failed to sign in!')
        }
    }

    return (
        <div className="flex min h-screen">
            < div className="w-1/2 bg-primary" >
            </div >
            <div className="w-1/2 flex flex-col justify-center px-28 bg-white">
                <h1 className="text-6xl mb-4 text-secondary font-encode-sans">
                    Sign in
                </h1>
                <form className="w-full max-w-sm">
                    <div className="mb-4 font-open-sans">
                        <label className="text-secondary font-light mb-1">UW Email</label>
                        <input
                            className={`shadow appearance-none border rounded-md w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            id="email"
                            type="email"
                            placeholder="UW Email"
                            autoComplete="email"
                        />

                    </div>
                    <div className="mb-6">
                        <label className="text-secondary font-light mb-1">Password</label>
                        <input
                            className={`shadow appearance-none border rounded-md w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline  'border-red-500' : ''}`}
                            id="password"
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                        />

                    </div>
                    <div className="flex items-center">
                        <button
                            className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            onClick={submitSignIn}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="pt-20 text-xl font-light">
                    Don't have an account?
                    <NavLink className="text-primary hover:underline font-bold" to="/signup"> Sign up
                    </NavLink>
                </p>
            </div>
        </div >
    )
}

export default SignIn