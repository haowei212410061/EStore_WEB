"use client";

import { FetchAllProduct } from "@/graphql/ClientAPI/queryUtils";
import { LinkedinIcon, InstagramIcon, FacebookIcon, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  function VerifyUser() {
    router.push("/Home")
  }

  function OnAccountChangeListener(event) {
    setAccount(event.target.value);
  }

  function OnPasswordChangeListener(event) {
    setPassword(event.target.value);
  }

  return (
    <>
      <div className="main_container">
        <div className="admin_title">
          <div className="admin">
            <User />
          </div>
          <h2>Sign in EStore</h2>
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
            className="edit_acc"
            type="text"
            placeholder="請輸入帳號"
            onChange={OnAccountChangeListener}
          />
          <input
            className="edit_password"
            type="text"
            placeholder="請輸入密碼"
            onChange={OnPasswordChangeListener}
          />

          <a>Forget your password?</a>

          <div className="check_button" onClick={() => VerifyUser()}>
            <button className="LoginBtn">登入</button>
          </div>
        </div>
      </div>
    </>
  );
}
