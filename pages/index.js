import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto';
import prisma from '../utils/prisma';

import { bulkInsertImages } from 'pages/api/pictures/bulk'


function SearchBar({ handleSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    console.log('Search input:', value); // Log the input value
  };

  const handleButtonClick = () => {
    handleSearch(query);
  };

  return (
    <div className="flex justify-center items-center">
      <input
        type="text"
        placeholder="Sök efter bilder här..."
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        value={query}
        onChange={handleInputChange}
      />
      <button
        className="px-4 py-2 ml-2 text-white bg-myColor-700 rounded-full hover:bg-myColor-300 focus:outline-none"
        onClick={handleButtonClick}
      >
        Sök
      </button>
    </div>
  );
}

export default function Home({ images: defaultImages }) {
  const [imageState, setImages] = useState(defaultImages);
  const router = useRouter();
  const { imageId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !imageId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: 'center' });
      setLastViewedPhoto(null);
    }
  }, [imageId, lastViewedPhoto, setLastViewedPhoto]);

  const handleSearch = async (query) => {
    try {
      console.log('Searching for:', query);
  
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const fetchedImages = await response.json();
  
      const imageState = fetchedImages.map((image) => ({
        id: image.id,
        src: image.url,
      }));
  
      setImages(imageState);
    } catch (error) {
      console.error('Error occurred during search:', error);
    }
  };

  return (
    <div className="min-h-screen mx-auto px-1 bg-myColor-100  flex-col justify-center items-center">
      <SearchBar handleSearch={handleSearch} />

      <h2 className="text-2xl font-bold mt-12 mb-4">Bilder</h2>

      <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-6 gap-x-6 gap-y-8">
        {imageState.map(({ id, src }) => (
          <Link
            key={id}
            href={`/?photoId=${id}`}
            as={`/p/${id}`}
            ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
            shallow
          >
            <Image
              alt="Bildtext saknas.."
              style={{ transform: 'translate3d(0, 0, 0)' }}
              src={src}
              width={720}
              height={480}
              sizes="(max-width: 640px) 100vw,
              (max-width: 1280px) 50vw,
              (max-width: 1536px) 33vw,
              25vw"
            />
            <h1>{id}</h1>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  try {
    // Fetch and store images using the fetchAndStoreImages function
    await bulkInsertImages();

    // Retrieve images from MongoDB using Prisma
    const images = await prisma.images.findMany();

    const imageState = images.map((image) => ({
      id: image.id,
      src: image.url,
    }));

    return {
      props: {
        images: imageState,
      },
    };
  } catch (error) {
    console.error('Error occurred during fetching images:', error);
    return {
      props: {
        images: [],
      },
    };
  }
}
