import { ThemeContext } from "@/contexts/ThemeContext"
import { useContext, useEffect, useState, useRef } from "react"
import Link from "next/link"
import { getQuocgia, getTheloai } from "@/services/filmsService"
import { IoMdArrowDropdown } from "react-icons/io";

const toggleDropdown = (ref) => {
  if (ref.current && window.innerWidth <= 1280) {
    ref.current.classList.toggle("hidden")
  }
}


export default function SubNav1() {
  const { theme } = useContext(ThemeContext)
  const [theloai, setTheloai] = useState([]);
  const [quocgia, setQuocgia] = useState([]);

  const theloaiDropdownRef = useRef(null)
  const quocgiaDropdownRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      const theloai = await getTheloai();
      setTheloai(theloai);
    }
    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const quocgia = await getQuocgia();
      setQuocgia(quocgia);
    }
    fetchData();
  }, [])

  return (
    <ul className={`flex flex-col md:flex-row gap-3 md:gap-5 p-3 ${theme === "light" ? "border-white md:bg-gray-300" : "border-black"} border-b-2 md:border-0`}>
      <li className="md:hidden">
        <Link href="/"> Trang chủ</Link>
      </li>
      <li>
        <Link href="/the-loai/phim-bo">Phim bộ</Link>
      </li>
      <li>
        <Link href="/the-loai/phim-le">Phim lẻ</Link>
      </li>
      <li>
        <Link href="/the-loai/hoat-hinh">Phim hoạt hình</Link>
      </li>

      <li className="group relative cursor-pointer" onClick={() => toggleDropdown(theloaiDropdownRef)}>
        <div className="flex items-center gap-1">
          <span className="">Thể loại</span>
          <IoMdArrowDropdown></IoMdArrowDropdown>
        </div>

        <ul ref={theloaiDropdownRef} className={`md:w-[400px] md:absolute z-20 md:left-10 md:group-hover:flex flex-wrap gap-3 p-3 ${theme === "light" ? "border-white md:bg-gray-200" : "border-black md:bg-gray-900"} border-b-2 md:border-0 hidden`}>
          {theloai.map((index) => {
            return (
              <li key={index.slug} className="px-3 cursor-pointer group/item">
                {index.name}
                <div className={`w-0 transition-all duration-300 ease-in-out group-hover/item:w-full mt-0.5 h-0.5 ${theme === "dark" ? "bg-white" : "bg-black"}`}></div>
              </li>
            )
          })}
        </ul>
      </li>

      <li className="group relative cursor-pointer" onClick={() => toggleDropdown(quocgiaDropdownRef)}>
        <div className="flex items-center gap-1">
          <span className="">Quốc gia</span>
          <IoMdArrowDropdown></IoMdArrowDropdown>
        </div>
        <ul ref={quocgiaDropdownRef} className={`md:w-[600px] md:absolute z-20 md:left-10 md:group-hover:flex flex-wrap gap-3 p-3 ${theme === "light" ? "border-white md:bg-gray-200" : "border-black md:bg-gray-900"} border-b-2 md:border-0 hidden`}>
          {quocgia.map((index) => {
            return (
              <li key={index.slug} className="cursor-pointer group/item">
                {index.name}
                <div className={`w-0 transition-all duration-300 ease-in-out group-hover/item:w-full mt-0.5 h-0.5 ${theme === "dark" ? "bg-white" : "bg-black"}`}></div>
              </li>
            )
          })}
        </ul>
      </li>

      <li>
        <span>Năm</span>
      </li>
    </ul>
  )
}
