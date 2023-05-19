import Image from "next/image"

const Images = ({ images }) => {
  return (
    <>
      {images.map(image => (
        <div className="flex p-3 gap-4 my-3 rounded-xl border-[1px] border-zinc-600 w-3/4">
          <div>
            <Image
              src={image.author.imageUrl || ""}
              alt="Bild"
              height={600}
              width={600}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold">{image.author.name}</span>
            <span className="text-lg font-light">{image.body}</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default Posts
