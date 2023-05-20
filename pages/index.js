import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { performSearch } from './api/search';
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto';
import { mapImageResources } from '../helpers/cloudinary';



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

export default function Home({ images: defaultImages, totalCount: defaultTotalCount }) {
  const [images, setImages] = useState(defaultImages);
  const [totalCount, setTotalCount] = useState(defaultTotalCount);
  const router = useRouter()
  const { imageId } = router.query
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

  const lastViewedPhotoRef = useRef(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !imageId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [imageId, lastViewedPhoto, setLastViewedPhoto])

  const handleSearch = async (query) => {
    try {
      console.log('Searching for:', query);

      const results = await performSearch({ expression: query });
      const { resources } = results;
      const updatedImages = mapImageResources(resources);

      setImages(updatedImages);
      setTotalCount(updatedImages.length);
    } catch (error) {
      console.error('Error occurred during search:', error);
    }
  };

  return (
    <div className="min-h-screen mx-auto px-1 bg-myColor-100  flex-col justify-center items-center">
      <SearchBar handleSearch={handleSearch} />
  
      <h2 className="text-2xl font-bold mt-12 mb-4">Bilder</h2>
  
      <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-6 gap-x-6 gap-y-8">
  {images.map(({ id, public_id, format }) => (
    <Link
      key={id}
      href={`/?photoId=${id}`}
      as={`/p/${id}`}
      ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
      shallow
    >
      <Image
        alt={'Bildtext saknas..'}
        style={{ transform: 'translate3d(0, 0, 0)' }}
        src={`https://res.cloudinary.com/dmhozrlru/image/upload/c_scale,w_720/${public_id}.${format}`}
        width={720}
        height={480}
        sizes="(max-width: 640px) 100vw,
        (max-width: 1280px) 50vw,
        (max-width: 1536px) 33vw,
        25vw"
      />
      <h1>{images.id}</h1>
    </Link>
  ))}
</ul>
    </div>
  );
  
}

export async function getStaticProps() {
  const results = await performSearch({ expression: '' }); // Modify the default expression value here if needed


  let reducedResults = [];
  let i = 0;
  for (let result of results.resources) {
    reducedResults.push({
      id: i, // Increment `i` before assigning it to `id`
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    })
    i++
  }

  //const images = mapImageResources(reducedResults);

  return {
    props: {
      images: reducedResults
    },
  };
}







