import Image from "next/image";
import Link from "next/link";
export default function Gallery({ thumbnailUrl, title, id }) {
  return (
    <div>
      <Link as={`/preview/${id}`} href="/preview/[id]">
        <a>
          <Image width={600} height={600} src={thumbnailUrl} />
          <div className="photoid"> {title}</div>
        </a>
      </Link>
    </div>
  );
}