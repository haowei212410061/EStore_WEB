require("dotenv").config();
import jwt from "jsonwebtoken";
import { ApolloError } from "@apollo/server/errors";

export const UserQueryResolves = {
  Query: {
    GetUserProfile: async (parent, { email, password }, { db }) => {
      try {
        const GetUserProfileResponse = await db.query(
          "SELECT * FROM users WHERE email=$1 AND password=$2",
          [email, password]
        );
        if (GetUserProfileResponse.rows.length === 0) {
          return {
            status: 404,
            message: "User not found or invalid email or invalid password",
            data: [],
          };
        } else {
          const token = jwt.sign(
            {
              id: GetUserProfileResponse.rows[0].userid,
              email: GetUserProfileResponse.rows[0].email,
            },
            process.env.PRIVATE_SECRET_KEY,
            { expiresIn: "2h" }
          );
          return {
            status: 200,
            message: "User login success",
            data: GetUserProfileResponse.rows[0],
            jwt: token,
          };
        }
      } catch (error) {
        console.error(`Fail to GetUserProfile: ${error}`);
      }
    },
    GetAllProduct: async (parent, args, { db }) => {
      try {
        const GetAllProductResponse = await db.query("SELECT * FROM products");
        return {
          status: 200,
          message: "get all product success",
          data: GetAllProductResponse.rows,
        };
      } catch (error) {
        console.log(error)
        return {
          status: 500,
          message: "Internal server error while getting all products",
          data: [],
        };
      }
    },

    GetProductWithCategory: async (parent, { column, info }, { db }) => {
      try {
        const ProductResponse = await db.query(
          `SELECT * FROM products WHERE ${column}=$1`,
          [info]
        );
        return {
          status: 200,
          message: "Get products success",
          data: ProductResponse.rows,
        };
      } catch (error) {
        console.error(`Fail to get product with category: ${error}`);
      }
    },

    GetProductWithId: async (parent, { productid }, { db }) => {
      try {
        const ProductResponse = await db.query(
          `SELECT * FROM products WHERE productid=$1`,
          [productid]
        );
        return {
          status: 200,
          message: "Get products success",
          data: ProductResponse.rows,
        };
      } catch (error) {
        console.error(`Fail to get product with productid: ${error}`);
      }
    },

    GetProducts: async (parent, { pageCount }, { db }) => {
      try {
        const pageNumber = pageCount * 10;
        const ProducResponse = await db.query(
          `SELECT * FROM products LIMIT 10 OFFSET ${pageNumber}`
        );
        return {
          status: 200,
          message: `get all product , pageCount:${pageNumber}`,
          data: ProducResponse.rows,
        };
      } catch (error) {
        console.error(`Fail to get products: ${error}`);
      }
    },

    GetCartItems: async (parent, { userid }, { db }) => {
      try {
        const GetCartItemsResponse = await db.query(
          `SELECT * FROM cartitem WHERE userid=$1`,
          [userid]
        );
        return {
          status: 200,
          message: "Get cart item success",
          data: GetCartItemsResponse.rows,
        };
      } catch (error) {
        console.error(`Fail to get cart item :${error}`);
      }
    },

    GetAllOrder: async (parent, { userid }, { db }) => {
      try {
        const OrderResponse = await db.query(
          `SELECT * FROM orders WHERE userid=$1`,
          [userid]
        );
        return {
          status: 200,
          message: "Get all order success",
          data: OrderResponse.rows,
        };
      } catch (error) {
        console.error(`Fail to get all order:${error}`);
      }
    },
    GetOrderWithOrderId: async (parent, { userid, orderid }, { db }) => {
      try {
        const OrderResponse = await db.query(
          `SELECT * FROM orders WHERE userid=$1 AND orderid=$2`,
          [userid, orderid]
        );
        return {
          status: 200,
          message: "Get order success",
          data: OrderResponse.rows,
        };
      } catch (error) {
        console.error(`Fail to get order:${error}`);
      }
    },
  },
};
