import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { ErrorPage } from "next/error";
import { ImageProps } from "@/helpers/types";

const Home = ({ currentPhoto }) => {
  const router = useRouter();
  const { photoId } = router.query
  let index = Number(photoId)

  const { asset_id, name, uploaded_at: date, photoUrl } = currentPhoto;
  
  const currentPhotoUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`

  if (!router.isFallback && !photoUrl) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div>
      <Head><meta property="og:image" content={currentPhotoUrl} />
      <div className="Imagecontainer">
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
            <Image width={960} priority height={540} src={photoUrl} alt={name} />
          </>
        )}
      </div>
      <div className="Imagecontainer">Name: {name}</div>
      <div className="Imagecontainer">Artikelnummer: {asset_id}</div>
      <div className="Imagecontainer">Datum: {date}</div>
      <div className="Imagecontainer">
      </div>
      </Head>
    </div>
  );
}

export default Home;

export async function getStaticProps() {
  const results = await getResults()  

  let reducedResults = ImageProps
  let i = 0

  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    })
    i++
  }

  const currentPhoto = reducedResults.find(
    (img) => img.id === Number(context.params.photoId)
  )


  return {
    props: {
      currentPhoto: currentPhoto,
    },
  }
}

/*
  try {
    const public_id = params.id;
    const results = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image/${public_id}`
    );
    const photoData = await results.json();

    if (!photoData.url) {
      return {
        notFound: true,
      };
    }

    const photoUrl = photoData.url;
    const name = photoData.filename;
    const date = photoData.created_at;

    return {
      props: { photoUrl, name, date },
    };
  } catch (error) {
    console.log("Error fetching photo data:", error);
    return {
      notFound: true,
    };
  }
}
*/

export async function getStaticPaths() {
  const results = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search/`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUDINARY_API_KEY + ":" + process.env.CLOUDINARY_API_SECRET
        ).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expression: "", // Empty string for expression
      }),
      method: "POST",
    }
  );
  let fullPaths = []
  for (let i = 0; i < results.resources.length; i++) {
    fullPaths.push({ params: { photoId: i.toString() } })
  }

  return {
    paths: fullPaths,
    fallback: false,
  }
}
