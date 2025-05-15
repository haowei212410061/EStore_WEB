import { Header } from "@/components/Header";
import Image from "next/image";
import banner from "@/public/banner.png";
import Banner from "@/components/Banner";
export default function Home() {
  return (
    <div className="HomePage w-[100%] h-[100%]">
      <Header />
      <Banner />
    </div>
  );
}
