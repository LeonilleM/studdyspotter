import React, { useState } from 'react';
import CreateProcessModal from '../modals/createProcessModal';
import { useAuth } from '../../../services/auth/authContext';
import { NavLink } from 'react-router-dom';

function SideNavbar() {
    const { user, logout } = useAuth();
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

    // Handles opening modal    
    const handleOpenModal = () => {
        setIsCreatePostOpen(true);
    };

    // Handles closing modal
    const handleCloseModal = () => {
        setIsCreatePostOpen(false);
    };

    return (
        <div>
            <aside className="fixed top-0 left-0 h-full w-80 bg-primary text-white md:flex flex-col font-light hidden">
                <div className="h-full pt-24 overflow-y-auto flex flex-col justify-between">
                    <ul className="text-2xl space-y-2 font-open-sans pt-24">
                        <li className=" mx-8 flex items-center gap-4 py-3 hover:rounded-2xl hover:bg-secondary  transition ease-in-out duration-500 px-3">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 9.5L12 3L21 9.5V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H15C14.7348 21 14.4804 20.8946 14.2929 20.7071C14.1054 20.5196 14 20.2652 14 20V16C14 15.7348 13.8946 15.4804 13.7071 15.2929C13.5196 15.1054 13.2652 15 13 15H11C10.7348 15 10.4804 15.1054 10.2929 15.2929C10.1054 15.4804 10 15.7348 10 16V20C10 20.2652 9.89464 20.5196 9.70711 20.7071C9.51957 20.8946 9.26522 21 9 21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V9.5Z"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round" />
                            </svg>
                            Feed
                        </li>
                        <hr />
                        {user
                            ? (
                                <>
                                    <li
                                        className="mx-8 flex items-center gap-4 py-3 px-3 rounded-2xl hover:bg-secondary  transition ease-in-out duration-500"
                                        onClick={handleOpenModal}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-12 w-12 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                        Create
                                    </li>
                                </>
                            )
                            : <li className="mx-8 flex items-center gap-4 py-3 px-3 hover:rounded-2x">
                                Log in to post
                            </li>
                        }
                    </ul>
                    <div className="py-6 px-7">
                        {user
                            ? <div className="flex flex-row items-center text-center p-3 hover:bg-secondary transition duration-300 ease-in-out rounded"
                                onClick={logout}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout"
                                    width="44" height="44" viewBox="0 0 24 24"
                                    strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M14 8l-4 4l4 4" />
                                    <path d="M10 12h10" />
                                    <path d="M5 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-4" />
                                    <circle cx="7" cy="12" r=".5" />
                                </svg>
                                <span className="text-2xl">Logout</span>
                            </div>
                            : <NavLink
                                className="flex flex-row items-center text-center p-3 hover:bg-secondary transition duration-300 ease-in-out roudned"
                                to="/"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-login"
                                    width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M10 8l4 4l-4 4" />
                                    <path d="M14 12H4" />
                                    <path d="M19 4h-4a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h4" />
                                    <circle cx="17" cy="12" r=".5" />
                                </svg>
                                <p className="text-2xl">Sign In</p>

                            </NavLink>
                        }
                    </div>
                </div>
            </aside >
            <CreateProcessModal isOpen={isCreatePostOpen} closeModal={handleCloseModal} />
        </div >
    );
}

export default SideNavbar;
