import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'

import { SearchBar } from 'components/SearchBar';

import { search, mapImageResources } from '../helpers/cloudinary';



//import { search, mapImageResources } from '../helpers/cloudinary';


export default function Home({ images: defaultImages, totalCount: defaultTotalCount }) {
  const [images, setImages] = useState(defaultImages);
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



  return (
    <div className="min-h-screen mx-auto px-1 bg-myColor-100  flex-col justify-center items-center">
      <SearchBar />
  
      <h2 className="text-2xl font-bold mt-12 mb-4">Bilder</h2>
  
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-8">
        {images.map((image) => {
          return (
            <li key={image.id} className="flex flex-col items-center">
              <div className="aspect-w-2 aspect-h-4">
                <Image width={image.width} height={image.height} src={image.image} alt="hej" className="object-cover" />
              </div>
              <a href={image.title} className="container mx-auto px-1 mt-2 text-current font-semibold text-c">
                <h1>{image.title} Pris</h1>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
  
  
}



export async function getStaticProps() {
  
  const results = await search({
    expression: 'groda'
  });
  console.log(results)

  const { resources } = results;

  const images = mapImageResources(resources);

  return {
    props: {
      images,
      results,
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