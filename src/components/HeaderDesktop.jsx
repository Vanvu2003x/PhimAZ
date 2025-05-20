"use client"
import { useContext, useRef} from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import ToggleTheme from "./ToggleTheme";
import SearchBar from "./SearchBar";
import SubNav1 from "./SubNav1";
import SubNav2 from "./SubNav2";
import {FaRegUserCircle} from "react-icons/fa"
import { BiWorld } from "react-icons/bi";

export default function HeaderDesktop(){
    const { theme} = useContext(ThemeContext)

    return (<div className={`${theme === "light" ? "bg-gray-200 text-black" : "text-white bg-black"} hidden md:block p-2`}>
        <div className="flex justify-between items-center p-2 gap-6">
            <span className="text-[24px] text-blue-900 font-[900]">PhimAZ</span>
            <div className="grow"><SubNav2></SubNav2></div>
            <div className="flex gap-3 items-center border-r-2 pr-6">
                <FaRegUserCircle className="text-2xl"></FaRegUserCircle>
                <BiWorld className="text-3xl"></BiWorld>
            </div>
            <ToggleTheme></ToggleTheme>
        </div>
        <div className="flex justify-between items-center border-y-2 py-2 my-2">
            <div><SubNav1></SubNav1></div>
            <div className="w-[30%]"><SearchBar></SearchBar></div>
        </div>

        
        </div>)
}