import Image from "next/image";
import {mapImageResources, search} from "@/helpers/cloudinary";
import {getQuery} from "@/components";
import {getAllImages, searchFunction} from "@/pages/index";

let images = [];

export default function SelectedImages(){
    const imagesToShow = getImages();

return(
    <div>
    <h2 className="text-2xl font-bold mt-12 mb-4">Bilder</h2>

<ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-6 gap-x-6 gap-y-8">
    {imagesToShow.map((image) => {
        return (
            <li key={image.id} className="flex flex-col items-center">
                <div className="aspect-w-2 aspect-h-4">
                    <Image width={image.width} height={image.height} src={image.image} alt="hej" className="object-cover" />
                </div>
                <a href={image.title} className="container mx-auto px-1 mt-2 text-current font-semibold text-c">
                    <h1>{image.title}</h1>
                </a>
            </li>
        );
    })}
</ul>
</div>
)}

// export function setImages(input){
//     images = input;
// }
//
// function getImages(){
//     return images;
// }
async function getStaticProps() {
   const images = searchFunction();
    return {
        props: {
            images,
            totalCount: images.length,
        },
    };
}