"use client";
import Link from "next/link";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import logo from "../public/logo-transparent.png";
import SearchBox from "./SearchBox";
import { ShoppingCartIcon, User } from "lucide-react";
import { useState, useEffect, Fragment } from "react";
import { useWindowScroll } from "react-use";

function getSessionStorage() {
  const userid = sessionStorage.getItem("userid");
  const token = sessionStorage.getItem("token");
  return { userid, token };
}

export function Header({ setSearchFunc, isHidden, productList }) {
  const [isScroll, setIsScroll] = useState(false);
  const [isOpenDropDownMenu, SetIsOpenDropDownMenu] = useState(false);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [isLogin, SetLoginStatus] = useState(false);

  useEffect(() => {
    const { userid, token } = getSessionStorage();
    setToken(token);
    setUserId(userid);

    if (token && userid) {
      SetLoginStatus(true);
    } else {
      SetLoginStatus(false);
    }
  }, []);

  const { y } = useWindowScroll();
  useEffect(() => {
    if (y > 100) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  }, [y]);
  return (
    <header
      className="flex items-center justify-between w-full h-24 bg-white px-6 z-50 "
      style={{
        position: isScroll ? "fixed" : "relative",
        top: 0,
      }}
    >
      <div className="flex items-center space-x-8">
        <Avatar className="w-28 mb-10 h-16">
          <AvatarImage src={logo.src} alt="Estore Logo" />
        </Avatar>
        <nav className="hidden md:flex space-x-6 text-lg font-medium text-gray-800">
          <Link href="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link href="/MenClothes" className="hover:text-blue-500">
            Men
          </Link>
          <Link href="/WomenClothes" className="hover:text-blue-500">
            Women
          </Link>
          <Link href="/ChildrenClothes" className="hover:text-blue-500">
            Children
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-6">
        {isHidden ? (
          <></>
        ) : (
          <SearchBox setSearchFunc={setSearchFunc} products={productList} />
        )}

        {isLogin ? (
          <Link
            aria-label="Shopping Cart"
            className="p-2 text-gray-700 hover:text-blue-600"
            href={"/CartItem"}
          >
            <ShoppingCartIcon className="w-6 h-6" />
          </Link>
        ) : (
          <></>
        )}

        <button
          aria-label="User Profile"
          className="p-2 text-gray-700 hover:text-blue-600"
          onClick={() => {
            console.log(isOpenDropDownMenu);
            SetIsOpenDropDownMenu(!isOpenDropDownMenu);
          }}
        >
          <User className="w-6 h-6" />
        </button>
      </div>
      {/* Dropdown Menu */}
      {isOpenDropDownMenu && (
        <div className="fixed right-10 top-16 z-100 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {isLogin ? (
              <Fragment>
                <Link
                  href="/Order"
                  className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                >
                  訂單查詢
                </Link>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                >
                  個人資料
                </Link>
              </Fragment>
            ) : (
              <></>
            )}

            <Link
              href="/SignIn"
              className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
              onClick={() => {
                sessionStorage.clear();
              }}
            >
              {token ? "登出" : "登入"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
