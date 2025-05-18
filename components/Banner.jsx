import Image from "next/image";
import bannerImg from "@/public/banner2.jpg";


export default function Banner() {
  return (
    <div className="mx-auto w-full h-[450px] bg-white rounded-xl shadow-md">
      <div className="relative w-full h-full">
        <Image
          src={bannerImg}
          alt="Maroon Edition Hoodie"
          className="object-cover"
          fill
          sizes="(max-width: 1245px) 100vw, 1245px"
        />
      </div>
    </div>
  );
}
