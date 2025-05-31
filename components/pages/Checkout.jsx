"use client";
import { GetUserCartItem } from "@/graphql/ClientAPI/queryUtils";
import { useEffect, useState } from "react";
import Image from "next/image";
import SingleCartItem from "./SingleCartItem";
import { nanoid } from "nanoid";
import PaymentMethodButton from "../PaymentMethodBtn";
import { CreditCard } from "lucide-react";
import toast from "react-hot-toast";
import { CreateOrder } from "@/graphql/ClientAPI/mutationUtils";
import { DeleteAllCartItem } from "@/graphql/ClientAPI/mutationUtils";
import { DeleteSingleCartItem } from "@/graphql/ClientAPI/mutationUtils";
import EmptyContent from "../EmptyContent";
import { useRouter } from "next/navigation";

export default function CheckOut() {
  const [userCartItem, SetUserCartItem] = useState([]);
  const [userId, setUserId] = useState(null);
  const [productCount, SetProductCount] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPaymentMethod, SetPaymentMethod] = useState("貨到付款");
  const [address, setAddress] = useState("");
  const [creditCartNumber, SetCreditCardNumber] = useState("");
  const [checkCreditCard, SetCheckCreditCard] = useState(false);
  const [checkAddress, SetCheckAddress] = useState(false);
  const [cartItemSize, SetCartItemSize] = useState(0);
  const router = useRouter()

  const handleCartItem = (productId, type) => {
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
  async function deleteCartItem(userid, size, productid) {
    try {
      const res = await DeleteSingleCartItem(userid, size, productid);
      const { status, message } = res;
      if (status === 200) {
        const updateCartSize = cartItemSize - 1;
        SetCartItemSize(updateCartSize);
        toast.success(message);
      }
      return { status, message };
    } catch (error) {
      console.error("fail to delete cart item", error);
    }
  }

  async function createOrder() {
    // 驗證地址
    if (!checkAddress) {
      toast.error("地址不可為空");
      return;
    }

    // 驗證信用卡資訊
    if (isPaymentMethod === "信用卡/金融卡" && creditCartNumber.length === 0) {
      toast.error("卡號不可為空");
      return;
    }

    //更新商品數量
    const updatedCartItems = userCartItem.map((product) => {
      const uniqueId = `${product.productid}_${product.size}`;
      return {
        ...product,
        productcount: productCount[uniqueId] ?? 0,
      };
    });

    // 建立訂單資料
    const productids = updatedCartItems.map((product) => product.productid);
    const creditCardNumberStatus =
      isPaymentMethod === "信用卡/金融卡" ? creditCartNumber : "現付";

    const order = {
      orderid: nanoid().slice(0, 12),
      userid: userId,
      totalprice: totalPrice,
      address: address,
      status: "準備出貨中",
      paymentmethod: [isPaymentMethod, creditCardNumberStatus].join(","),
      productid: productids.join(","),
      productlist: updatedCartItems,
    };
    const res = await CreateOrder(order);
    
    // 確定建立訂單後 清空購物車
    const { data, status, message } = res;
    if (status === 200) {
      await DeleteAllCartItem(userId);
      toast.success(`已建立訂單 訂單編號為${data[0].orderid}`)
      router.push('/Order')
      
    }
  }

  function HandleChange(event, setStateFunc) {
    const value = event.target.value.replace(/\D/g, "");
    setStateFunc(value);
  }

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
      SetCartItemSize(response.data.length);
    });
  }, [userId, cartItemSize]);

  /**監聽: 只要增加商品數量 就更改總金額 */
  useEffect(() => {
    const total = GetTotalPrice(userCartItem);
    setTotalPrice(total);
  }, [productCount, userCartItem]);

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
    <div className="shoppingCart relative w-[70%] ml-60">
      <div className="flex justify-between border-b-2 h-[60px]">
        <h1 className="text-4xl mr-2.5">結帳</h1>
      </div>
      <div className="flex font-bold border-b bg-white py-2">
        <h1 className="basis-2/6 text-l">訂單商品</h1>
        <p className="basis-1/6 text-l ">單價</p>

        <p className="basis-1/6 text-l mr-5">尺寸</p>
        <p className="basis-1/6 text-l">數量</p>
        <p className="basis-1/6 text-l">單一商品總金額</p>
        <p className="basis-1/6 text-l">刪除</p>
      </div>

      <div className="cartContainer bg-white w-[100%] h-[130px] grid gap-3 overflow-y-auto">
        {userCartItem.length > 0 &&
          userCartItem[0].image ?
          userCartItem.map((product) => {
            return (
              <div
                key={`${product.productid}_${product.size}`}
                className="flex items-center border-b py-4"
              >
                <SingleCartItem
                  deleteCartItemFunc={deleteCartItem}
                  userid={userId}
                  uniqueId={`${product.productid}_${product.size}`}
                  productCard={product}
                  productCount={productCount}
                  handleChangeFunc={handleCartItem}
                />
              </div>
            );
          }):<EmptyContent />}
      </div>

      {/* 確認付款方式 */}
      <div className="paymentMethod bg-white mt-10 p-4  w-[100%] h-[200px]">
        <div className="flex w-full h-[100px] border-b-2 items-center gap-15">
          <h1 className="text-xl ml-2 w-[100px]">付款方式</h1>
          <div className="buttons flex gap-10 w-[400px] h-[80px] items-center">
            <PaymentMethodButton
              isPaymentMethod={isPaymentMethod}
              PaymentMethod={"貨到付款"}
              SetPaymentFunc={SetPaymentMethod}
            />
            <PaymentMethodButton
              isPaymentMethod={isPaymentMethod}
              PaymentMethod={"信用卡/金融卡"}
              SetPaymentFunc={SetPaymentMethod}
            />
          </div>
        </div>

        <div className="paymentMethod_container flex w-full h-[100px] items-center gap-15">
          <h1 className=" text-[16px] ml-2 w-[100px]">
            {isPaymentMethod === "貨到付款" ? "貨到付款" : "輸入信用卡號"}
          </h1>
          <div className="buttons flex gap-10 w-[400px] h-[80px] items-center">
            {isPaymentMethod === "貨到付款" ? (
              <h1 className="text-m ">現付</h1>
            ) : (
              // 信用卡UI
              <div className="creditCard flex w-[400px] gap-2 items-center">
                {/* 根據是否確認信用卡號 顯示不同UI */}
                {checkCreditCard ? (
                  <div className="flex gap-4 w-[400px]">
                    <p className="text-xl">{creditCartNumber}</p>
                    <button
                      className="hover:text-red-800 text-red-500 text-xl"
                      onClick={() => {
                        SetCheckCreditCard(false), SetCreditCardNumber("");
                      }}
                    >
                      變更
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      maxLength={12}
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      className="inputCreditCardNumber border border-red-800 w-[180px] h-[40px] p-2"
                      onChange={(event) =>
                        HandleChange(event, SetCreditCardNumber)
                      }
                    />
                    <div
                      className={`block bg-gray-600 text-white w-[100px] text-center pt-1 h-[35px] rounded-sm hover:bg-gray-900 hover:cursor-pointer ${
                        creditCartNumber.length === 0
                          ? "bg-gray-300 opacity-50 pointer-events-none"
                          : "bg-gray-600 hover:bg-gray-400 cursor-pointer"
                      }`}
                    >
                      <button
                        onClick={() => SetCheckCreditCard(!checkCreditCard)}
                      >
                        確認
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 輸入地址 */}
      <div className="address bg-white mt-10 p-4  w-[100%] h-[100px]">
        <div className="address_container flex w-full h-[70px] items-center gap-15">
          <h1 className="text-xl ml-2 w-[100px]">宅配地址</h1>

          {checkAddress ? (
            <div className="flex gap-4 w-[400px]">
              <p className="text-xl">{address}</p>
              <button
                className="hover:text-red-800 text-red-500 text-xl"
                onClick={() => {
                  SetCheckAddress(false);
                  setAddress("");
                }}
              >
                變更
              </button>
            </div>
          ) : (
            <div className="buttons flex gap-3 w-[400px] h-[80px] items-center">
              <input
                type="text"
                className="inputAddress border border-red-800 w-[280px] h-[40px] p-2"
                onChange={(event) => setAddress(event.target.value)}
              />
              <div
                className={`block bg-gray-600 text-white w-[100px] text-center pt-1 h-[35px] rounded-sm hover:bg-gray-900 hover:cursor-pointer ${
                  address.length === 0
                    ? "bg-gray-300 opacity-50 pointer-events-none"
                    : "bg-gray-600 hover:bg-gray-400 cursor-pointer"
                }`}
              >
                <button onClick={() => SetCheckAddress(!checkAddress)}>
                  確認
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex flex-row-reverse gap-2 mt-8 items-center">
        <div className="block bg-red-600 text-white w-[100px] text-center pt-1 h-[35px] rounded-sm hover:bg-red-400 hover:cursor-pointer">
          <button
            onClick={() => {
              createOrder(userCartItem);
            }}
          >
            下訂單({userCartItem.length})
          </button>
        </div>
        <div className="totalPrice">
          總金額 <strong className="text-red-500 text-xl">${totalPrice}</strong>
        </div>
      </div>
    </div>
  );
}
