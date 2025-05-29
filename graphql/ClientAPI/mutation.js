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
