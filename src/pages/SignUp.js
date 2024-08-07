import React from 'react'
import { NavLink } from 'react-router-dom'
import { signUp } from '../services/auth/authServices';

function SignUp() {


    const submitSignUp = async (e) => {
        e.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const firstName = document.getElementById('firstName').value
        const lastName = document.getElementById('lastName').value
        const response = await signUp(email, password, firstName, lastName)
        if (response.status === 200) {
            console.log('Successfully signed up!')
        } else {
            console.log('Failed to sign up!')
        }
    }

    return (
        <div className="flex min h-screen">
            <div className="w-1/2 flex flex-col justify-center px-28 bg-white">
                <h1 className="text-6xl mb-4 text-secondary font-encode-sans">
                    Create An Account
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
                    <div className="mb-4 flex flex-row space-x-3">
                        <div>
                            <label className="text-secondary font-light mb-1">First Name</label>
                            <input
                                className="shadow appearance-none border rounded-md w-full py-3 px-3 leading-tight focus:outline-primary focus:shadow-outline"
                                id="firstName"
                                type="text"
                                placeholder="Enter First Name"
                                autoComplete='first-name'

                            />
                        </div>
                        <div>
                            <label className="text-secondary font-light mb-1">Last Name</label>
                            <input
                                className="shadow appearance-none border rounded-md w-full py-3 px-3 leading-tight focus:outline-primary focus:shadow-outline"
                                id="lastName"
                                type="text"
                                placeholder="Enter Last Name"
                                autoComplete='last-name'
                            />
                        </div>
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
                            onClick={submitSignUp}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="pt-20 text-xl font-light">
                    Have an account?
                    <NavLink className="text-primary hover:underline font-bold" to="/signin">
                        Sign in
                    </NavLink>
                </p>
            </div>
            <div className="w-1/2 bg-primary">
            </div>
        </div >
    )
}

export default SignUp