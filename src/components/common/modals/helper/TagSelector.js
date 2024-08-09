import React, { useState, useEffect } from 'react';
import { getTags } from '../../../../services/post/getServices';

const TagSelector = ({ selectedTags, setSelectedTags }) => {
    const [availableTags, setAvailableTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            const tags = await getTags();
            setAvailableTags(tags);
        };
        fetchTags();
    }, []);

    const handleTagSelect = (tag) => {
        setSelectedTags([...selectedTags, tag]);
        setAvailableTags(availableTags.filter(t => t.id !== tag.id));
    };

    const handleTagRemove = (tag) => {
        setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
        setAvailableTags([...availableTags, tag]);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default action of the Enter key
        }
    };

    return (
        <div className="font-secondary font-open-sans py-2"
            onKeyDown={handleKeyDown}
        >
            <h1 className="text-light">Select tags below</h1>
            <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                    <button
                        key={tag.id}
                        onClick={() => handleTagSelect(tag)}
                        className="px-2 py-1 border border-gray-400 rounded text-sm hover:bg-gray-400 bg-gray-200"
                    >
                        {tag.name}
                    </button>
                ))}
            </div>
            <h3 className="mt-4">Selected Tags</h3>
            <div className="flex flex-wrap gap-2">
                {selectedTags.map(tag => (
                    <button
                        key={tag.id}
                        onClick={() => handleTagRemove(tag)}
                        className="px-2 py-1 border border-gray-400 rounded text-sm bg-gray-200 flex items-center gap-1"
                    >
                        {tag.name}
                        <span className="ml-2 text-red-500">x</span>
                    </button>
                ))}
            </div>
        </div>

    );
};

export default TagSelector;