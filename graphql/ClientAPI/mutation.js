export const POST_CART_ITEM = `
mutation PostCartItem($cartid: String!, $userid: String!, $productid: String!, $productcount: Int!, $size: String!) {
  PostCartItem(cartid: $cartid, userid: $userid, productid: $productid, productcount: $productcount, size: $size) {
    status
    message
    data {
      productid
      title
      price
      description
      category
      image
      count
      productcount
      size
    }
  }
}
`;

export const POST_ORDER = `
mutation PostOrders($orderid: String!, $userid: String!, $totalprice: Float!, $status: String!, $address: String!, $paymentmethod: String!, $productid: String!, $productlist: [UserCartItemInput!]!) {
  PostOrders(orderid: $orderid, userid: $userid, totalprice: $totalprice, status: $status, address: $address, paymentmethod: $paymentmethod, productid: $productid, productlist: $productlist) {
    data {
      orderid
      userid
      totalprice
      status
      address
      paymentmethod
      productid
      productlist {
        productid
        title
        price
        description
        category
        image
        count
        productcount
        size
      }
    }
    message
    status
  }
}
`;

export const DELETE_ALL_CART_ITEM = `
mutation DeleteAllCartItem($userid: String!) {
  DeleteAllCartItem(userid: $userid) {
    status
    message
    data {
      productid
      title
      price
      description
      category
      image
      count
      productcount
      size
    }
  }
}
`;

export const EDIT_USER_PROFILE = `
mutation EditUserProfile($column: String!, $userid: String!, $info: String) {
  EditUserProfile(column: $column, userid: $userid, info: $info) {
    status
    message
    data {
      userid
      account
      email
      password
      phone
    }
  }
}
`

export const SIGN_UP = `
mutation UserSignUp($userid: String!, $account: String!, $email: String!, $password: String!, $phone: String!) {
  UserSignUp(userid: $userid, account: $account, email: $email, password: $password, phone: $phone) {
    status
    message
    data {
      userid
      account
      email
      password
      phone
    }
  }
}
`

export const DELETE_SINGLE_CART_ITEM = `
  mutation DeleteCartItem($userid: String!, $productid: String!, $size: String) {
  DeleteCartItem(userid: $userid, productid: $productid, size: $size) {
    status
    message
    data {
      productid
      title
      price
      description
      category
      image
      count
      productcount
      size
    }
  }
}
`;
