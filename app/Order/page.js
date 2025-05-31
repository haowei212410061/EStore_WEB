export const dynamic = "force-dynamic";
import { Header } from "@/components/Header";

import Footer from "@/components/footer";
import OrderContainer from "@/components/pages/OrderContainer";

export default async function Page() {
  return (
    <div className="MenPage w-[100%] h-[100%]">
      <Header isHidden={true} />
      <div className="OrderPage mt-10 w-full h-full text-center mb-20">
        <OrderContainer />
      </div>
      <Footer />
    </div>
  );
}
