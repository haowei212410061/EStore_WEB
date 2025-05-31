"use client"
import { ShoppingCart } from "lucide-react";
import { Fragment } from "react";

export default function EmptyContent({message}) {
  return (
    <Fragment>
      <div className="empty_content m-auto w-[250px] bg-gray-300 justify-center h-[250px] rounded-full">
        <ShoppingCart className="m-auto w-[45%] h-[45%] mt-15 text-gray-500" />
      </div>
      <p className="text-2xl text-gray-600">{message}</p>
    </Fragment>
  );
}
