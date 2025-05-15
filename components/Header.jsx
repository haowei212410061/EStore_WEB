"use client";
import Link from "next/link";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import logo from "../public/logo-transparent.png";
import SearchBox from "./SearchBox";
import { ShoppingCartIcon, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useWindowScroll } from "react-use";

export function Header() {
  const [isScroll, setIsScroll] = useState(false);

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
        top: isScroll ? 0 : 0,
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
        <SearchBox />

        <button
          aria-label="Shopping Cart"
          className="p-2 text-gray-700 hover:text-blue-600"
        >
          <ShoppingCartIcon className="w-6 h-6" />
        </button>

        <button
          aria-label="User Profile"
          className="p-2 text-gray-700 hover:text-blue-600"
        >
          <User className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
