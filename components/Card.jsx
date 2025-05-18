import Image from "next/image";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

export default function ProductCard({
  id,
  imageUrl,
  ProductTitle,
  ProductPrice,
}) {
  return (
    <div className="card w-[300px] bg-white hover:shadow-2xl rounded-lg overflow-hidden">
      <Link href={`/product/${id}`}>
        <div className="relative w-full h-[300px]">
          <Image
            alt="product image"
            src={imageUrl}
            fill
            className="object-contain p-4"
          />
        </div>
      </Link>
      <section className="flex flex-col justify-between px-4 py-3 h-[100px]">
        <h3 className="text-sm font-medium line-clamp-2">{ProductTitle}</h3>
        <div className="flex justify-between items-center text-sm">
          <p>NT${ProductPrice}</p>
          <ShoppingCartIcon className="w-5 h-5 text-gray-600" />
        </div>
      </section>
    </div>
  );
}
