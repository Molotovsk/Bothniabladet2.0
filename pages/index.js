import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'

import { SearchBar } from 'components/SearchBar';
import ImageModal from 'components/ImageModal';

import { search, mapImageResources, getFolders } from '../helpers/cloudinary';


export default function Home({ images: defaultImages, nextCursor: defaultNextCursor, totalCount: defaultTotalCount, folders }) {
  const [images, setImages] = useState(defaultImages);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  const [totalCount, setTotalCount] = useState(defaultTotalCount);
  const [activeFolder, setActiveFolder] = useState();

  async function handleOnLoadMore(e) {
    e.preventDefault();

    const results = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({
        expression: `folder=""`,
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

  function handleOnFolderClick(e) {
    const folderPath = e.target.dataset.folderPath;
    setActiveFolder(folderPath)
    setNextCursor(undefined);
    setImages([]);
    setTotalCount(0);
  }

  useEffect(() => {
    (async function run() {
      const results = await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({
          expression: `folder="${activeFolder || ''}"`
        })
      }).then(r => r.json());

      const { resources, next_cursor: nextPageCursor, total_count: updatedTotalCount } = results;

      const images = mapImageResources(resources);

      setImages(images);
      setNextCursor(nextPageCursor);
      setTotalCount(updatedTotalCount);
    })();
  }, [activeFolder]);

  return (
    <div className="min-h-screen mx-auto px-1 bg-myColor-100  flex-col justify-center items-center">
      <SearchBar />
      <h2 className="text-2xl font-bold mb-4">Folders</h2>
  
      <ul className=".folder" onClick={handleOnFolderClick}>
        {folders.map((folder) => {
          const isActive = folder.path === activeFolder;
          return (
            <li key={folder.path} data-active-folder={isActive}>
              <button className="px-5" data-folder-path={folder.path}>
                {folder.name}
              </button>
            </li>
          );
        })}
      </ul>
  
      <h2 className="text-2xl font-bold mt-12 mb-4">Images</h2>
  
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
          <Button onClick={handleOnLoadMore} className="w-full">
            Load More Results
          </Button>
        </div>
      )}
    </div>
  );
  
  
}

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
}