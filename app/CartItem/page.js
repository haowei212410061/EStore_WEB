export const dynamic = "force-dynamic";
import Footer from "@/components/footer";
import { Header } from "@/components/Header";
import CartItem from "@/components/pages/CartItem";
import { GetUserCartItem } from "@/graphql/ClientAPI/queryUtils";
import Head from "next/head";

export default async function page() {
  return (
    <div className="MenPage w-[100%] h-[100%]">
      <Header isHidden={true}/>
      <div className="ProductSection mt-10 w-full h-full text-center mb-20 ">
        <CartItem />
      </div>
      <Footer />
    </div>
  );
}
