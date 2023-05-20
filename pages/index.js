import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {getQuery, SearchBar} from 'components/SearchBar';
import { search, mapImageResources } from '../helpers/cloudinary';
import {SelectedImages} from "@/pages/SelectedImages";
import Link from 'next/link';

// let images = [];
let allImages = [];
export default function Home({ images: defaultImages, totalCount: defaultTotalCount }) {
  const [images, setImages] = useState(defaultImages);
  const [totalCount, setTotalCount] = useState(defaultTotalCount);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
      const results = await search({ expression: searchQuery });
      const { resources } = results;
      const images = mapImageResources(resources);
      setImages(images);
      setTotalCount(images.length);
    } catch (error) {
      console.error('Error occurred during search:', error);
    }
  };


    // // Function to handle opening the modal
    // const handleOpenModal = (image) => {
    //   setSelectedImage(image);
    //   setModalOpen(true);
    // };
    //
    // // Function to handle closing the modal
    // const handleCloseModal = () => {
    //   setSelectedImage(null);
    //   setModalOpen(false);
    // }



    return (
      <div className="min-h-screen mx-auto px-1 bg-myColor-100  flex-col justify-center items-center">

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={searchFunction} />

  
      <h2 className="text-2xl font-bold mt-12 mb-4">Bilder</h2>
  
      <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-6 gap-x-6 gap-y-8">
        {images.map((image) => {
          allImages = images;
          return (
            <li key={image.id} className="flex flex-col items-center">
              <div className="aspect-w-2 aspect-h-4">
                <Image width={image.width} height={image.height} src={image.image} alt="hej" className="object-cover" />
              </div>
              <a href={image.title} className="container mx-auto px-1 mt-2 text-current font-semibold text-c">
                <h1>{image.title}</h1>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
  
  
}

export function getAllImages(){
  return allImages;
}

export async function getStaticProps() {
  const results = await search({ expression: '' });
  const { resources } = results;
  const images = mapImageResources(resources);

  return {
    props: {
      images,
      totalCount: images.length,
    },
  };
}
function compareStrings(s1, s2){
  if(s1 == s2){
    return true;
  }
  return false;
}

export function searchFunction(){
  const query = getQuery();
  let i = 0;
  let selectedImages = [];
  console.log(allImages);

  var result = allImages.filter(obj => {
    if(compareStrings(query.toUpperCase(), obj.title.toUpperCase()))
    return obj;
    else if(obj.tags.includes(query)){
      return obj;
    }
  })
  selectedImages = result;
  console.log(selectedImages);
  return selectedImages;

}