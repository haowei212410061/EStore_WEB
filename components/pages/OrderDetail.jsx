"use client"
import Link from "next/link";

export default function ({orderid,OrderStatus,paymentMethod,totalPrice}) {
  const paymentMethods = paymentMethod.split(',')
  return (
    <div className="grid gap-1 border-b h-[150px] py-4">
      <div className="orderid flex gap-2 w-full">
        <p>訂單編號</p>
        <Link
          href={`/Order/${orderid}`}
          className="w-[150px] h-[40px] flex justify-center items-center bg-blue-400 text-white hover:bg-blue-700 rounded-md  border-2"
        >
          {orderid}
        </Link>
      </div>

      <div className="orderid flex gap-2 w-full">
        <p>訂單狀態</p>
        <p>
          <strong>{OrderStatus}</strong>
        </p>
      </div>

      <div className="orderid flex gap-2 w-full">
        <p>付款方式</p>
        <p>
          <strong>{paymentMethods[0]}</strong>
        </p>
      </div>

      <div className="orderid flex gap-2 w-full">
        <p>總金額</p>
        <p>
          <strong className="ml-4">${totalPrice}</strong>
        </p>
      </div>
    </div>
  );
}
