import { GET_ALL_ORDER, GET_ALL_PRODUCT } from "./query";
const devUrl = "http://localhost:3000/api/graphql";

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
    const response = await FetchAPI(devUrl, GET_ALL_PRODUCT);
    const { data } = response.data.GetAllProduct;
    return data;
  } catch (error) {
    console.error(`Fail to get all product: ${error.graphQLErrors}`);
    throw error;
  }
}

export async function FetchAllOrder(userid) {
  try {
    const response = await FetchAPIWithVariables(devUrl, GET_ALL_ORDER, {
      userid: userid,
    });

    return response;
  } catch (error) {
    console.error(`Fail to get all order: ${error.graphQLErrors}`);
    throw error;
  }
}
