"use client";
import { Header } from "@/components/Header";
import Banner from "@/components/Banner";
import { AboutUsContent, ContactUs, BrandContent } from "@/lib/LocalData";
import ProductList from "@/components/CardList";
import AboutCard from "@/components/AboutCard";
import { FetchAllProduct } from "@/graphql/ClientAPI/queryUtils";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { Fragment } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState([]);
  const [isSearchProduct, setProductState] = useState(false);

  useEffect(() => {
    FetchAllProduct().then((res) => {
      console.log(res);
      setProducts(res);
      setProductState(false);
      setSearchProduct([]);
    });
  }, []);

  function searchProductFunc(productlist, searchData) {
    if (!searchData || searchData.trim() === "") {
      // 若搜尋欄清空，恢復原始產品列表
      setProductState(false);
      setSearchProduct([]);
      return;
    }

    setProductState(true);

    const result = productlist.filter((item) =>
      item.title.includes(searchData)
    );

    setSearchProduct(result);
  }

  return (
    <div className="HomePage w-[100%] h-[100%]">
      <Header setSearchFunc={searchProductFunc} productList={products} />

      {isSearchProduct ? (
        <Fragment>
          <h1 className="result text-2xl mt-4 ml-30 mb-10">查詢結果</h1>

          <ProductList productData={searchProduct} />
        </Fragment>
      ) : (
        <Banner />
      )}

      <div
        className="ProductSection mt-10 w-full h-[500px] text-center"
        style={{ display: isSearchProduct ? "hidden" : "block" }}
      >
        <h2 className="w-[1000px] m-auto text-2xl mb-5">
          You Might Also Likes
        </h2>
        <ProductList
          productData={products
            .filter((product) => product.category === "mens clothing")
            .slice(0, 4)}
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
      <Footer />
    </div>
  );
}
