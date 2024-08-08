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
            setStudySpots(data.map(spot => ({
                label: spot.name,
                value: spot.id,
                address: spot.address,
                location_category_id: spot.location_category_id
            })));
        };
        fetchStudySpots();
    }, []);

    const handleNext = () => {
        const locationDetails = {
            study_spot_name: selectedStudySpot ? selectedStudySpot.label : location,
            study_spot_address: selectedStudySpot ? selectedStudySpot.address : address,
            study_spot_category_id: selectedStudySpot ? selectedStudySpot.location_category_id : selectedCategory
        };
        onNext(locationDetails);
    };

    return (
        <div>
            <Select
                options={[...studySpots, { label: 'Create New', value: 'create_new' }]}
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
                    <input
                        id="new-location-name"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="New Study Spot Name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center hover:border-primary transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-1 text-center" htmlFor="new-location-name">
                        New Location Name
                    </label>
                    <input
                        id="new-location-address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="New Study Spot Address"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center hover:border-primary transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary mt-4"
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-1 text-center" htmlFor="new-location-address">
                        New Address
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
                </>
            )}
            <button onClick={handleNext} className="px-12 py-2 bg-secondary text-white font-bold rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300 ease-in-out">
                Next
            </button>
        </div>
    );
}

export default LocationDetails;
