import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react';
import styles from "../styles/Home.module.css";
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'


export default function Home({ photos }) {
  const router = useRouter()
  const { photoId } = router.query
  const [search, setSearch] = useState("");
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

  const lastViewedPhotoRef = useRef(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto])

  const handleSearch = async () => {
    console.log('Search expression:', search); // Log the search expression before making the API call

    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search/images`, {
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        expression: search
      }),
      method: 'POST'
    });
    
    const details = await response.json();
    console.log('API response:', details); // Log the API response to check if it contains the expected results
    setPhotos(details.resources);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Photo Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <input
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
          type="text"
          placeholder="Search for an image"
        />
        <button className="button" onClick={handleSearch}>
          Find
        </button>
        <div className={styles.fade}>
          <div className={styles.gridContainer}>
              {photos.map(({ id, public_id, format }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/preview/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}

              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt="Bothniabladets bilder"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                src={`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
          ))}
          </div>
        </div>
      </main>
    </div>
  );
}



export async function getStaticProps() {
  const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search/`, {
    headers: {
      Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      expression: ""
    }),
    method: 'POST'
  });
  const results = await response.json();
  //console.log(results);

  let reducedResults = [];

  let i = 0;

  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format
    });
    i++;
  }

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i]
  }
  
  return {
    props: {
      photos: reducedResults,
    },
  };
}
