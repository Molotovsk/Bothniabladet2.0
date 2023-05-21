import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Image from "next/image";

import loginImg from 'pages/assets/Bothniabladet.png'

import { userService, alertService } from 'services';
import {checkFields} from "@/components/Nav";
import {createSignature} from "@/helpers/generateCloudinarySignature";
import {useState} from "react";

export default imageupload;

function imageupload() {
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

        const timestamp = Math.round((new Date) / 1000);

        const form = event.currentTarget;
        const fileInput = Array.from(form.elements).find(({name}) => name === 'file')
        console.log(fileInput);

        const formData = new FormData();
        const tags = document.getElementById("tags").value;
        const photographer = document.getElementById("photographer").value;
        // const name = document.getElementById("name").value;
        const caption = document.getElementById("caption").value;
        const description = document.getElementById("description").value;
        const coordinates = document.getElementById("coordinates").value;
        const price = document.getElementById("price").value;
        const license = document.getElementById("license").value;

        for (const file of fileInput.files) {
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
        formData.append('context', 'alt=' + description + '|caption=' + caption + '|photographer=' + photographer + '|coordinates=' + coordinates + '|uploadDate=' + currentDate + '|price=' + price + '|license=' + license) ;


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


        const params = 'context=alt=' + description + '|caption=' + caption + "|photographer=" + photographer + '|coordinates=' + coordinates + '|uploadDate=' + currentDate + '|price=' + price + '|license=' + license + "&media_metadata=true" + "&tags=" + tags + "&timestamp=" + timestamp + "&upload_preset=" + uploadSigned;
        const signature = createSignature(params);


        const data = await fetch('https://api.cloudinary.com/v1_1/' + cloudinaryAdam + '/image/upload?api_key=518316254137456&timestamp=' + timestamp + '&signature=' + signature, {
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

        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="card-header m-8 font-['Arial'] text-2xl mt-16">Ladda upp bilder</h1>
            <div className="card-body justify-center">
                <form onSubmit={handleOnSubmit} className="justify-items-center" id="uploadForm">
                    <div className="flex flex-col pt-6 items-center justify-around mb-6">

                        <input id="file" type="file" name="file" className="mb-6" required={true}/>

                        <input id="caption" type="text" placeholder="Titel" className="mb-6" required={true}/>

                        <input id="description" type="text" placeholder="Beskrivning" className="mb-6" required={true}/>

                        <p> Vänligen separera taggarna med ett kommatecken </p>
                        <input id="tags" type="text" placeholder="Taggar" className="mb-6" required={true}/>

                        <input id="coordinates" type="text" placeholder="Koordinater" className="mb-6"/>

                        <input id="photographer" type="text" placeholder="Fotograf" className="mb-6"/>

                        <input id="price" type="text" placeholder="Pris" className="mb-6"/>

                        <input id="license" type="text" placeholder="License" className="mb-6"/>

                        {!uploadData && (
                    <button className="border-8 border-green-700 rounded-md bg-green-700" >
                        Ladda upp bilder
                    </button>
                            )}

                        {uploadData && (
                            <h4> Din bild har laddats upp! </h4>
                        )}
                        {/*{uploadData && (*/}
                        {/*    <code>*/}
                        {/*        <pre>{JSON.stringify(uploadData, null, 2)}</pre>*/}
                        {/*    </code>*/}
                        {/*)}*/}
                        {/*{uploadData && (*/}
                        {/*    <Link href="/account/imageUpload" className="border-8 border-green-700 rounded-md bg-green-700" >*/}
                        {/*        Ladda upp en till*/}
                        {/*    </Link>*/}
                        {/*)}*/}

                    </div>
                </form>
                {uploadData && (
                    <button onClick={clearForm} className="border-8 border-green-700 rounded-md bg-green-700" >
                        Ladda upp en till
                    </button>
                )}
            </div>
        </div>

    )

}

export function clearForm(){
    document.getElementById("uploadForm").reset();
    location.reload();
}