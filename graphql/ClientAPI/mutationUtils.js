require("dotenv").config();
import { DELETE_ALL_CART_ITEM, DELETE_SINGLE_CART_ITEM,POST_CART_ITEM, POST_ORDER } from "./mutation";
import { FetchAPIWithVariables } from "./queryUtils";
import { verfiyConfig } from "./verifyUtils";
const devUrl = process.env.NEXT_PUBLIC_URL;
import toast from "react-hot-toast";



export async function PostCartItem(cartItem) {
  try {
    const Url = process.env.NEXT_PUBLIC_URL;
    const response = await FetchAPIWithVariables(
      Url,
      POST_CART_ITEM,
      cartItem
    );
    const { message, status } = response.data.PostCartItem;
    return { message, status };
  } catch (error) {
    console.log(error);
  }
}

export async function CreateOrder(order) {
  try {
    const Url = process.env.NEXT_PUBLIC_URL;
    const response = await FetchAPIWithVariables(Url, POST_ORDER, order);
    const { message, status, data } = response.data.PostOrders;
    return { message, status, data };
  } catch (error) {
    console.log(error);
  }
}

export async function DeleteAllCartItem(userid) {
  try {
    const Url = process.env.NEXT_PUBLIC_URL;
    const response = await FetchAPIWithVariables(Url, DELETE_ALL_CART_ITEM, {
      userid: userid,
    });
    const { status, message } = response.data.DeleteAllCartItem;
    console.log(response);
    return { status, message };
  } catch (error) {
    console.error("fail to delete single cartitem:", error);
  }
}

export async function DeleteSingleCartItem(userid, size, productid) {
  try {
    const Url = process.env.NEXT_PUBLIC_URL;
    const response = await FetchAPIWithVariables(Url, DELETE_SINGLE_CART_ITEM, {
      userid: userid,
      size: size,
      productid: productid,
    });
    const { status, message } = response.data.DeleteCartItem;
    return { status, message };
  } catch (error) {
    console.error("fail to delete single cartitem:", error);
  }
}
