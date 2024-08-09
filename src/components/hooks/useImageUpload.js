// Custom hook that helps with handling upload and drag-and-drop of images
import { useState } from 'react';


const useImageUpload = () => {
    const [images, setImages] = useState([]); // Array of images to let users upload up to 4 images
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dragging, setDragging] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const newImages = Array.from(e.dataTransfer.files).slice(0, 4 - images.length);
            const imageUrls = newImages.map(file => URL.createObjectURL(file));
            setImages(prevImages => [...prevImages, ...imageUrls]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImages = Array.from(e.target.files).slice(0, 4 - images.length);
            const imageUrls = newImages.map(file => URL.createObjectURL(file));
            setImages(prevImages => [...prevImages, ...imageUrls]);
        }
    };

    const handleNextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return {
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
    };
};

export default useImageUpload;