import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'

import { SearchBar } from 'components/SearchBar';
import ImageModal from 'components/ImageModal';


import { search, mapImageResources } from '../helpers/cloudinary';


export default function Home({ images: defaultImages, nextCursor: defaultNextCursor, totalCount: defaultTotalCount }) {
  const [images, setImages] = useState(defaultImages);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  const [totalCount, setTotalCount] = useState(defaultTotalCount);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

    // Function to handle opening the modal
    const handleOpenModal = (image) => {
      setSelectedImage(image);
      setModalOpen(true);
    };
  
    // Function to handle closing the modal
    const handleCloseModal = () => {
      setSelectedImage(null);
      setModalOpen(false);
    }

  function mapImageResources(resources) {
      return resources.map(resource => {
        const { width, height } = resource;
        return {
          id: resource.asset_id,
          title: resource.public_id,
          image: resource.secure_url,
          width,
          height,
        };
      });
    }

  async function handleOnLoadMore(e) {
    e.preventDefault();

    const results = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({
        expression: `""`,
        nextCursor
      })
    }).then(r => r.json());

    const { resources, next_cursor: nextPageCursor, total_count: updatedTotalCount } = results;

    const images = mapImageResources(resources);

    setImages(prev => {
      return [
        ...prev,
        ...images
      ]
    });
    setNextCursor(nextPageCursor);
    setTotalCount(updatedTotalCount);
  }


  return (
    <div className="min-h-screen mx-auto px-1 bg-myColor-100  flex-col justify-center items-center">
      <SearchBar />
  
      <h2 className="text-2xl font-bold mt-12 mb-4">Bilder</h2>
  
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-8">
        {images.map((image) => {
          return (
            <li key={image.id} className="flex flex-col items-center">
              <div className="aspect-w-2 aspect-h-3">
                <Image width={image.width} height={image.height} src={image.image} alt="" className="object-cover" />
              </div>
              <a href={image.link} rel="noreferrer" className="container mt-2 text-lg font-medium text-gray-900">
                {image.title}
              </a>
            </li>
          );
        })}
      </ul>
  
      {totalCount > images.length && (
        <div className="mt-8">
        </div>
      )}
    </div>
  );
  
  
}

export async function getStaticProps() {
  const results = await search({
    expression:(''),
    max_results:(20),
  })


  const { resources, next_cursor: nextCursor } = results;

  const images = mapImageResources(resources);

  return {
    props: {
      images,
      nextCursor: nextCursor || false,
    }
  }
}


/*
export async function getStaticProps() {
  const results = await search({
    expression: 'folder=""'
  });

  const { resources, next_cursor: nextCursor, total_count: totalCount } = results;

  const images = mapImageResources(resources);

  const { folders } = await getFolders();

  return {
    props: {
      images,
      nextCursor: nextCursor || false,
      totalCount,
      folders
    }
  }
} */