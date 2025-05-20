import { ThemeContext } from "@/contexts/ThemeContext"
import { useContext } from "react"

export default function Trend() {
    const { theme } = useContext(ThemeContext)
    return (<>
        <section className={`text-xs ${theme === "light" ? "text-black" : "text-white"} md:w-[350px] border-2`}>
            <div className="p-4 flex justify-between border-b-2">
                <span className={`p-2 ${theme === "light" ? "border-b-3 border-green-500" : "rounded-lg font-bold bg-black"}`}>
                    Top thịnh hành
                </span>
                <div>
                    <ul className="flex">
                        <li className={`${theme === "light" ? "text-yellow-400 border-green-400 border-b-3" : "bg-black rounded-lg"} p-2`}>
                            Ngày
                        </li>
                        <li className="p-2">Tuần</li>
                        <li className="p-2">Tháng</li>
                        <li className="p-2">Tất cả</li>
                    </ul>
                </div>
            </div>
            <div className="p-4">
                <div>Tính năng này hiện đang được cập nhật nhé!!!</div>
            </div>
        </section>
    </>)
}