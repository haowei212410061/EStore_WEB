import SizeSelector from "@/components/SizeButtons";
import { FetchProductWithCategory } from "@/graphql/ClientAPI/queryUtils";
import Image from "next/image";
import { Header } from "@/components/Header";
import Footer from "@/components/footer";

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
        <div className="CardContent mt-3.5 m-auto mb-20 flex flex-1/2 gap-6 w-[70%] h-[90%]">
          <div className="imageContent relative  w-[60%] h-[100%]">
            <Image
              className="object-cover"
              src={singleProduct[0].image}
              fill
              alt={singleProduct[0].description}
            />
          </div>
          <div className="descriptionContent w-[60%] h-[100%]">
            <h2 className="block text-5xl h-[150px] mt-7 mb-2">
              {singleProduct[0].title}
            </h2>
            <p className=" text-3xl mb-10">${singleProduct[0].price}</p>
            <SizeSelector />
            <button className="bg-black w-[300px] mt-5 h-[50px] hover:bg-gray-300 hover:cursor-pointer hover:text-black text-white">
              加入購物車
            </button>
            <div className="mt-6 text-sm text-gray-600 border-t pt-4">
              ⚠️ <strong>注意事項：</strong>
              <br />
              商品圖片因螢幕顯示可能與實際顏色略有差異，請以實品為準。
              <br />
              下單前請再次確認尺寸、顏色及數量，訂單成立後將無法更改。
              <br />
              若有瑕疵或錯誤寄送，請於收到商品 7 日內聯繫客服處理。
              <br />
              商品為限量供應，售完即止，恕不另行通知。
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
