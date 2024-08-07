import React, { useState } from 'react'
import CreatePost from "../modals/CreatePost.js"

function SideNavbar() {
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

    const handleOpenModal = () => {
        setIsCreatePostOpen(true)
    }

    const handleCloseModal = () => {
        setIsCreatePostOpen(false)
    }

    return (
        <div>
            <aside className="fixed top-0 left-0 h-full w-80 bg-primary text-white md:flex flex-col font-light hidden">
                <div className="h-full pt-24 overflow-y-auto flex flex-col justify-between px-7">
                    <ul className="text-2xl space-y-2 font-open-sans">
                        <li className="flex items-center gap-4 pt-4 pb-4 px-3 hover:rounded-2xl hover:bg-secondary  transition ease-in-out duration-500">
                            Feed
                        </li>
                        <li
                            className="flex items-center gap-4 pt-4 pb-4 px-3 hover:rounded-2xl hover:bg-secondary  transition ease-in-out duration-500"
                            onClick={handleOpenModal}
                        >
                            Create
                        </li>
                    </ul>
                    <div className="p-6">
                        <h1
                            className="flex items-center gap-4"
                        >
                            <img src="" alt="Logout" className="h-6 w-6" />
                            <span className="text-2xl">Logout</span>
                        </h1>
                    </div>

                </div>
            </aside>
            <CreatePost isOpen={isCreatePostOpen} closeModal={handleCloseModal} />
        </div>
    )
}

export default SideNavbar