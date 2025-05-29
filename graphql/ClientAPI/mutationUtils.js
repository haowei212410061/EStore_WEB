import { POST_CART_ITEM } from "./mutation";
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
