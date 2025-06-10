"use client";

import { SignUpUser } from "@/graphql/ClientAPI/mutationUtils";
import { FetchAllProduct } from "@/graphql/ClientAPI/queryUtils";
import { LinkedinIcon, InstagramIcon, FacebookIcon, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { verfiyConfig } from "@/graphql/ClientAPI/verifyUtils";
import { GetUserProfile } from "@/graphql/ClientAPI/queryUtils";
import Link from "next/link";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";

export default function SignUp() {
  const router = useRouter();
  const [account, setAccount] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  function HandleStateChangeFunc(event, SetStateFunc) {
    SetStateFunc(event.target.value);
  }

  return (
    <>
      <div className="SignUp_container">
        <div className="admin_title">
          <div className="admin">
            <User />
          </div>
          <h2>Sign Up EStore</h2>
        </div>

        <div className="icons">
          <div className="icon">
            <LinkedinIcon />
          </div>
          <div className="icon">
            <InstagramIcon />
          </div>
          <div className="icon">
            <FacebookIcon />
          </div>
        </div>

        <div className="admin_Input">
          <input
            className="edit_acc p-2"
            type="text"
            placeholder="請輸入帳號名稱"
            onChange={(event) => HandleStateChangeFunc(event, setAccount)}
          />
          <input
            className="edit_password p-2"
            type="text"
            placeholder="請輸入電子郵件"
            onChange={(event) => HandleStateChangeFunc(event, setEmail)}
          />
          <input
            className="edit_password p-2"
            type="text"
            placeholder="請輸入密碼"
            onChange={(event) => HandleStateChangeFunc(event, setPassword)}
          />
          <input
            className="edit_password p-2"
            type="text"
            placeholder="請輸入手機號碼"
            onChange={(event) => HandleStateChangeFunc(event, setPhone)}
          />

          <Link href={"/SignUp"}>
            <p className=" hover:text-gray-300 hover:cursor-pointer">
              返回登入頁面
            </p>
          </Link>

          <div className="check_button">
            <button
              className="LoginBtn"
              onClick={async () => {
                const SignUpResult = {
                  userid: nanoid().slice(0, 8),
                  account: account,
                  email: email,
                  phone: phone,
                  password: password,
                };
                const result = await SignUpUser(SignUpResult);
                console.log(result)
                if (result?.status === 200) {
                  toast.success("註冊成功 請重新登入");
                  router.push("/SignIn");
                }
              }}
            >
              註冊
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
