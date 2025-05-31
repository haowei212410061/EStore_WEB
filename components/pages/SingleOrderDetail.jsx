"use client";

import { GetOrderWithOrderId } from "@/graphql/ClientAPI/queryUtils";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import EmptyContent from "../EmptyContent";
import Image from "next/image";
import OrderProductCard from "./OrderProductCard";

export function SingleOrderDetail({ OrderId }) {
  const [orderResponse, SetOrderResponse] = useState({});

  useEffect(() => {
    const UserId = sessionStorage.getItem("userid");
    GetOrderWithOrderId({ userid: UserId, orderid: OrderId }).then((res) => {
      console.log(res.data[0]);
      SetOrderResponse(res.data[0]);
    });
  }, []);

  useEffect(() => {
    if (orderResponse.productlist) {
      orderResponse.productlist.forEach((item, index) => {
        console.log(item);
      });
    }
  }, [orderResponse]);

  return (
    <div className="cartContainer relative w-[80%] ml-60">
      <div className="flex justify-betweenborder-b-2 h-[60px]">
        <h1 className="text-2xl mr-2.5">訂單細節</h1>
      </div>
      <div className="flex font-bold border-b  bg-white  py-2">
        <h1 className="basis-2/6 text-l">訂單商品</h1>
        <p className="basis-1/5 text-l ">單價</p>

        <p className="basis-1/5 text-l mr-5">尺寸</p>
        <p className="basis-1/5 text-l">數量</p>
        <p className="basis-1/5 text-l">單一商品總金額</p>
      </div>

      <div className="cartContainer bg-white w-[100%] h-[130px] grid gap-3 overflow-y-auto">
        {orderResponse?.productlist?.length > 0 ? (
          orderResponse.productlist.map((product) => {
            return (
              <OrderProductCard
                key={`${product.productid}_${product.size}`}
                product={product}
              />
            );
          })
        ) : (
          <EmptyContent />
        )}
      </div>

      <div className="address bg-white mt-10 p-4  w-[100%] h-[100px]">
        <div className="address_container flex w-full h-[70px] items-center gap-15">
          <h1 className="text-xl ml-2 w-[100px]">付款方式</h1>
          <div className="flex gap-4 w-[400px]">
            <p className="text-xl">{orderResponse.paymentmethod?.split(",")[0]}</p>
          </div>
        </div>
      </div>

      <div className="address bg-white mt-10 p-4  w-[100%] h-[100px]">
        <div className="address_container flex w-full h-[70px] items-center gap-15">
          <h1 className="text-xl ml-2 w-[100px]">宅配地址</h1>
          <div className="flex gap-4 w-[400px]">
            <p className="text-xl">{orderResponse.address}</p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-row-reverse gap-2 mt-8 items-center">
        <div className="totalPrice">
          總金額 <strong className="text-red-500 text-xl">${orderResponse.totalprice}</strong>
        </div>
      </div>
    </div>
  );
}
