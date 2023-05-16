import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'


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
    <div class="grid grid-cols-[200px_minmax(900px,_1fr)_100px]">
      <Head>
        <title>My Images</title>
        <meta name="description" content="All of my cool images." />
      </Head>
  
      <div className="container mx-auto px-4">
        <h1 className="sr-only">My Images</h1>
  
        <h2 className="text-2xl font-bold mb-4">Folders</h2>
  
        <ul className=".folder" onClick={handleOnFolderClick}>
          {folders.map(folder => {
            const isActive = folder.path === activeFolder;
            return (
              <li key={folder.path} data-active-folder={isActive}>
                <button className="px-5" data-folder-path={folder.path}>
                  { folder.name }
                </button>
              </li>
            )
          })}
        </ul>
  
        <h2 className="text-2xl font-bold mt-12 mb-4">Images</h2>
  
        <ul className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-4 gap-4">
          {images.map(image => {
            return (
              <li key={image.id}>
                <a href={image.link} rel="noreferrer" className="block">
                  <div class="imageImage">
                    <Image width={image.width} height={image.height} src={image.image} alt="" />
                  </div>
                  <h3 className="mt-2 text-base font-medium text-gray-900">
                    { image.title }
                  </h3>
                </a>
              </li>
            )
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
    </div>
  )
  
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