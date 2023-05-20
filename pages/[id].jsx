import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {compareStrings, getAllImages} from "@/pages/index";
import {imageService} from "@/services/image.service";
import {alertService} from "@/services";

export default Image;
let chosenImage;
function Image() {
    const router = useRouter();
    const [image, setImage] = useState(null);

    let allImages = [];
    allImages = getAllImages();

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // fetch user and set default form values if in edit mode
       imageService.getImage(id)
            .then(x => setImage(x))
            .catch(alertService.error)
    }, [router]);

    console.log(image);

    // let imageHeight = image.height;
    // let imageWidth = image.width;
    // let imageSrc = image.image;
    // //
    // console.log(imageHeight);
    // console.log(imageWidth);
    // console.log(imageSrc);

    if(image) {
        return (
            <div>
                <h1>Bild</h1>
                <img width={image.width} height={image.height} src={image.image} alt="hej" className="object-cover"/>
            </div>
        );
    }
}

