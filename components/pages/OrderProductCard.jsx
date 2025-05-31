import Image from "next/image";

export default function OrderProductCard({product}) {
  return (
    <div
      key={`${product.productid}_${product.size}`}
      className="flex items-center border-b py-4"
    >
      <div className="basis-2/6 flex gap-2 justify-center items-center">
        <Image src={product.image} alt="商品圖片" width={80} height={80} />
        <div className="productTitle w-[160px] grid text-start">
          <p className="text-m">{product.title}</p>
          <p className="text-gray-500">{product.category}</p>
        </div>
      </div>

      <p className="basis-1/11 ml-2 text-center">${product.price}</p>
      <p className="basis-1/4 text-center">{product.size}</p>
      <p className="basis-1/7 text-xl w-8 pt-0.5">{product.productcount}</p>

      <p className="text-xl basis-1/5">
        {product.price * product.productcount}
      </p>
    </div>
  );
}
