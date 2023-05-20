import {getAllImages} from "@/pages";
import {alertService} from "@/services/alert.service";


export const imageService = {
    getImage,
    addToBasket
};


async function getImage(id){
    const allImages = getAllImages();
    const result = await allImages.find(x => x.id === id);
    return result;
}

async function addToBasket(){
    let basket = [];
    // imageService.getImage(id)
    //     .then(x => basket.push(x))
    //     .catch(alertService.error)

    alertService.success("Din bild har lagts till i varukorgen!");
    console.log(basket);
    return basket;
}



