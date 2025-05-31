"use client";

import { GetAllOrder } from "@/graphql/ClientAPI/queryUtils";
import { useEffect, useState } from "react";
import EmptyContent from "../EmptyContent";
import Link from "next/link";
import OrderDetail from "./OrderDetail";

export default function OrderContainer() {
  const [productlist, SetProductList] = useState([]);

  useEffect(() => {
    const userId = sessionStorage.getItem("userid");
    console.log(userId);
    GetAllOrder({ userid: userId }).then((res) => {
      console.log(res);
      SetProductList(res.data.reverse());
    });
  }, []);

  return (
    <div className="orderlist w-[70%] ml-60">
      <div className="flex justify-between border-b-2 h-[40px]">
        <h1 className="text-2xl mr-2.5">訂單一覽</h1>
        <h1 className="text-m text-gray-600">欲查看訂單細節 請點擊訂單編號右側按鈕</h1>
      </div>
      <div className="cartContainer w-[100%] h-[600px] grid gap-3 overflow-y-auto">
        {productlist.length > 0 ? (
          productlist.map((product) => {
            return (
              <OrderDetail
                key={product.orderid}
                orderid={product.orderid}
                OrderStatus={product.status}
                paymentMethod={product.paymentmethod}
                totalPrice={product.totalprice}
              />
            );
          })
        ) : (
          <EmptyContent message={"目前尚無訂單:)"} />
        )}
      </div>
    </div>
  );
}
