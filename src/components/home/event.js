import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchPost } from '../../services/post/getServices';
import { formatDistanceToNow } from 'date-fns';
import Filter from './helper/Filter';

function Event() {
    const [posts, setPosts] = useState([]);

    // Retreives the posts from the database
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPost();
            if (data) {
                const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setPosts(data);
            }
        };

        fetchData();
    }, []);

    // This function sorts the posts based on the order parameter
    const sortPosts = (order) => {
        const sorted = [...posts].sort((a, b) => {
            if (order === 'desc') {
                return new Date(b.created_at) - new Date(a.created_at);
            } else {
                return new Date(a.created_at) - new Date(b.created_at); // asc sort
            }
        });
        setPosts(sorted);
    }

    const renderPrice = (cost_rating) => {
        const dollarSigns = [];
        for (let i = 1; i <= 4; i++) {
            dollarSigns.push(
                <span key={i} className={`text-xl ${i <= cost_rating ? 'text-green-500' : 'text-gray-400'}`}>$</span>
            );
        }
        return dollarSigns;
    };

    const renderRating = (star_rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    className={`w-6 h-6 ${i <= star_rating ? 'text-yellow-500' : 'text-gray-400'}`}
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

    // Used to sort the post


    return (
        <div className="sm:ml-80 py-20 md:px-28 px-6 flex flex-col space-y-6 text-secondary sm:w-3/4">
            <div className="md:text-4xl text-3xl font-encode-sans font-semibold">
                <h1>Recent Posts</h1>
            </div>
            <Filter sortPosts={sortPosts} />

            {posts.map((post) => (
                <div key={post.id} className="flex flex-col border-secondary">
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-row gap-2 py-4 w-[38rem]">
                            <NavLink to="#">
                                <img
                                    className="w-10 h-10 rounded-full bg-gray-300"
                                    src={post.club_avatar}
                                    alt="Club avatar"
                                />
                            </NavLink>
                            <NavLink to="#">
                                <h1 className="font-encode-sans text-2xl font-semibold">
                                    {post.profile.first_name} {post.profile.last_name}
                                </h1>
                            </NavLink>
                        </div>
                        <div className="flex flex-col items-center justify-center sm:pt-0 sm:space-y-0 space-y-4">
                            <ImagesCarousel postImages={post.post_images} />
                        </div>
                    </div>
                    <div className="items-center flex flex-col pt-4">
                        <div className="flex flex-col space-y-4 w-[38rem]">
                            <div className="flex justify-between">
                                <h1 className="font-encode-sans text-2xl">{post.study_spots.name}</h1>
                                <div className="flex">{renderPrice(post.cost_rating)}</div>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p className="text-xs md:text-base">
                                    <span className="font-bold">Address: </span>
                                    {post.study_spots.address}
                                </p>
                                <div className="flex">{renderRating(post.star_rating)}</div>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p className="text-xs md:text-base italic">
                                    Tags: {post.tags_list}
                                </p>
                                <p className="text-xs md:text-base italic">
                                    Category: {post.study_spots.location_category.name}
                                </p>
                            </div>
                            <p className="text-xs md:text-base">{post.description}</p>
                            <p className="text-xs md:text-base italic pt-4">
                                Posted {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

const ImagesCarousel = ({ postImages }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === postImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? postImages.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative w-[38rem] overflow-hidden rounded-lg">
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
                {postImages.map((image, index) => (
                    <div key={index} className="min-w-full h-[24rem]">
                        <img
                            src={image.image_url}
                            alt={`image${index + 1}`}
                            className="h-full w-full object-cover border bg-gray-300 rounded-lg"
                        />
                    </div>
                ))}
            </div>
            <button
                onClick={prevImage}
                className="absolute top-1/2 transform -translate-y-1/2 left-4 bg-gray-800 text-white p-2 rounded-full"
            >
                ‹
            </button>
            <button
                onClick={nextImage}
                className="absolute top-1/2 transform -translate-y-1/2 right-4 bg-gray-800 text-white p-2 rounded-full"
            >
                ›
            </button>
            <div className="flex space-x-2 mt-4 justify-center">
                {postImages.map((_, index) => (
                    <span
                        key={index}
                        className={`indicator w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-400'
                            }`}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Event;
