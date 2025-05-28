import { mergeTypeDefs } from "@graphql-tools/merge";
import * as UserWebTypeDefs from "./type";
import UserQueryDefs from "./QueryTypeDefs";
import UserMutationTypeDefs from "./MutationTypeDefs";

const MergeTypeDefs = mergeTypeDefs([
  UserWebTypeDefs.User,
  UserWebTypeDefs.LoginResponse,
  UserWebTypeDefs.Product,
  UserWebTypeDefs.ProductsResponse,
  UserWebTypeDefs.CartItem,
  UserWebTypeDefs.CartItemResponse,
  UserWebTypeDefs.Order,
  UserWebTypeDefs.OrderResponse,
  UserWebTypeDefs.Payment,
  UserWebTypeDefs.PaymentResponse,
  UserWebTypeDefs.UserCartItem,
  UserQueryDefs,
  UserMutationTypeDefs

]);

export default MergeTypeDefs;
