import React from 'react';

const ImageModal = ({ image, onClose }) => {
  // Function to handle clicks outside the modal
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Function to handle closing the modal
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75" onClick={handleOutsideClick}>
      <div className="relative">
        <button className="absolute top-2 right-2 text-white" onClick={handleClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img src={image.src} alt={image.title} className="max-w-full max-h-full" />
        {/* Additional information or API call */}
        {/* You can display more information about the image or make an API call here */}
      </div>
    </div>
  );
};

export default ImageModal;
