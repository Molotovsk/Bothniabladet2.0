import Image from "next/image";
import Link from "next/link";

export default function Gallery({ photoUrl, title, id }) {
  return (
    <div>
      <Link href="/preview/[id]" as={`/preview/${id}`}>
        <Image
          width={800}
          height={800}
          src={photoUrl}
          alt="Bilden"
          title={title}
        />
      </Link>
    </div>
  );
}
