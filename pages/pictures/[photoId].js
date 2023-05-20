import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

const Home = ({ currentPhoto }) => {
  const router = useRouter();
  const { photoId } = router.query;
  let index = Number(photoId);

  const currentPhotoUrl = `https://res.cloudinary.com/dmhozrlru/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`;

  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    // Placeholder logic to add the item to the cart
    setIsAddedToCart(true);
  };

  return (
    <>
      <Head>
        <title>Bothniabladets bildbank</title>
        <meta property="og:image" content={currentPhotoUrl} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <h1>Photo ID: {photoId}</h1>
        <img src={currentPhotoUrl} alt="Current Photo" />

        {/* Display other photo information here */}
        <p>Created at: {currentPhoto.created_at}</p>
        <p>Dimensions: {currentPhoto.width} x {currentPhoto.height}</p>

        {!isAddedToCart ? (
          <button onClick={handleAddToCart}>Add to Cart</button>
        ) : (
          <p>Item added to cart!</p>
        )}
      </main>
    </>
  );
};

export async function getStaticProps(context) {
  // Fetch the photo data based on the id parameter
  const { photoId } = context.params;

  // Replace this with your actual logic to fetch the photo data
  const currentPhoto = {
    public_id: 'sample_public_id',
    created_at: '2023-05-20',
    width: 1024,
    height: 768,
    format: 'jpg',
  };

  return {
    props: {
      currentPhoto: currentPhoto,
    },
  };
}

export async function getStaticPaths() {
  // Fetch the available photo IDs or generate them dynamically
  const photoIds = [1, 2, 3]; // Replace with your actual logic to fetch photo IDs

  // Generate an array of path objects with params containing the photo IDs
  const paths = photoIds.map((id) => ({
    params: { photoId: id.toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export default Home;
