import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {compareStrings, getAllImages} from "@/pages/index";
import {imageService} from "@/services/image.service";
import {alertService} from "@/services";

export default Image;
let chosenImage;
let basket = [];
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

    function addToBasket(){
        if((basketContains(image.id)) === false) {
            imageService.getImage(image.id)
                .then(x => basket.push(x))
                .catch(alertService.error)
            alertService.success("Din bild har lagts till i varukorgen!");
            console.log(basket);
        }else{
        alertService.error("Du har redan den här bilden i din varukorg")
        console.log(basket);}
    }

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
            <div>
                <h2 className="text-2xl font-bold mt-12 mb-4 mx-20"> {image.title} </h2>
                <img width={image.width} height={image.height} src={image.image} alt="hej" className="object-cover mx-20"/>
                <h2 className="mx-20 mt-4"> Beskrivning: {image.alt} </h2>
                <h2 className="mx-20 mt-4"> Taggar: {image.tags.toString()} </h2>
                <h2 className="mx-20 mt-4"> Dimensioner: {image.height} x {image.height}  </h2>
            </div>

            <div>
                <button className="btn btn-sm btn-primary me-1 mx-20 mt-4" onClick={addToBasket}> Lägg till i varukorg </button>
            </div>
            </div>
        );
    }
}

export function getBasket(){
    return basket;
}

export function clearBasket(){
    basket.length = 0;
}

export function basketContains(id){
    const basket = getBasket();
    let result = false;
    var output = basket.filter(obj => {
        if(id === obj.id) {
            result = true;
        }
    })
    return result;
}