import { DELETE_ALL_CART_ITEM, DELETE_SINGLE_CART_ITEM,POST_CART_ITEM, POST_ORDER } from "./mutation";
import { FetchAPIWithVariables } from "./queryUtils";
import { verfiyConfig } from "./verifyUtils";
const devUrl = "http://localhost:3000/api/graphql";
import toast from "react-hot-toast";


export async function PostCartItem(cartItem) {
  try {
    console.log(cartItem);
    const response = await FetchAPIWithVariables(
      devUrl,
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
    console.log(order);
    const response = await FetchAPIWithVariables(devUrl, POST_ORDER, order);
    const { message, status, data } = response.data.PostOrders;
    return { message, status, data };
  } catch (error) {
    console.log(error);
  }
}

export async function DeleteAllCartItem(userid) {
  try {
    const response = await FetchAPIWithVariables(devUrl, DELETE_ALL_CART_ITEM, {
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
    const response = await FetchAPIWithVariables(devUrl, DELETE_SINGLE_CART_ITEM, {
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
