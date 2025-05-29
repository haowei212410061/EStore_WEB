require("dotenv").config();
import jwt from "jsonwebtoken";
import { ApolloError } from "@apollo/server/errors";
const bcrypt = require("bcrypt");

export const UserQueryResolves = {
  Query: {
    GetUserProfile: async (parent, { email, password }, { db }) => {
      try {
        const user = await db.query("SELECT * FROM users WHERE email=$1", [
          email,
        ]);
        if (user.rows.length === 0) {
          return {
            status: 404,
            message: "Invalid email",
            data: [],
          };
        }

        const result = user.rows[0];
        console.log(user);

        if (!user) {
          return {
            status: 404,
            message: "Invalid email",
            data: [],
            jwt: "",
          };
        }
        const isPassword = await bcrypt.compare(password, result.password);

        if (!isPassword) {
          return {
            status: 404,
            message: "Invalid password",
            data: [],
            jwt: "",
          };
        }
        const token = jwt.sign(
          {
            id: result.userid,
            email: result.email,
          },
          process.env.PRIVATE_SECRET_KEY,
          { expiresIn: "2h" }
        );
        return {
          status: 200,
          message: "User login success",
          data: [result],
          jwt: token,
        };
      } catch (error) {
        console.error(`Fail to GetUserProfile: ${error}`);
        return {
          status: 500,
          message: "Fail to GetUserProfile ",
          data: [],
          jwt: "",
        };
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
        console.log(error);
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

    /**
     *
     * - 先用GROUP BY將同一個Userid下的 同一個productid + size 合併成一個 並且回傳總商品件數
     * - 用map取得購物車內的所有商品
     * @param {string} userid - 系統建立的使用者Id
     * @returns {object} product 商品物件
     * @returns {number} productCount 商品被加入購物車的次數
     */
    GetCartItems: async (parent, { userid }, { db }) => {
      try {
        const UserCartItems = await db.query(
          `SELECT userid,productid,size,SUM(productcount) as total_productcount FROM cartitem where userid=$1 GROUP BY userid,productid,size`,[userid]
        )

        const productids = UserCartItems.rows.map((product) => {
          return {
            productid: product.productid,
            productCount: product.total_productcount,
            size:product.size
          };
        });
        console.log(productids)

        const products = await Promise.all(
          productids.map(async (product) => {
            const res = await db.query(
              `SELECT * FROM products WHERE productid=$1`,
              [String(product.productid)]
            );
            res.rows[0]["productcount"] = product.productCount;
            res.rows[0]["size"] = product.size;
            return res.rows[0];
          })
        );

        console.log(products);
        return {
          status: 200,
          message: "Get cart item success",
          data: products,
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
