import Image from "next/image";
export default function ({
  productCard,
  handleChangeFunc,
  productCount,
  uniqueId,
}) {
  return (
    <>
      <div className="basis-2/6 flex gap-2 justify-center items-center">
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
      <p className="text-xl ml-20">
        {productCard.price * productCount[uniqueId]}
      </p>
    </>
  );
}
