import gql from "graphql-tag"


export const User = gql`
    type User{
        userid:String!
        account:String!
        email:String!
        password:String!
        phone:String!
    }
`
export const LoginResponse = gql`
    type LoginResponse {
        status:Int!
        message:String!
        data:[User]
        jwt:String!
    }

`

export const Product = gql`
    type Product {
        productid:String!
        title:String!
        price:Float!
        description:String!
        category:String!
        image:String!
        count:Int!
    }
`
export const ProductsResponse = gql`
    type ProductsResponse {
        status:Int!
        message:String!
        data:[Product]
    }
`

export const CartItem = gql`
    type CartItem {
        cartid:String!
        userid:String!
        productid:String!
        productcount:Int!
    }
`
export const UserCartItem = gql`
    type UserCartItem{
        productid:String!
        title:String!
        price:Float!
        description:String!
        category:String!
        image:String!
        count:Int!
        productcount:Int!
    }
`

export const CartItemResponse = gql`
    type CartItemResponse {
        status:Int!
        message:String!
        data:[UserCartItem]
    }
`

export const Order = gql`
    type Order {
        orderid:String!
        productid:String
        userid:String!
        totalprice:Float!
        status:String!
        paymentmethod:String!
    }
`

export const OrderResponse = gql`
    type OrderResponse {
        status:Int!
        message:String!
        data:[Order]!
    }
`
export const Payment = gql`
    type Payment {
        paymentid:Int!
        orderid:String!
        paymenstatus:String!
        paymentmethod:String!
    }
`
export const PaymentResponse = gql`
    type PaymentResponse {
        status:Int!
        message:String!
        data:[Payment]!
    }
`
export const DeleteUserResponse = gql`
    type DeleteUserResponse {
        status:Int!
        message:String!
    }
`

export const UserResponse = gql`
    type UserResponse {
        status:Int!
        message:String!
        data:[User]
    }
`

