import { Header } from "@/components/Header";
import Banner from "@/components/Banner";
import { AboutUsContent, ContactUs, BrandContent } from "@/lib/LocalData";
import ProductList from "@/components/CardList";
import AboutCard from "@/components/AboutCard";
import { FetchAllProduct } from "@/graphql/ClientAPI/queryUtils";

export default async function Home() {
  const Products = await FetchAllProduct();

  return (
    <div className="HomePage w-[100%] h-[100%]">
      <Header />
      <Banner />

      <div className="ProductSection mt-10 w-full h-[500px] text-center">
        <h2 className="w-[1000px] m-auto text-2xl mb-5">
          You Might Also Likes
        </h2>
        <ProductList
          productData={Products.filter(
            (product) => product.category === "mens clothing"
          ).slice(0,4)}
        />
      </div>

      <div className="Introduction w-full h-[400px] m-auto text-center">
        <h2 className="w-[1000px] m-auto text-2xl mb-5">
          Have Question ? We Can Help you
        </h2>

        <div className="section_list w-full gap-3 h-[300px] flex justify-center ">
          <AboutCard title={"About Us"} content={AboutUsContent} />
          <AboutCard title={"Contact Us"} content={ContactUs} />
          <AboutCard title={"Brand Concept"} content={BrandContent} />
        </div>
      </div>
    </div>
  );
}
