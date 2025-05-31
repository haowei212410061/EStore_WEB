import { DeleteSingleCartItem } from "@/graphql/ClientAPI/mutationUtils";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ({
  productCard,
  handleChangeFunc,
  productCount,
  uniqueId,
  userid,
  deleteCartItemFunc
}) {
  

  return (
    <>
      <div className="basis-2/7 flex gap-2 justify-center items-center">
        <Image src={productCard.image} alt="商品圖片" width={80} height={80} />
        <div className="productTitle w-[160px] grid text-start">
          <p className="text-m">{productCard.title}</p>
          <p className="text-gray-500">{productCard.category}</p>
        </div>
      </div>

      <p className="basis-1/6 text-center">${productCard.price}</p>
      <p className="basis-1/6 text-center">{productCard.size}</p>

      <div className="InputProductCount basis-1/6 text-center w-[60px]">
        <div className="inline-flex  border border-gray-300 ">
          <button
            className="text-2xl border-2"
            onClick={() => handleChangeFunc(uniqueId, "reduce")}
          >
            -
          </button>
          <p className="text-xl w-8 pt-0.5">{productCount[uniqueId]}</p>
          <button
            className="text-2xl border-2"
            onClick={() => handleChangeFunc(uniqueId, "increase")}
          >
            +
          </button>
        </div>
      </div>

      <p className="text-xl basis-1/6">
        {productCard.price * productCount[uniqueId]}
      </p>
      <div className="block basis-1/8 bg-gray-600 text-white w-[40px] text-center pt-1 h-[35px] rounded-sm hover:bg-gray-400 hover:cursor-pointer">
        <button
          onClick={() =>
            deleteCartItemFunc(userid, productCard.size, productCard.productid)
          }
        >
          刪除
        </button>
      </div>
    </>
  );
}
