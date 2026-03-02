"use client"
import { ShoppingCart } from "lucide-react";
import { Fragment } from "react";

export default function EmptyContent({message,top}) {
  return (
    <Fragment>
      <div className={`empty_content relative top-[${top}] grid m-auto w-[200px] bg-gray-300 justify-center h-[200px] rounded-full`}>
        <ShoppingCart className="m-auto w-[50%] h-[50%] mt-10 text-gray-500" />
        <p className="text-l text-gray-600">{message}</p>
      </div>
    </Fragment>
  );
}
