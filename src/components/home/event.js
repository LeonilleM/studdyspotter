import React from 'react';
import { NavLink } from 'react-router-dom';

function Event() {
    const posts = [
        {
            id: 1,
            club_name: 'John Doe',
            club_avatar: 'https://via.placeholder.com/150',
            image_url: 'https://via.placeholder.com/400x300',
            location_name: 'Location Name',
            price: 3,
            rating: 4,
            address: 'Address',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vestibulum erat sit amet dolor placerat rhoncus.',
        },
        {
            id: 2,
            club_name: 'Jane Smith',
            club_avatar: 'https://via.placeholder.com/150',
            image_url: 'https://via.placeholder.com/400x300',
            location_name: 'Another Location',
            price: 2,
            rating: 3,
            address: 'Another Address',
            description: 'Aliquam enim dui, fringilla non erat facilisis, interdum vulputate enim.',
        }
    ];

    const renderPrice = (price) => {
        const dollarSigns = [];
        for (let i = 1; i <= 4; i++) {
            dollarSigns.push(
                <span key={i} className={`text-xl ${i <= price ? 'text-green-500' : 'text-gray-400'}`}>$</span>
            );
        }
        return dollarSigns;
    };

    const renderRating = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    className={`w-6 h-6 ${i <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M9.049 2.927a.8.8 0 011.902 0l1.482 4.56a.8.8 0 00.759.553h4.775a.8.8 0 01.45 1.45l-3.866 2.809a.8.8 0 00-.287.89l1.482 4.56a.8.8 0 01-1.238.89l-3.866-2.809a.8.8 0 00-.947 0l-3.866 2.809a.8.8 0 01-1.238-.89l1.482-4.56a.8.8 0 00-.287-.89L2.985 9.49a.8.8 0 01.45-1.45h4.775a.8.8 0 00.759-.553l1.482-4.56z" />
                </svg>
            );
        }
        return stars;
    };

    return (
        <div className="sm:ml-80 py-20 md:px-28 px-6 flex flex-col space-y-6 text-secondary sm:w-3/4">
            <div className="md:text-4xl text-3xl font-encode-sans font-semibold">
                <h1>Recent Posts</h1>
            </div>
            {posts.map(post => (
                <div key={post.id} className="flex flex-col border-secondary">
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-row gap-2 py-4 w-[38rem]">
                            <NavLink to="#">
                                <img className="w-10 h-10 rounded-full bg-gray-300" src={post.club_avatar} alt="Club avatar" />
                            </NavLink>
                            <NavLink to="#">
                                <h1 className="font-encode-sans text-2xl font-semibold">{post.club_name}</h1>
                            </NavLink>
                        </div>
                        <div className="flex flex-col items-center justify-center sm:pt-0 sm:space-y-0 space-y-4">
                            <div className="w-[38rem] xl:h-[rem] overflow-hidden">
                                <img src={post.image_url} alt="Event" className="w-full h-full object-cover border bg-gray-300  rounded-lg" />
                            </div>
                        </div>
                    </div>
                    <div className="items-center flex flex-col pt-4">
                        <div className="flex flex-col space-y-4 w-[38rem]">
                            <div className="flex justify-between">
                                <h1 className="font-encode-sans text-2xl">{post.location_name}</h1>
                                <div className="flex">
                                    {renderPrice(post.price)}
                                </div>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p className="text-xs md:text-base">
                                    <span className="font-bold">Address: </span>
                                    {post.address}
                                </p>
                                <div className="flex">
                                    {renderRating(post.rating)}
                                </div>
                            </div>
                            <p className=" text-xs md:text-base">
                                {post.description}
                            </p>
                            <p className="text-xs md:text-base italic pt-4">
                                Posted Time Ago
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Event;
