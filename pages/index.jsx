import {useEffect, useState} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {getQuery, SearchBar} from 'components/SearchBar';
import { search, mapImageResources } from '../helpers/cloudinary';
import Link from 'next/link';

let images = [];
let allImages = [];
// let select = [];

import React, { createContext } from "react";

// const MyProvider = ({ children }) => {
//   const [data, setData] = useState(null);
//
//   useEffect(() => {
//     const fetchData = async () => {
//       const query = getQuery();
//       if (!query) {
//         try {
//           const results = await search({expression: ''});
//           const {resources} = results;
//           images = mapImageResources(resources);
//           setData(images);
//         } catch (error) {
//           console.error(error);
//         }
//       } else {
//         images = searchFunction();
//         setData(images);
//       }
//     }
//
//     fetchData();
//   }, []);
//
//   return <MyContext.Provider value={data}>{children}</MyContext.Provider>;
// };

export default function Home({images: defaultImages, totalCount: defaultTotalCount}) {
  const [images, setImages] = useState(defaultImages);
  const [totalCount, setTotalCount] = useState(defaultTotalCount);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImg, setSelectedImg] = useState(null);
  const [searchedImages, setSearchedImages] = useState([]);

  let query;
  function setQuery(input){
    query = input;
    console.log(query)
  }
  function getQuery(){
      if(query){
          return query.trim();
      }
    return query;
  }
  //Clears the searchbox
    function clearInput(){
        var getValue= document.getElementById("searchBox");
        if (getValue) {
            getValue.value = "";
        }
    }
function searchFunction() {
    const query = getQuery();
    let i = 0;
    let selectedImages = [];
    console.log(allImages);

    if(query) {
        var result = allImages.filter(obj => {
            if (compareStrings(query.toUpperCase(), obj.title.toUpperCase())) {
                return obj;
            } else if (obj.tags.includes(query)) {
                return obj;
            }
        })
    }
    selectedImages = result;
    if(!selectedImages){
        selectedImages = [];
    }
    console.log(selectedImages);
    setSearchedImages(selectedImages);}
    clearInput();

    return (
      <div className="min-h-screen mx-auto px-1 bg-myColor-100  flex-col justify-center items-center" id="map">

        <div className="flex justify-center items-center">
        <input type="text" der="Sök efter bilder här..."
               className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
               id="searchBox"
               value={query}
               onChange={(e) => setQuery(e.target.value)} />

          <button
              className="px-4 py-2 ml-2 text-white bg-myColor-700 rounded-full hover:bg-myColor-300 focus:outline-none"
              onClick={searchFunction}
          >
            Sök
          </button>

        </div>
        {/*<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={SelectedImages} />*/}

        <h2 className="text-2xl font-bold mt-12 mb-4">Sökta bilder</h2>
        {searchedImages.map((image) => {
          return (
              <li key={image.id} className="flex flex-col items-center">
                <div className="aspect-w-2 aspect-h-4">
                  <Image width={image.width} height={image.height} src={image.image} alt="hej" className="object-cover" />
                </div>
                <Link href={image.id} className="container mx-auto px-1 mt-2 text-current font-semibold text-c">
                  <h1>{image.title}</h1>
                </Link>
              </li>
          );
        })}

      <h2 className="text-2xl font-bold mt-12 mb-4">Alla bilder</h2>

      <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-6 gap-x-6 gap-y-8">
        {images.map((image) => {
          allImages = images;
          return (
            <li key={image.id} className="flex flex-col items-center">
              <div className="aspect-w-2 aspect-h-4">
                <Image width={image.width} height={image.height} src={image.image} alt="hej" className="object-cover" />
              </div>
              <Link href={`${image.id}`} className="container mx-auto px-1 mt-2 text-current font-semibold text-c">
                <h1>{image.title}</h1>
              </Link>
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

export function reloadFunction(){
  location.reload();
}

export async function getStaticProps() {
  const query = getQuery();
  let images = [];
  // if(!query) {
    const results = await search({expression: ''});
    const {resources} = results;
    images = mapImageResources(resources);
  // } else if(query){
  //   images = searchFunction();
  // }
  return {
    props: {
      images,
      totalCount: images.length,
    },
  };
}

export function compareStrings(s1, s2){
  if(s1 == s2){
    return true;
  }
  return false;
}
//
// export function searchFunction() {
//   const query = getQuery();
//   let i = 0;
//   let selectedImages = [];
//   console.log(allImages);
//
//   var result = allImages.filter(obj => {
//     if (compareStrings(query.toUpperCase(), obj.title.toUpperCase())) {
//       return obj;
//     } else if (obj.tags.includes(query)) {
//       return obj;
//     }
//   })
//   selectedImages = result;
//   console.log(selectedImages);
//   return selectedImages;
//   // const returnString = "  <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={SelectedImages} />\n" +
//   //     "\n" +
//   //     "  \n" +
//   //     "      <h2 className=\"text-2xl font-bold mt-12 mb-4\">Bilder</h2>\n" +
//   //     "  \n" +
//   //     "      <ul className=\"grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-6 gap-x-6 gap-y-8\">\n" +
//   //     "        {select.map((image) => {\n" +
//   //     "          allImages = images;\n" +
//   //     "          return (\n" +
//   //     "            <li key={image.id} className=\"flex flex-col items-center\">\n" +
//   //     "              <div className=\"aspect-w-2 aspect-h-4\">\n" +
//   //     "                <Id width={image.width} height={image.height} src={image.image} alt=\"hej\" className=\"object-cover\" />\n" +
//   //     "              </div>\n" +
//   //     "              <a href={image.title} className=\"container mx-auto px-1 mt-2 text-current font-semibold text-c\">\n" +
//   //     "                <h1>{image.title}</h1>\n" +
//   //     "              </a>\n" +
//   //     "            </li>\n" +
//   //     "          );\n" +
//   //     "        })}\n" +
//   //     "      </ul>"
//   // return (
//   //     returnString
//   // )
//
//  // return {
//  //   props: {
//  //     selectedImages,
//  //     totalCount: selectedImages.length,
//  //   },
//  // }
// }

export function clickedImage(image){
  let i = 0;
  let clicked;
  console.log(image);

  var result = allImages.filter(obj => {
    if(compareStrings(image.toUpperCase(), obj.title.toUpperCase()))
      return obj;
  })
  clicked = result;
  console.log(clicked);
  return clicked;

}

export function changeIt(){


}