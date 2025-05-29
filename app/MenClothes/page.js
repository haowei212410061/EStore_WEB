import { Header } from "@/components/Header";
import ProductList from "@/components/CardList";
import {
  FetchAllProduct,
  FetchProductWithCategory,
} from "@/graphql/ClientAPI/queryUtils";
import Footer from "@/components/footer";

export default async function Page() {
  const products = await FetchProductWithCategory({
    column: "category",
    info: "mens clothing",
  });

  console.log(products);

  return (
    <div className="MenPage w-[100%] h-[100%]">
      <Header isHidden={true}/>
      <div className="ProductSection mt-10 w-full text-center mb-20">
        <h2 className="w-[1000px] m-auto text-2xl mb-5">男裝 - 熱銷排行榜</h2>
        <ProductList productData={products} />
      </div>
      <Footer />
    </div>
  );
}
