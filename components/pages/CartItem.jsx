"use client";
import { GetUserCartItem } from "@/graphql/ClientAPI/queryUtils";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import SingleCartItem from "./SingleCartItem";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { DeleteSingleCartItem } from "@/graphql/ClientAPI/mutationUtils";

import EmptyContent from "../EmptyContent";

export default function CartItem() {
  const [userCartItem, SetUserCartItem] = useState([]);
  const [userId, setUserId] = useState(null);
  const [productCount, SetProductCount] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItemSize, SetCartItemSize] = useState(0);
  const router = useRouter();

  async function deleteCartItem(userid, size, productid) {
    try {
      const res = await DeleteSingleCartItem(userid, size, productid);

      const { status, message } = res;
      if (status === 200) {
        const updateCartSize = cartItemSize - 1;
        SetCartItemSize(updateCartSize);
        toast.success(message);
      }

      console.log(res);
    } catch (error) {
      console.error("fail to delete cart item", error);
    }
  }

  const handleChange = (productId, type) => {
    SetProductCount((prev) => {
      const current = prev[productId] || 1;
      const updated =
        type === "increase" ? current + 1 : Math.max(current - 1, 1);
      return {
        ...prev,
        [productId]: updated,
      };
    });
  };

  useEffect(() => {
    const id = sessionStorage.getItem("userid");
    setUserId(id);
  }, []);

  /**首次渲染: 拿到Userid底下的購物車資料 並且依據數量 設定狀態 */
  useEffect(() => {
    if (!userId) return;
    GetUserCartItem({ userid: userId }).then((response) => {
      SetUserCartItem(response.data);
      const initalQuantities = {};

      response.data.forEach((product) => {
        const id = `${product.productid}_${product.size}`;
        initalQuantities[id] = product.productcount;
      });

      SetProductCount(initalQuantities);
      const total = GetTotalPrice(response.data);
      setTotalPrice(total);
    });
  }, [userId, cartItemSize]);

  /**監聽: 只要增加商品數量 就更改總金額 */
  useEffect(() => {
    const total = GetTotalPrice(userCartItem);
    setTotalPrice(total);
  }, [productCount]);

  /**取得總金額 */
  function GetTotalPrice(products) {
    const total = products.reduce((acc, product) => {
      const id = `${product.productid}_${product.size}`;
      const count = productCount[id] || 1;
      const subtotal = product.price * count;
      return acc + subtotal;
    }, 0);

    return parseFloat(total.toFixed(2));
  }
  return (
    <div className="shoppingCart relative w-[80%] ml-40">
      <div className="flex justify-between border-b-2 h-[60px]">
        <h1 className="text-4xl mr-2.5">購物車</h1>
        <div className="info flex gap-18">
          <p className="text-xl">商品數量</p>
          <p className="text-xl">總金額</p>
        </div>
      </div>
      <div className="flex font-bold border-b py-2">
        <h1 className="basis-2/6 text-l">商品</h1>
        <p className="basis-1/6 text-l ">單價</p>

        <p className="basis-1/6 text-l mr-5">尺寸</p>
        <p className="basis-1/6 text-l">數量</p>
        <p className="basis-1/6 text-l">單一商品總金額</p>
        <p className="basis-1/6 text-l">刪除</p>
      </div>

      <div className="cartContainer w-[100%] h-[600px] grid gap-3 overflow-y-auto">
        {userCartItem.length > 0 && userCartItem[0].image ? (
          userCartItem.map((product) => {
            return (
              <div
                key={`${product.productid}_${product.size}`}
                className="flex items-center border-b h-[130px] py-4"
              >
                <SingleCartItem
                  deleteCartItemFunc={deleteCartItem}
                  userid={userId}
                  uniqueId={`${product.productid}_${product.size}`}
                  productCard={product}
                  productCount={productCount}
                  handleChangeFunc={handleChange}
                />
              </div>
            );
          })
        ) : (
          <EmptyContent message={"購物車內目前無商品 在逛逛吧:)"}/>
        )}
      </div>
      <div className="w-full flex flex-row-reverse gap-2 mt-3 items-center">
        <div
          className={`block bg-red-600 text-white w-[100px] text-center pt-1 h-[35px] rounded-sm hover:bg-red-400 hover:cursor-pointer ${
            userCartItem.length === 0
              ? "bg-gray-300 opacity-50 pointer-events-none"
              : "bg-gray-600 hover:bg-gray-400 cursor-pointer"
          }`}
        >
          <button
            onClick={() => {
              if (userCartItem.length > 0) {
                sessionStorage.setItem(
                  "userCartItem",
                  JSON.stringify(userCartItem)
                );
                router.push("/CheckOut");
              } else {
                toast.error("購物車為空 請先加入商品");
              }
            }}
          >
            去買單({userCartItem.length})
          </button>
        </div>
        <div className="totalPrice">
          總金額 <strong className="text-red-500 text-xl">${totalPrice}</strong>
        </div>
      </div>
    </div>
  );
}
