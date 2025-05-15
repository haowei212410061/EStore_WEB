import Image from "next/image";
import bannerImg from "@/public/banner2.jpg";

export default function Banner() {
  return (
    <div className="mx-auto mt-8 w-[85%] h-[450px] bg-white rounded-xl shadow-md p-6">
      <div className="relative w-full h-full">
        <Image
          src={bannerImg}
          alt="Maroon Edition Hoodie"
          className="rounded-lg object-cover"
          fill
          sizes="(max-width: 1245px) 100vw, 1245px"
        />
      </div>
    </div>
  );
}
