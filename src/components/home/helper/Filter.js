import React, { useState } from 'react';
import { FaSort, FaArrowDown, FaArrowUp } from 'react-icons/fa';

/*
  The filter component is strictly used to help filter out Events through different ways, right now
  it only filters from ascending and descending order of the posted date of the event. This is mostly a re-usable 
  button that can be used in other components that require filtering.   
*/

function Filter({ sortPosts }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    return (
        <div className="relative flex justify-start ">
            <button
                className="px-4 py-2 bg-secondary text-white rounded-lg flex items-center transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <FaSort className="mr-2" />
                Sort By
            </button>
            {isOpen && (
                <div
                    className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg duration-300 ease-in-out "
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <button
                        className="w-full px-4 py-2 text-left text-black hover:bg-gray-100 rounded-lg focus:outline-none duration-300 ease-in-out"
                        onClick={() => {
                            sortPosts('desc');
                            setIsOpen(false);
                        }}
                    >
                        <FaArrowUp className="mr-2" />
                        Newest First
                    </button>
                    <button
                        className="w-full px-4 py-2 text-left text-black hover:bg-gray-100 focus:outline-none rounded-lg"
                        onClick={() => {
                            sortPosts('asc');
                            setIsOpen(false);
                        }}
                    >
                        <FaArrowDown className="mr-2" />
                        Oldest First
                    </button>
                </div>
            )}
        </div>
    );
}

export default Filter;