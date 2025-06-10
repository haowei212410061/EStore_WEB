"use client";
import { useState } from "react";
export function InputBox({
  columnName,
  StatusChange,
  StateChange,
  HandleInputBoxStatusChange,
  HandleStateChange,
  HandleChnageProfileFunc,
}) {
  return (
    <div className="address bg-white mt-10 p-4 m-auto  w-[60%] h-[60px]">
      <div className="address_container flex w-full h-[40px] items-center gap-15">
        <h1 className="text-xl ml-2 w-[100px]">{columnName}</h1>

        {StatusChange ? (
          <div className="flex gap-4 w-[400px]">
            <p className="text-xl">{StateChange}</p>
            <button
              className="hover:text-red-800 text-red-500 text-xl"
              onClick={() => {
                HandleInputBoxStatusChange(false);
                HandleStateChange("");
              }}
            >
              變更
            </button>
          </div>
        ) : (
          <div className="buttons flex gap-3 w-[400px] h-[80px] items-center">
            <input
              type="text"
              className="inputAddress border border-red-800 w-[280px] h-[40px] p-2"
              onChange={(event) => HandleStateChange(event.target.value)}
            />
            <div
              className={`block bg-gray-600 text-white w-[100px] text-center pt-1 h-[35px] rounded-sm hover:bg-gray-900 hover:cursor-pointer ${
                StateChange.length === 0
                  ? "bg-gray-300 opacity-50 pointer-events-none"
                  : "bg-gray-600 hover:bg-gray-400 cursor-pointer"
              }`}
            >
              <button
                onClick={() => {
                  HandleInputBoxStatusChange(!StatusChange);
                  HandleChnageProfileFunc();
                }}
              >
                確認
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
