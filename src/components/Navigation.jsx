"use client"
import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext, useRef } from "react";
import { FaRegUserCircle } from "react-icons/fa"
import { IoMdArrowDropdown } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import SubNav1 from "./SubNav1";
import SubNav2 from "./SubNav2";


export default function Navigation() {
  const { theme } = useContext(ThemeContext)


  return (
    <div className={`${theme === "light" ? "bg-black md:bg-white text-white md:text-black" : "bg-white md:bg-black text-black md:text-white"} px-4 py-2 md:flex`}>

      <div className={`flex md:order-last items-center p-3 gap-4 ${theme === "light" ? "border-white" : "border-black"} border-b-2`}>
        <span>
          <FaRegUserCircle className="text-2xl"></FaRegUserCircle>
        </span>
        <span className="md:hidden">Tài khoản</span>
      </div>
      <SubNav1></SubNav1>
      <SubNav2></SubNav2>
      <div className="flex gap-5 md:gap-2 items-center py-4">
        <span className="text-3xl">
          <BiWorld></BiWorld>
        </span>
        <span className="md:hidden">Tiếng Việt</span>
        <IoMdArrowDropdown></IoMdArrowDropdown>
      </div>
    </div>
  );
}
