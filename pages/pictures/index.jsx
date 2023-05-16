
import styles from '/styles/Home.module.css'
import { useState } from "react";
import Head from "next/head";
import {createSignature} from "../../helpers/generateCloudinarySignature";
export default function Home() {
    const [imageSrc, setImageSrc] = useState();
    const [uploadData, setUploadData] = useState();

    /**
     * handleOnSubmit
     * @description Triggers when the main form is submitted
     */

    const cloudinaryAdam = "dmhozrlru";
    const cloudinaryElla = "dgbatwabz";
    const uploadAdam = "tcsyqjkq";
    const uploadELla ='my-uploads';
    const uploadSigned = "ml_default";
    const API_KEY = "743315572255242";
    const API_SECRET = "MqyeLqqS8jZb-C0eLKBXH5RbQmc";

    async function handleOnSubmit(event) {
        event.preventDefault();

        const timestamp = Math.round((new Date)/1000);

        const form = event.currentTarget;
        const fileInput = Array.from(form.elements).find(({name}) => name === 'file')
        console.log(fileInput);

        const formData = new FormData();
        const tags = document.getElementById("tags").value;
        const photographer = document.getElementById("photographer").value;
        // const name = document.getElementById("name").value;
        const caption = document.getElementById("caption").value;
        const description = document.getElementById("description").value;
        const coordinates= document.getElementById("coordinates").value;

        for( const file of fileInput.files){
            formData.append('file', file);
        }

        const media_metadata = true;

        //create date for uploading image
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;

        formData.append('upload_preset', uploadSigned);
        formData.append('tags', tags);
        formData.append('media_metadata', media_metadata);
        formData.append('photographer_name', photographer);
        // formData.append('filename_override', name);
        // formData.append('api_key', API_KEY);
        // formData.append('timestamp', timestamp);
        formData.append('context', 'alt=' + description + '|caption=' + caption + '|photographer=' + photographer + '|coordinates=' + coordinates + '|uploadDate=' + currentDate );


        const parameters = {
            media_metadata: true,
            // metadata: {
            //     external_id: "photographer_name",
            //     value: photographer,
            // },
            tags: tags,
            timestamp: timestamp,
            upload_preset: uploadSigned
        }
        //
        // const para = JSON.stringify(parameters)
        // const params = JSON.parse(para);


        const params = 'context=alt=' + description + '|caption=' + caption + "|photographer=" + photographer + '|coordinates=' + coordinates + '|uploadDate=' + currentDate + "&media_metadata=true" +"&tags=" + tags+ "&timestamp=" + timestamp + "&upload_preset=" + uploadSigned ;
        const signature = createSignature(params);


        const data = await fetch('https://api.cloudinary.com/v1_1/dgbatwabz/image/upload?api_key=743315572255242&timestamp=' + timestamp+ '&signature=' + signature, {
            method: 'POST',
            body: formData,
            media_metadata: true,
            photographer_name: photographer,
            // apiKey: API_KEY,
            // uploadSignature: signature

        }).then(r => r.json());

        setImageSrc(data.secure_url);
        setUploadData(data);

        console.log('data', data);

    }


        return (
            <div className={styles.container}>
                <Head>
                    <title>Image Uploader</title>
                    <meta name="description" content="Upload your image to Cloudinary!"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Ladda upp bild
                    </h1>

                    <p className={styles.description}>
                        Ladda upp dina bilder till Cloudinary.
                    </p>

                    <form className={styles.form} method="post"
                        // onChange={handleOnChange}
                          onSubmit={handleOnSubmit}>
                        <p>
                            <input type="file" id="file" name="file" required={true}/>
                        </p>

                        {/*<p>*/}
                        {/*    <input type="text" id="name" placeholder={"Title"} required={true}/>*/}
                        {/*</p>*/}

                        <p>
                            <input type="text" id="caption" placeholder={"Caption"} required={true}/>
                        </p>

                        <p>
                            <input type="text" id="description" placeholder={"Description"} required={true}/>
                        </p>

                        <p>
                            <input type="text" id="tags" placeholder={"Tags"} required={true}/>
                        </p>

                        <p>
                            <input type="text" id="coordinates" placeholder={"GPS coordinates"}/>
                        </p>

                        <p>
                            <input type="text" id="photographer" placeholder={"Photographer"}/>
                        </p>


                        {/*<img src={imageSrc} />*/}

                        {!uploadData && (
                            <p>
                                <button>Upload Files</button>
                            </p>
                        )}

                        {uploadData && (
                            <h4> Bilddata: </h4>
                        )}
                        {uploadData && (
                            <code>
                                <pre>{JSON.stringify(uploadData, null, 2)}</pre>
                            </code>
                        )}
                    </form>
                </main>

            </div>
        )

    }
