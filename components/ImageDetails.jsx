import React from 'react';

const ImageDetails = ({ photo }) => {
  const handleAddToCart = () => {
    // Handle the logic for adding the photo to the cart
  };

  return (
    <div>
      <img src={photo.imageUrl} alt={photo.title} />
      <h1>{photo.title}</h1>
      <p>{photo.description}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ImageDetails;
