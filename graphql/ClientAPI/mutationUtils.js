require("dotenv").config();
import {
  DELETE_ALL_CART_ITEM,
  DELETE_SINGLE_CART_ITEM,
  EDIT_USER_PROFILE,
  POST_CART_ITEM,
  POST_ORDER,
  SIGN_UP,
} from "./mutation";
import { FetchAPIWithVariables } from "./queryUtils";
import { verfiyConfig } from "./verifyUtils";
const devUrl = process.env.NEXT_PUBLIC_URL;
import toast from "react-hot-toast";

export async function PostCartItem(cartItem) {
  try {
    const Url = process.env.NEXT_PUBLIC_URL;
    const response = await FetchAPIWithVariables(Url, POST_CART_ITEM, cartItem);
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

export async function EditUserProfile(column, info, userid) {
  try {
    if (info.length === 0) {
      toast.error("輸入值不可為空");
      return;
    }
    const Url = process.env.NEXT_PUBLIC_URL;
    const response = await FetchAPIWithVariables(Url, EDIT_USER_PROFILE, {
      userid: userid,
      column: column,
      info: info,
    });
    const { status, message } = response.data.EditUserProfile;
    if (status === 404) {
      toast.error("已有人使用 請重新輸入");
    } else {
      toast.success("更改成功");
      const { data } = response.data.EditUserProfile;
      return { status, message, data };
    }
  } catch (error) {
    console.error("fail to update user profile", error);
  }
}

export async function SignUpUser(signUpResult) {
  try {
    for(const userInfo in signUpResult){
      if(signUpResult[userInfo].length === 0){
        toast.error(`${userInfo}欄位未輸入 請重新輸入`)
        return
      }
    }
    const Url = process.env.NEXT_PUBLIC_URL;
    const response = await FetchAPIWithVariables(Url, SIGN_UP, signUpResult);
    const { status, message } = response.data.UserSignUp;
    if (status === 404) {
      toast.error("電子郵件或電話已有人使用 請重新輸入");
    } else {
      const { data } = response.data.UserSignUp;
      return { status, message, data };
    }
  } catch (error) {
    console.log(error);
  }
}
