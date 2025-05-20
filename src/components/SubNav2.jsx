import { ThemeContext } from "@/contexts/ThemeContext"
import { useContext } from "react"
import { IoMdArrowDropdown } from "react-icons/io";
import { useRef } from "react";
import Link from "next/link";
const toggleSupportDropdown = (ref) => {
  if (ref.current && window.innerWidth <= 1280) {
    ref.current.classList.toggle("hidden")
  }
}



export default function SubNav2() {
  const { theme } = useContext(ThemeContext)
  const supportDropdownRef = useRef(null)
  const termDropdownRef = useRef(null)
  return (
    <ul className={`flex flex-col md:flex-row gap-3 md:gap-7 p-3 ${theme === "light" ? "border-white md:bg-gray-200" : "border-black"} border-b-2 md:border-0`}>
      <li className="hidden md:block">
        <Link href="/"> Trang chủ</Link>
      </li>
      <li>Giới thiệu về PhimAZ</li>
      <li>Liên hệ</li>
      <li className="group md:relative cursor-pointer" onClick={() => { toggleSupportDropdown(supportDropdownRef) }}>
        <div className="flex justify-between items-center gap-1 md:group">
          <span>Hỗ trợ và giúp đỡ</span>
          <IoMdArrowDropdown></IoMdArrowDropdown>
        </div>
        <ul ref={supportDropdownRef} className={`md:absolute  md:-right-30 md:group-hover:flex flex-col gap-3 p-3 ${theme === "light" ? "border-white md:bg-gray-200" : "border-black md:bg-gray-900"} border-b-2 md:border-0 hidden`}>
          <li className="cursor-pointer group/item">
            Phản hồi
            <div className={`w-0 transition-all duration-300 ease-in-out group-hover/item:w-full mt-0.5 h-0.5 ${theme === "dark" ? "bg-white" : "bg-black"}`}></div>
          </li>
          <li className="cursor-pointer group/item">
            Trung tâm phản hồi bảo mật
            <div className={`w-0 transition-all duration-300 ease-in-out group-hover/item:w-full mt-0.5 h-0.5 ${theme === "dark" ? "bg-white" : "bg-black"}`}></div>
          </li>
          <li className="cursor-pointer group/item">
            Câu hỏi thường gặp
            <div className={`w-0 transition-all duration-300 ease-in-out group-hover/item:w-full mt-0.5 h-0.5 ${theme === "dark" ? "bg-white" : "bg-black"}`}></div>
          </li>
        </ul>
      </li >
      <li className="cursor-pointer group md:relative" onClick={() => { toggleSupportDropdown(termDropdownRef) }}>
        <div className="flex justify-between items-center gap-1 md:group">
          <span>Điều khoản dịch vụ</span>
          <IoMdArrowDropdown />
        </div>
        <ul ref={termDropdownRef} className={`md:absolute md:-right-30 w-[200px] md:group-hover:flex flex-col gap-3 p-3 ${theme === "light" ? "border-white md:bg-gray-200" : "border-black md:bg-gray-900"} border-b-2 md:border-0 hidden`}>
          <li className="cursor-pointer group/item">
            Điều khoản dịch vụ
            <div className={`w-0 transition-all duration-300 ease-in-out group-hover/item:w-full mt-0.5 h-0.5 ${theme === "dark" ? "bg-white" : "bg-black"}`}></div>
          </li>
          <li className="cursor-pointer group/item">
            Chính sách bảo mật
            <div className={`w-0 transition-all duration-300 ease-in-out group-hover/item:w-full mt-0.5 h-0.5 ${theme === "dark" ? "bg-white" : "bg-black"}`}></div>
          </li>
          <li className="cursor-pointer group/item">
            Cài đặt Cookie
            <div className={`w-0 transition-all duration-300 ease-in-out group-hover/item:w-full mt-0.5 h-0.5 ${theme === "dark" ? "bg-white" : "bg-black"}`}></div>
          </li>
        </ul>
      </li>

    </ul >

  )
}