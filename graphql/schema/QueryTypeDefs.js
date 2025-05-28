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
  UserCartItem,
} from "./type";

const UserQueryDefs = gql`
  ${User}
  ${LoginResponse}
  ${Product}
  ${ProductsResponse}
  ${CartItem}
  ${UserCartItem}
  ${CartItemResponse}
  ${Order}
  ${OrderResponse}

  type Query {
    GetUserProfile(email: String!, password: String!): LoginResponse

    GetAllProduct:ProductsResponse
    GetProductWithCategory(column:String!, info:String):ProductsResponse!
    GetProductWithId(id:Int!):ProductsResponse!
    GetProducts(pageCount:Int!):ProductsResponse!
    
    GetCartItems(userid:String!):CartItemResponse
    GetAllOrder(userid:String):OrderResponse
    GetOrderWithOrderId(userid:String!, orderid:String!):OrderResponse
  }
`;

export default UserQueryDefs
