import gql from "graphql-tag";


export const GET_USER_PROFILE = `
  query GetUserProfile($email: String!, $password: String!) {
  GetUserProfile(email: $email, password: $password) {
    status
    message
    data {
      userid
      account
      email
      password
      phone
    }
    jwt
  }
}
`

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

export const GET_ALL_PRODUCT_WITH_CATEGORY = `
query GetProductWithCategory($column: String!, $info: String) {
  GetProductWithCategory(column: $column, info: $info) {
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
`