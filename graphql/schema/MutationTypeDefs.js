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
  UserResponse
} from "./type";

const UserMutationTypeDefs = gql`
  ${User}
  ${LoginResponse}
  ${Product}
  ${ProductsResponse}
  ${CartItem}
  ${CartItemResponse}
  ${Order}
  ${OrderResponse}
  ${Payment}
  ${PaymentResponse}
  ${DeleteUserResponse}
  ${UserResponse}

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
    ): CartItemResponse
    UpdateCartItemCount(userid: String!): Int!
    DeleteCartItem(userid: String!): CartItemResponse

    PostOrders(
      orderid: String!
      userid: String!
      producctid: String!
      totalprice: Float!
      status: String!
      paymentmethod: String!
    ): OrderResponse
    UpdateOrderStatus(orderid: String!,status:String): OrderResponse
    DeleteOrder(orderid: String!): OrderResponse
  }
`;

export default UserMutationTypeDefs;
