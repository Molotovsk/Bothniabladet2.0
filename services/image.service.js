import {getAllImages} from "@/pages";


export const imageService = {
    getImage
};


async function getImage(id){
    const allImages = getAllImages();
    const result = await allImages.find(x => x.id === id);
    return result;
}
