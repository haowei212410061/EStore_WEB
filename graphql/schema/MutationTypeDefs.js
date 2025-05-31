import gql from "graphql-tag"
import {
  User,
  LoginResponse,
  Product,
  ProductsResponse,
  CartItem,
  CartItemResponse,
  Order,
  OrderResponse,
  Payment,
  PaymentResponse,
  DeleteUserResponse,
  UserResponse,
  UserCartItem,
  UserCartItemInput
} from "./type";

const UserMutationTypeDefs = gql`
  ${User}
  ${LoginResponse}
  ${Product}
  ${ProductsResponse}
  ${CartItem}
  ${UserCartItem}
  ${CartItemResponse}
  ${Order}
  ${OrderResponse}
  ${Payment}
  ${PaymentResponse}
  ${DeleteUserResponse}
  ${UserResponse}
  ${UserCartItemInput}

  type Mutation {
    UserSignUp(
      userid: String!
      account: String!
      email: String!
      password: String!
      phone: String!
    ): UserResponse

    DeleteUser(userid: String): UserResponse
    EditUserProfile(column: String!, info: String, userid: String!): UserResponse

    PostCartItem(
      cartid: String!
      userid: String!
      productid: String!
      productcount:Int!
      size:String!
    ): CartItemResponse
    UpdateCartItemCount(userid: String!): Int!
    DeleteCartItem(userid: String!,productid:String!,size:String): CartItemResponse
    DeleteAllCartItem(userid:String!):CartItemResponse

    PostOrders(
    orderid: String!
    userid: String!
    totalprice: Float!
    status: String!           
    address: String!
    paymentmethod: String!
    productid: String!
    productlist: [UserCartItemInput!]!  
  ): OrderResponse
    UpdateOrderStatus(orderid: String!,status:String): OrderResponse
    DeleteOrder(orderid: String!): OrderResponse
  }
`;

export default UserMutationTypeDefs;
