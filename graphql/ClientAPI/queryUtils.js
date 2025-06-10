require("dotenv").config();
import { errorCodes } from "@apollo/client/invariantErrorCodes";
import {
  GET_ALL_ORDER,
  GET_ALL_PRODUCT,
  GET_ALL_PRODUCT_WITH_CATEGORY,
  GET_USER_CARTITEM,
  GET_USER_PROFILE,
  GET_ORDER_WITH_ORDERID,
  GET_USER_DETAILS,
} from "./query";
import { verfiyConfig } from "./verifyUtils";
const devUrl = process.env.NEXT_PUBLIC_URL;
import toast from "react-hot-toast";

/**
 * @function FetchAPIWithVariables - 若查詢需要參數 使用此function
 * @param {string} url - 默認使用 "devUrl"
 * @param {string} graphqlString - grapqhl查詢字串
 * @param {Object} variable - query / mutation的參數 請傳入一個物件
 * @returns {JSON}
 */
export async function FetchAPIWithVariables(url, graphqlString, variable) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: graphqlString,
        variables: variable,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * @function FetchAPI - 若查詢不需要參數 使用此function
 * @param {string} url - 默認使用 "devUrl"
 * @param {string} graphqlString - grapqhl查詢字串
 * @returns {JSON}
 */
export async function FetchAPI(url, graphqlString) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: graphqlString,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Fail to fetch :", error);
    throw error;
  }
}

export async function FetchAllProduct() {
  try {
    const Url = process.env.NEXT_PUBLIC_URL;
    const response = await FetchAPI(Url, GET_ALL_PRODUCT);
    const { data } = response.data.GetAllProduct;
    return data;
  } catch (error) {
    console.error(`Fail to get all product: ${error.graphQLErrors}`);
    throw error;
  }
}

export async function FetchAllOrder(userid) {
  try {
    const Url = process.env.NEXT_PUBLIC_URL;
    const response = await FetchAPIWithVariables(Url, GET_ALL_ORDER, userid);
    return response;
  } catch (error) {
    console.error(`Fail to get all order: ${error.graphQLErrors}`);
    throw error;
  }
}

export async function FetchProductWithCategory(variable) {
  try {
    const Url = process.env.NEXT_PUBLIC_URL;
    const response = await FetchAPIWithVariables(
      Url,
      GET_ALL_PRODUCT_WITH_CATEGORY,
      variable
    );
    const { data } = response.data.GetProductWithCategory;
    return data;
  } catch (error) {
    console.error(
      `Fail to get all product with ${variable.column}: ${error.graphQLErrors}`
    );
    throw error;
  }
}

export async function GetUserProfile(loginResult) {
  try {
    if (verfiyConfig.LengthError(loginResult.email)) {
      toast.error("Email 欄位不可為空");
      return;
    } else if (verfiyConfig.LengthError(loginResult.password)) {
      toast.error("密碼 欄位不可為空");
      return;
    } else {
      const Url = process.env.NEXT_PUBLIC_URL;
      const response = await FetchAPIWithVariables(
        Url,
        GET_USER_PROFILE,
        loginResult
      );
      const isLoginSuccess = !Object.keys(response).includes("errors");

      if (isLoginSuccess) {
        const { jwt, data, status } = response.data.GetUserProfile;
        sessionStorage.setItem("userid", data[0].userid);
        sessionStorage.setItem("token", jwt);
        console.log("jwt", jwt);
        console.log("status", status);
        return { token: jwt, userProfile: data[0], statusCode: status };
      } else {
        toast.error("帳號密碼錯誤 請重新輸入");
      }
    }
  } catch (error) {
    console.log(`Fail to login please check your email or password`, error);
    return {
      statusCode: 500,
      errorMessage: "Login failed due to server error",
    };
  }
}

export async function GetUserDetails(userId) {
  try {
    const Url = process.env.NEXT_PUBLIC_URL;
    const response = await FetchAPIWithVariables(Url, GET_USER_DETAILS, {
      userid: userId,
    });
    const { data, message, status } = response.data.GetUserProfileWithID;
    return { data, message, status };
  } catch (error) {
    console.error("GetUserDetails Error:", error);
    return {
      statusCode: 500,
      errorMessage: "Fail to get user profile details",
    };
  }
}

export async function GetUserCartItem(userid) {
  try {
    const Url = process.env.NEXT_PUBLIC_URL;
    const response = await FetchAPIWithVariables(
      Url,
      GET_USER_CARTITEM,
      userid
    );
    const { data, message, status } = response.data.GetCartItems;
    return { data, message, status };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      errorMessage: "Fail to get user cart item",
    };
  }
}

export async function GetUserWithUserID(userid) {
  try {
    const Url = process.env.NEXT_PUBLIC_URL;
    const response = await FetchAPIWithVariables(Url, GET_USER_DETAILS, {
      userid: userid,
    });
    const { data, message, status } = response.data.GetUserProfileWithID;
    return { data, message, status };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      errorMessage: "Fail to get user cart profile",
    };
  }
}

export async function GetOrderWithOrderId(order) {
  try {
    const Url = process.env.NEXT_PUBLIC_URL;
    const response = await FetchAPIWithVariables(
      Url,
      GET_ORDER_WITH_ORDERID,
      order
    );
    const { data, message, status } = response.data.GetOrderWithOrderId;
    return { data, message, status };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      errorMessage: "Fail to get all order with orderid",
    };
  }
}

export async function GetAllOrder(user) {
  try {
    const Url = process.env.NEXT_PUBLIC_URL;
    const response = await FetchAPIWithVariables(Url, GET_ALL_ORDER, user);
    const { data, message, status } = response.data.GetAllOrder;
    return { data, message, status };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      errorMessage: "Fail to get all order",
    };
  }
}
