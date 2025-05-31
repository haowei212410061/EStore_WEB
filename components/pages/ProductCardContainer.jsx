"use client";

import Image from "next/image";
import SizeSelector from "@/components/SizeButtons";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PostCartItem } from "@/graphql/ClientAPI/mutationUtils";
import { nanoid } from "nanoid";
import { User } from "lucide-react";

export default function ProductClientContainer({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [token, SetToken] = useState("");

  useState(()=>{
    const UserToken = sessionStorage.getItem("token")
    SetToken(UserToken)
  },[])



  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("請先選擇尺寸！");
      return;
    }
    const userId = sessionStorage.getItem("userid");
    const cartItem = {
      userid: userId,
      cartid: `${nanoid().slice(0, 4)}_${nanoid().slice(0, 4)}_${nanoid().slice(
        0,
        4
      )}`,
      productid: product.productid,
      productcount: 1,
      size: selectedSize,
    };
    const res = await PostCartItem(cartItem);

    if (res.status === 200) {
      toast.success(res.message);
    }
  };

  return (
    <div className="CardContent mt-3.5 m-auto mb-20 flex flex-1/2 gap-6 w-[70%] h-[90%]">
      <div className="imageContent relative w-[60%] h-[100%]">
        <Image
          className="object-cover"
          src={product.image}
          fill
          alt={product.description}
        />
      </div>
      <div className="descriptionContent w-[60%] h-[100%]">
        <h2 className="block text-5xl h-[150px] mt-7 mb-2">{product.title}</h2>
        <p className=" text-3xl mb-10">${product.price}</p>

        <SizeSelector
          onSelectFunc={handleSizeSelect}
          selectedSize={selectedSize}
        />

        <button
          className={`bg-black w-[300px] mt-5 h-[50px] hover:bg-gray-300 hover:cursor-pointer hover:text-black text-white ${
            !token
              ? "bg-gray-300 opacity-50 pointer-events-none"
              : "bg-gray-600 hover:bg-gray-400 cursor-pointer"
          }`}
          onClick={handleAddToCart}
        >
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
  );
}
