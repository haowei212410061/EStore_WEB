import SizeSelector from "@/components/SizeButtons";
import { FetchProductWithCategory } from "@/graphql/ClientAPI/queryUtils";
import Image from "next/image";
import { Header } from "@/components/Header";
import Footer from "@/components/footer";
import ProductClientContainer from "@/components/pages/ProductCardContainer";
export default async function ProductPageWithId({ params }) {
  const productId = params.id;
  const singleProduct = await FetchProductWithCategory({
    column: "productid",
    info: productId,
  });
  console.log("單一卡片資訊:", singleProduct);
  return (
    <>
      <div className="singleProductContainer w-[100%] h-[100%]">
        <Header />
        <ProductClientContainer product={singleProduct[0]} />
        <Footer />
      </div>
    </>
  );
}
