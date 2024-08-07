import React, { useEffect, useState } from 'react';
import TagSelector from './helper/TagSelector';
import { getLocationCategory, getCostRating } from '../../../services/post/postServices';
import useImageUpload from '../../hooks/useImageUpload';
import ImageUploader from './helper/imageUploader';

function CreatePost({ isOpen, closeModal }) {

    // Custom hook to handle image upload
    const {
        images,
        setImages,
        currentIndex,
        dragging,
        handleDrop,
        handleDragOver,
        handleDragLeave,
        handleFileChange,
        handleNextImage,
        handlePrevImage
    } = useImageUpload();

    // Form states for the post
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState('');
    const [costRating, setCostRating] = useState([]); // Initialize as an array
    const [selectedTags, setSelectedTags] = useState([]);
    const [description, setDescription] = useState('');
    const [locationCategory, setLocationCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCostRating, setSelectedCostRating] = useState(''); // Corrected state name

    // Fetch cost rating
    useEffect(() => {
        const fetchCostRating = async () => {
            const data = await getCostRating();
            setCostRating(data);
        };
        fetchCostRating();
    }, []);

    // Fetch location category
    useEffect(() => {
        const fetchLocationCategory = async () => {
            const data = await getLocationCategory();
            setLocationCategory(data);
        };
        fetchLocationCategory();
    }, []);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const validateRating = (rating) => {
        return rating >= 1 && rating <= 5;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateRating(rating)) {
            alert('Rating should be between 1 and 5');
            return;
        }
        // Add your form submission logic here

        handleClose(); // Close the modal after successful submission
    };

    const handleClose = () => {
        // Reset form state
        setImages([]);
        setAddress('');
        setLocation('');
        setSelectedCategory('');
        setRating('');
        setSelectedCostRating('');
        setSelectedTags([]);
        setDescription('');
        // Close the modal
        closeModal();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75"
            onClick={handleOverlayClick}
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-white rounded-lg shadow-xl transform py-6 sm:px-12 w-full sm:max-w-3xl sm:ml-40 px-4 max-h-screen overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-8">
                        <button
                            type="button"
                            className="text-secondary hover:text-black transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            onClick={handleClose}
                            aria-label="Close modal"
                        >
                            &#10005; Close
                        </button>
                    </div>
                    <ImageUploader
                        images={images}
                        currentIndex={currentIndex}
                        dragging={dragging}
                        handleDrop={handleDrop}
                        handleDragOver={handleDragOver}
                        handleDragLeave={handleDragLeave}
                        handleFileChange={handleFileChange}
                        handleNextImage={handleNextImage}
                        handlePrevImage={handlePrevImage}
                    />
                    <div className="grid grid-cols-2 gap-4 pt-6">
                        <div>
                            <input
                                id="address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Library"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center hover:border-primary transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-center" htmlFor="address">
                                Location
                            </label>
                        </div>
                        <div>
                            <input
                                id="location"
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="17927 113th Ave NE, Bothell, WA "
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center hover:border-primary transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-center" htmlFor="location">
                                Address
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-center" htmlFor="rating">
                                Rating
                            </label>
                            <input
                                id="rating"
                                type="number"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                placeholder="1-5"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center hover:border-primary transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-center" htmlFor="cost-rating">
                                Cost Rating
                            </label>
                            <select
                                id="cost-rating"
                                value={selectedCostRating}
                                onChange={(e) => setSelectedCostRating(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center hover:border-primary transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="">Select</option>
                                {costRating.map((rating) => (
                                    <option key={rating.id} value={rating.id}>
                                        {rating.symbol_rating}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-center" htmlFor="select-category">
                                Location Category
                            </label>
                            <select
                                id="select-category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center hover:border-primary transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="">Select</option>
                                {locationCategory.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <TagSelector selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
                                Description
                            </label>
                            <input
                                id="description"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 hover:border-primary transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center pt-12">
                        <button type="submit" className="px-12 py-2 bg-secondary text-white font-bold rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300 ease-in-out"
                            aria-label="Post">
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
