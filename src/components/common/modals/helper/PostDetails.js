import React, { useState, useEffect } from 'react';
import useImageUpload from '../../../hooks/useImageUpload';
import ImageUploader from './imageUploader';
import TagSelector from './TagSelector';
import { createPost } from '../../../../services/post/postServices';
import { getCostRating } from '../../../../services/post/getServices';

function PostDetails({ locationDetails, onPrevious, onClose }) {
    const {
        images,
        currentIndex,
        dragging,
        handleDrop,
        handleDragOver,
        handleDragLeave,
        handleFileChange,
        handleNextImage,
        handlePrevImage
    } = useImageUpload();

    const [rating, setRating] = useState('');
    const [costRating, setCostRating] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [description, setDescription] = useState('');
    const [selectedCostRating, setSelectedCostRating] = useState('');

    useEffect(() => {
        const fetchCostRating = async () => {
            const data = await getCostRating();
            setCostRating(data);
        };
        fetchCostRating();
    }, []);

    const validateRating = (rating) => {
        return rating >= 1 && rating <= 5 && Number.isInteger(Number(rating));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateRating(rating)) {
            alert('Rating should be between 1 and 5');
            return;
        }

        const user_id = JSON.parse(sessionStorage.getItem('user')).id;

        const post = {
            ...locationDetails,
            user_id: user_id,
            cost_rating: selectedCostRating,
            star_rating: rating,
            description: description,
            tags: selectedTags
        };

        try {
            await createPost(post, images);
            onClose();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div>
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
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center hover:border-primary transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>
            <div className="flex justify-between pt-4">
                <button onClick={onPrevious} className="px-4 py-2 bg-gray-300 text-black font-bold rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300 ease-in-out">
                    Previous
                </button>
                <button onClick={handleSubmit} className="px-4 py-2 bg-secondary text-white font-bold rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300 ease-in-out">
                    Submit
                </button>
            </div>
        </div>
    );
}

export default PostDetails;
