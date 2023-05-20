import React, { useState } from 'react';
import {mapImageResources, search} from '../helpers/cloudinary';
import Home, {getStaticProps, reloadFunction, searchFunction} from "@/pages";
import {SelectedImages, selectedImages} from "@/pages/selectedImages"; // Import the search function from the cloudinary modulec

// const [query, setSearchQuery] = useState('');
let query;

function setQuery(input){
    query = input;
    console.log(query)
}
export function getQuery(){
    return query;
}
export function SearchBar() {

    // const handleSearch = async () => {
    //
    //     console.log.searchQuery
    //     // Perform the search with the searchQuery value
    //     const results = await search({
    //         expression: query,
    //     });
    //     console.log.searchQuery
    //
    //     // Process the search results
    //     const {resources} = results;
    //     const images = mapImageResources(resources);
    //
    //     // Do something with the images...
    //
    //
    //     console.log(images);
    // };

    return (
        <div className="flex justify-center items-center">
            <input
                type="text"
                placeholder="Sök efter bilder här..."
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <a href='/account/searchedPictures'> Sök </a>
            <button
                className="px-4 py-2 ml-2 text-white bg-myColor-700 rounded-full hover:bg-myColor-300 focus:outline-none"
                onClick={searchFunction}
            >
                Sök
            </button>
        </div>
    );
}