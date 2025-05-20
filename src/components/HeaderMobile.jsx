"use client"
import { useContext, useRef} from "react";
import { AiOutlineBars } from "react-icons/ai";
import Navigation from "./Navigation";
import { ThemeContext } from "@/contexts/ThemeContext";
import ToggleTheme from "./ToggleTheme";
import SearchBar from "./SearchBar";
const toggleNav =(ref)=>{
    if(ref.current)
        ref.current.classList.toggle("hidden")
}
export default function HeaderMobile(){
    const { theme} = useContext(ThemeContext)
    const navRef = useRef(null)

    return (<div className={`${theme === "light" ? "bg-white" : "bg-black"} border-b-2 md:hidden block`}>
        <div className="flex items-center justify-between gap-2 p-2">
            <span onClick={()=>{toggleNav(navRef)}} className={`${theme === "dark" ? "text-white" : "text-black"} text-[24px] font-[900] md:hidden`}><AiOutlineBars></AiOutlineBars></span>
            <div className="text-[24px] text-blue-900 font-[900] grow">PhimAZ</div>
            <div ref={navRef} className="hidden md:block">
                <div className="h-full z-10 left-0 md:relative fixed overflow-y-scroll scroll-hidden top-0 w-[250px] md:w-full">
                <Navigation></Navigation>
                </div>
                <div  className="w-full  h-full md:hidden fixed top-0 left-0 bg-black opacity-15" onClick={()=>{toggleNav(navRef)}}></div>
            </div>
            <ToggleTheme></ToggleTheme>
        </div>
        <div className="m-2"><SearchBar></SearchBar></div>
        </div>)
}