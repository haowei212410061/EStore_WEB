import gql from "graphql-tag";

export const GET_ALL_PRODUCT = `
  query GetAllProduct {
    GetAllProduct {
      status
      message
      data {
        category
        count
        description
        image
        price
        productid
        title
      }
    }
  }
`;

export const GET_ALL_ORDER = `
  query GetAllOrder($userid: String) {
    GetAllOrder(userid: $userid) {
      status
      message
      data {
        orderid
        paymentmethod
        productid
        status
        totalprice
        userid
      }
    }
  }
`;
