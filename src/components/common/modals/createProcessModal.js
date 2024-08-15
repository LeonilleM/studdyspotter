import React, { useState } from 'react';
import LocationDetails from './helper/LocationDetails';
import PostDetails from './helper/PostDetails';

function CreateProcessModal({ isOpen, closeModal }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [locationDetails, setLocationDetails] = useState(null);

    const handleNext = (details) => {
        setLocationDetails(details);
        setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleClose = () => {
        setLocationDetails(null);
        setCurrentStep(0);
        closeModal();
    };

    if (!isOpen) {
        return null;
    }

    const steps = [
        <LocationDetails onNext={handleNext} />,
        <PostDetails locationDetails={locationDetails} onPrevious={handlePrevious} onClose={handleClose} />
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75" aria-modal="true" role="dialog">
            <div className="bg-white rounded-lg shadow-xl transform py-6 sm:px-12 w-full sm:max-w-3xl sm:ml-40 px-4 min-h-[85vh] overflow-y-auto">
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
                {steps[currentStep]}
                <div className="flex justify-center mt-4">
                    {steps.map((_, index) => (
                        <span key={index} className={`w-2 h-2 rounded-full mx-1 ${index === currentStep ? 'bg-primary' : 'bg-gray-300'}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CreateProcessModal;
