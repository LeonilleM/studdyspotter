import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getStudySpots, getLocationCategory } from '../../../../services/post/getServices';

function LocationDetails({ onNext }) {
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState('');
    const [locationCategory, setLocationCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [studySpots, setStudySpots] = useState([]);
    const [selectedStudySpot, setSelectedStudySpot] = useState(null);
    const [isCreatingNewSpot, setIsCreatingNewSpot] = useState(false);

    useEffect(() => {
        const fetchLocationCategory = async () => {
            const data = await getLocationCategory();
            setLocationCategory(data);
        };
        fetchLocationCategory();
    }, []);

    useEffect(() => {
        const fetchStudySpots = async () => {
            const data = await getStudySpots();
            // Sort the study spots by name
            data.sort((a, b) => a.name.localeCompare(b.name));
            setStudySpots(data.map(spot => ({
                label: spot.name,
                value: spot.id,
                address: spot.address,
                location_category_id: spot.location_category_id
            })));
        };
        fetchStudySpots();
    }, []);

    const formatOptionLabel = ({ label, value }) => {
        if (value === 'create_new') {
            return (
                <div className="flex flex-row text-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                    >
                        <path d="M19 11H13V5C13 4.447 12.553 4 12 4C11.447 4 11 4.447 11 5V11H5C4.447 11 4 11.447 4 12C4 12.553 4.447 13 5 13H11V19C11 19.553 11.447 20 12 20C12.553 20 13 19.553 13 19V13H19C19.553 13 20 12.553 20 12C20 11.447 19.553 11 19 11Z" />
                    </svg>
                    {label}
                </div>
            );
        }
        return label;
    };

    const handleNext = () => {
        if (isCreatingNewSpot && (!location || !address || !selectedCategory)) {
            alert('Please fill in all fields for the new location.');
            return;
        }

        const locationDetails = {
            study_spot_name: selectedStudySpot ? selectedStudySpot.label : location,
            study_spot_address: selectedStudySpot ? selectedStudySpot.address : address,
            study_spot_category_id: selectedStudySpot ? selectedStudySpot.location_category_id : selectedCategory
        };
        onNext(locationDetails);
    };

    return (
        <div>
            <div className="p-4">
                <Select
                    options={[{ label: 'Create New', value: 'create_new' }, ...studySpots]}
                    formatOptionLabel={formatOptionLabel}
                    onChange={(selectedOption) => {
                        if (selectedOption.value === 'create_new') {
                            setIsCreatingNewSpot(true);
                            setSelectedStudySpot(null);
                            setAddress('');
                            setLocation('');
                        } else {
                            setIsCreatingNewSpot(false);
                            setSelectedStudySpot(selectedOption);
                            setAddress(selectedOption ? selectedOption.label : '');
                            setLocation(selectedOption ? selectedOption.address : '');
                        }
                    }}
                    value={selectedStudySpot}
                    placeholder="Select Study Spot"
                    classNamePrefix="react-select"
                />
                {isCreatingNewSpot && (
                    <>
                        <div className="pt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="new-location-name">New Location Name</label>
                            <input
                                id="new-location-name"
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="ex. Odegaard Library"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 hover:border-primary transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="new-location-address">New Address</label>
                            <input
                                id="new-location-address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="ex. 4060 George Washington Lane Northeast, Seattle, WA "
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 hover:border-primary transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="select-category">Category</label>
                            <select
                                id="select-category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 hover:border-primary transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="">Select</option>
                                {locationCategory.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300 ease-in-out"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LocationDetails;
