import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { SearchBar } from 'components/SearchBar';
import { search, mapImageResources } from '../helpers/cloudinary';
import Gallery from "../components/ImageDetail";


export default function Home({ stuff }) {
  const [photos, setPhotos] = useState(stuff);
  const [search, setSearch] = useState("");
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
        ></input>
        <button
          className="button"
          disabled={search === ""}
          onClick={async () => {
            const results = await fetch(
              `http://localhost:1337/api/photos?populate=*&filters\[name\][$eq]=${search}`
            );
            const details = await results.json();
            setPhotos(await details);
          }}
        >
          Find
        </button>
        <div className={styles.fade}>
          <div className={styles.gridContainer}>
            {photos &&
              photos.data.map((detail) => (
                <Gallery
                  key={detail.id}
                  thumbnailUrl={detail.attributes.img.data.attributes.formats.thumbnail.url}
                  title={detail.attributes.name}
                  id={detail.id}
                />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
export async function getStaticProps() {
  const results = await fetch("http://localhost:1337/api/photos?populate=*");
  const stuff = await results.json();
  return {
    props: { stuff },
  };
}