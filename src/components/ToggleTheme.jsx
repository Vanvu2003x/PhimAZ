import { ThemeContext } from "@/contexts/ThemeContext"
import { useContext } from "react"
import { MdOutlineLightMode,MdOutlineDarkMode } from "react-icons/md";

export default function ToggleTheme(){
     const { theme, setTheme} = useContext(ThemeContext)
     function toggleTheme(){
        if(theme=="dark")
            setTheme("light")
        else
            setTheme("dark")
    }
    return(
         <div className={`flex w-12 border-1 rounded-xl overflow-hidden ${theme==="dark" ? "border-white" : "border-black"}`}>
                <MdOutlineLightMode onClick={toggleTheme} className={`${theme=="dark" ? "bg-white text-black" :"bg-black text-white"} text-[24px] p-1`}></MdOutlineLightMode>
                <MdOutlineDarkMode onClick={toggleTheme} className={`${theme=="dark" ? "bg-black text-white" :"bg-white text-black"} text-[24px] p-1`}></MdOutlineDarkMode>
        </div>
    )
}