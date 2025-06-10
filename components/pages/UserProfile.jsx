"use client";
import { Fragment, useEffect, useState } from "react";
import { InputBox } from "./InputBox";
import { GetUserDetails } from "@/graphql/ClientAPI/queryUtils";
import LoadingSpinner from "../Loading";
import { EditUserProfile } from "@/graphql/ClientAPI/mutationUtils";

export function getSessionValue(key) {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(key);
  }
  return null;
}

export function UserProfile() {
  const [checkEmail, setCheckEmail] = useState(false);
  const [Email, setEmail] = useState("");

  const [checkPhone, setCheckPhone] = useState(false);
  const [phone, setPhone] = useState("");

  const [checkAccount, setCheckAccount] = useState(false);
  const [account, setAccount] = useState("");

  const [checkPassword, setCheckPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setLoadingStatus] = useState(true);

  const userId = getSessionValue("userid");

  useEffect(() => {
    GetUserDetails(userId).then((response) => {
      setEmail(response.data[0].email);
      setPhone(response.data[0].phone);
      setAccount(response.data[0].account);
      setPassword("********");

      setCheckEmail(true);
      setCheckPhone(true);
      setCheckAccount(true);
      setCheckPassword(true);
      setLoadingStatus(false);
    });
  }, []);

  return (
    <div className="userProfileMainContent relative gap-1 w-[70%] ml-60">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <InputBox
            HandleChnageProfileFunc={() =>
              EditUserProfile("account", account, userId)
            }
            columnName={"帳號名稱"}
            StatusChange={checkAccount}
            StateChange={account}
            HandleInputBoxStatusChange={setCheckAccount}
            HandleStateChange={setAccount}
          />

          <InputBox
            HandleChnageProfileFunc={() =>
              EditUserProfile("email", Email, userId)
            }
            columnName={"電子郵件"}
            StatusChange={checkEmail}
            StateChange={Email}
            HandleInputBoxStatusChange={setCheckEmail}
            HandleStateChange={setEmail}
          />
          <InputBox
            HandleChnageProfileFunc={() =>
              EditUserProfile("phone", phone, userId)
            }
            columnName={"手機號碼"}
            StatusChange={checkPhone}
            StateChange={phone}
            HandleInputBoxStatusChange={setCheckPhone}
            HandleStateChange={setPhone}
          />

          <InputBox
            HandleChnageProfileFunc={() =>
              EditUserProfile("password", password, userId)
            }
            columnName={"密碼"}
            StatusChange={checkPassword}
            StateChange={password}
            HandleInputBoxStatusChange={setCheckPassword}
            HandleStateChange={setPassword}
          />
        </Fragment>
      )}
    </div>
  );
}
