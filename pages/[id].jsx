import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { compareStrings, getAllImages } from "@/pages/index";
import { imageService } from "@/services/image.service";
import { alertService } from "@/services";
import { CldImage } from 'next-cloudinary';

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
      .catch(alertService.error);
  }, [router]);

  console.log(image);

  function addToBasket() {
    if (!basketContains(image.id)) {
      imageService.getImage(image.id)
        .then(x => basket.push(x))
        .catch(alertService.error);
      alertService.success("Din bild har lagts till i varukorgen!");
      console.log(basket);
    } else {
      alertService.error("Du har redan den här bilden i din varukorg");
      console.log(basket);
    }
  }

    // let imageHeight = image.height;
    // let imageWidth = image.width;
    // let imageSrc = image.image;
    // //
    // console.log(imageHeight);
    // console.log(imageWidth);
    // console.log(imageSrc);


    if (image) {
      return (
        <div className="flex flex-col items-center justify-start min-h-screen pt-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4"> {image.title} </h2>
            <div className="relative">
              <CldImage
                className="mx-auto max-w-full"
                src={image.image}
                alt="hej"
                cloudName="dmhozrlru"
                width={image.width}
                height={image.height}
                crop="scale"
                overlays={[{
                  crop: 'fit',
                  text: {
                    color: 'white',
                    fontFamily: 'Source Sans Pro',
                    fontSize: 80,
                    fontWeight: 'bold',
                    text: 'Bothniabladet'
                  },
                  effects: [
                    {
                      shear: '40:0',
                      opacity: 70
                    }
                  ]
                }]}
              />
                <ul className="mx-20 mt-4">
                <li>
                  <strong>Beskrivning:</strong> {image.alt}
                </li>
                <li>
                  <strong>Taggar:</strong> {image.tags.join(', ')}
                </li>
                <li>
                  <strong>Dimensioner:</strong> {image.width} x {image.height}
                </li>
                <li>
                  <strong>Fotograf:</strong> {image.photographer_name}
                </li>
                <li>
                  <strong>Licens:</strong> {image.license}
                </li>
                <li>
                  <strong>Pris:</strong> {image.price}
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <button className="btn btn-sm btn-primary" onClick={addToBasket}>
                Lägg till i varukorg
              </button>
            </div>
          </div>
        </div>
    );
  }
}

export function getBasket() {
  return basket;
}

export function clearBasket() {
  basket.length = 0;
}

export function basketContains(id) {
  const basket = getBasket();
  let result = false;
  var output = basket.filter(obj => {
    if (id === obj.id) {
      result = true;
    }
  });
  return result;
}