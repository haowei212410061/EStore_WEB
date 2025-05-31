export const dynamic = "force-dynamic";
import { Header } from "@/components/Header";

import Footer from "@/components/footer";
import OrderContainer from "@/components/pages/OrderContainer";
import { SingleOrderDetail } from "@/components/pages/SingleOrderDetail";

export default async function Page({ params }) {
  const OrderId = params.orderid;

  return (
    <div className="MenPage w-[100%] h-[100%]">
      <Header isHidden={true} />
      <div className="OrderPage mt-10 w-full h-full text-center mb-20">
        <SingleOrderDetail OrderId={OrderId}/>
      </div>
      <Footer />
    </div>
  );
}
