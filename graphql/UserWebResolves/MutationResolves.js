const bcrypt = require("bcrypt");
export const UserMutationResolves = {
  Mutation: {
    UserSignUp: async (
      parent,
      { userid, account, email, password, phone },
      { db }
    ) => {
      try {
        const verifyEmail = await db.query(
          `SELECT * FROM users WHERE email=$1`,
          [email]
        );

        /**將使用者密碼加密 */
        const hashPassword = await bcrypt.hash(password, 10);
        
        /**確認沒有重複的email再新增資料 */
        if (verifyEmail.rows.length === 0) {
          const SignUpResponse = await db.query(
            `INSERT INTO users (userid,account,email,password,phone) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
            [userid, account, email, hashPassword, phone]
          );
          return {
            status: 200,
            message: "SignUp success",
            data: SignUpResponse.rows,
          };
        } else {
          return {
            status: 404,
            message: "This email has already been registered",
            data: null,
          };
        }
      } catch (error) {
        console.error(`Invalid value:${error}`);
      }
    },
    DeleteUser: async (parent, { userid }, { db }) => {
      try {
        const response = await db.query(`DELETE FROM users WHERE userid=$1`, [
          userid,
        ]);
        return {
          status: 200,
          message: "註銷帳號成功",
          data: response.rows,
        };
      } catch (error) {
        console.error(`Fail to delete user:${error}`);
      }
    },
    EditUserProfile: async (parent, { column, info, userid }) => {
      try {
        const response = await db.query(
          `UPDATE users SET ${column}=$1 where userid=$2`,
          [info, userid]
        );
        return {
          status: 200,
          message: "更新帳號資訊成功",
          data: response.rows,
        };
      } catch (error) {
        console.error(`Fail to edit user profile:${error}`);
      }
    },
    PostCartItem: async (
      parent,
      { cartid, userid, productid, productcount, size },
      { db }
    ) => {
      try {
        const response = await db.query(
          `INSERT INTO cartitem (cartid,userid,productid,productCount,size)values
            ($1,$2,$3,$4,$5)`,
          [cartid, userid, productid, productcount, size]
        );
        console.log("cart item response:", response);
        return {
          status: 200,
          message: "成功加入購物車",
          data: null,
        };
      } catch (error) {
        console.error(`Fail to add cart item :${error}`);
      }
    },
    UpdateCartItemCount: async (parent, { userid }, { db }) => {
      try {
        const response = await db.query(
          `SELECT * FROM cartitem where userid=$1`,
          [userid]
        );
        return {
          status: 200,
          message: "更新購物車成功",
          data: response.rows.length,
        };
      } catch (error) {
        console.error(`fail to update cart item count : ${error}`);
      }
    },
    DeleteCartItem: async (parent, { userid, productid, size }, { db }) => {
      try {
        const response = await db.query(
          `delete from cartitem where userid=$1 AND productid=$2 AND size=$3 returning *`,
          [userid, productid, size]
        );
        return {
          status: 200,
          message: "已將商品移出購物車",
          data: null,
        };
      } catch (error) {
        console.error(`fail to delete cart item : ${error}`);
      }
    },
    DeleteAllCartItem:async(parent,{userid},{db})=>{
      try {
        
        const response = await db.query(
          `delete from cartitem where userid=$1 returning * `,
          [userid]
        );
        return {
          status: 200,
          message: "已清空購物車",
          data: [],
        };
      } catch (error) {
        console.error(`fail to add order : ${error}`);
      }
    },
    PostOrders: async (
      parent,
      { orderid, userid, productid, totalprice, status, paymentmethod ,productlist,address},
      { db }
    ) => {
      try {
        const jsonString = JSON.stringify(productlist)
        const response = await db.query(
          `insert into orders (orderid,userid,productid,totalprice,status,paymentmethod,productlist,address)values
            ($1,$2,$3,$4,$5,$6,$7,$8) returning *`,
          [orderid, userid, productid, totalprice, status, paymentmethod,jsonString,address]
        );
        return {
          status: 200,
          message: "已新增一筆訂單",
          data: response.rows,
        };
      } catch (error) {
        console.error(`fail to add order : ${error}`);
      }
    },
    DeleteOrder: async (parent, { orderid }, { db }) => {
      try {
        const response = await db.query(
          `delete from orders where orderid=$1 returning *`,
          [orderid]
        );
        return {
          status: 200,
          message: "已刪除一筆訂單",
          data: response.rows,
        };
      } catch (error) {
        console.error(`fail to add order : ${error}`);
      }
    },
    UpdateOrderStatus: async (parent, { orderid, status }, { db }) => {
      try {
        const response = await db.query(
          `update orders set status=$2 where orderid=$1 returning *`,
          [orderid, status]
        );
        return {
          status: 200,
          message: `更改出貨狀態為${status}`,
          data: response.rows,
        };
      } catch (error) {
        console.error(`fail to add order : ${error}`);
      }
    },
  },
};

export default { UserMutationResolves };
